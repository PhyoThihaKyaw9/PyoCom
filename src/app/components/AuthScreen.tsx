import { useState } from "react";
import { Sprout } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../auth/AuthContext";
import {
  isValidPhoneDigits,
  normalizePhone,
} from "../../auth/mockAuthStorage";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SignupPhase = "phone" | "otp" | "details";

function generateMockOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const errMessage = (code: string) => {
  if (code === "PHONE_TAKEN")
    return {
      mm: "ဒီဖုန်းနံပါတ်ဖြင့် အကောင့်ရှိပြီးသားဖြစ်ပါသည်",
      en: "An account with this phone number already exists.",
    };
  if (code === "INVALID_PHONE")
    return {
      mm: "ဖုန်းနံပါတ် မမှန်ကန်ပါ (၈လုံးမှ ၁၅လုံး)",
      en: "Enter a valid phone number (8–15 digits).",
    };
  if (code === "INVALID_NAME")
    return {
      mm: "အမည် ထည့်ပါ",
      en: "Please enter your name.",
    };
  return { mm: "တစ်ခုခု မှားယွင်းနေပါသည်", en: "Something went wrong." };
};

export function AuthScreen() {
  const { signUp } = useAuth();

  const [suName, setSuName] = useState("");
  const [suPhone, setSuPhone] = useState("");

  const [signupPhase, setSignupPhase] = useState<SignupPhase>("phone");
  const [pendingOtp, setPendingOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const requestSignupOtp = () => {
    const digits = normalizePhone(suPhone);
    if (!isValidPhoneDigits(digits)) {
      toast.error("Invalid phone number", {
        description: "ဖုန်းနံပါတ် ၈ လုံးမှ ၁၅ လုံးအထိ ထည့်ပါ",
      });
      return;
    }
    const pin = generateMockOtp();
    setPendingOtp(pin);
    setOtpInput("");
    setSignupPhase("otp");
    toast.success("ဒေမို OTP · Mock SMS", {
      description: `PIN: ${pin}`,
      duration: 25_000,
    });
  };

  const verifySignupOtp = () => {
    const entered = otpInput.replace(/\D/g, "");
    if (entered.length !== 6) {
      toast.error("Invalid OTP", {
        description: "ဂဏန်း ၆ လုံး ထည့်ပါ",
      });
      return;
    }
    if (entered !== pendingOtp) {
      toast.error("OTP မမှန်ပါ", {
        description: "ပြန်စစ်ဆေးပြီး ထည့်ပါ",
      });
      return;
    }
    setSignupPhase("details");
    toast.success("OTP အောင်မြင်ပါပြီ", {
      description: "အမည် ထည့်ပြီး အကောင့်ဖွင့်ပါ",
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPhase !== "details") return;
    if (!suName.trim()) {
      toast.error("Name required", { description: "အမည် ထည့်ပါ" });
      return;
    }
    const digits = normalizePhone(suPhone);
    if (!isValidPhoneDigits(digits)) {
      toast.error("Invalid phone number", {
        description: "ဖုန်းနံပါတ် ၈ လုံးမှ ၁၅ လုံးအထိ ထည့်ပါ",
      });
      return;
    }
    try {
      await signUp(suName, suPhone);
      toast.success("Account created", {
        description: "အကောင့်ဖွင့်ပြီးပါပြီ",
      });
    } catch (e) {
      const m = errMessage((e as Error).message);
      toast.error(m.en, { description: m.mm });
    }
  };

  const fieldClass =
    "h-12 text-base border-4 border-[#1B4332]/30 bg-white focus-visible:border-[#16a34a]";

  return (
    <div className="flex min-h-dvh min-h-[100svh] flex-col overflow-x-hidden bg-[#f0fdf4]">
      <header className="bg-[#1B4332] px-4 pb-8 pt-[max(1.75rem,env(safe-area-inset-top))] text-white shadow-lg sm:px-6 sm:pt-10">
        <div className="flex flex-col items-center text-center gap-3 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
            <Sprout className="w-9 h-9" strokeWidth={2.2} />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">ပျိုးကွန်</h1>
          <p className="text-white/85 text-sm">
            စပါးစိုက်ပျိုးသူများ အတွက်
            <span className="block text-xs opacity-80 mt-1">
              For paddy growers — register to continue
            </span>
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-md flex-1 px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <Card className="border-4 border-[#1B4332]/20 shadow-xl">
          <CardContent className="p-5 pt-6">
            <h2 className="text-lg font-bold text-[#1B4332] mb-5 text-center">
              အကောင့်ဖွင့်မည်
              <span className="block text-xs font-normal text-gray-600 mt-1">
                Sign up
              </span>
            </h2>
            <form onSubmit={handleSignup} className="space-y-4">
                  {signupPhase === "phone" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="su-phone" className="text-base">
                          ဖုန်းနံပါတ်{" "}
                          <span className="text-gray-500">Phone number</span>
                        </Label>
                        <Input
                          id="su-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={suPhone}
                          onChange={(e) => setSuPhone(e.target.value)}
                          className={fieldClass}
                          placeholder="09 123 456 789"
                        />
                        <p className="text-xs text-gray-500">
                          OTP တောင်းပြီးနောက် toast တွင် ဒေမို PIN ပေါ်လာပါမည်
                          <span className="block">Mock OTP — PIN appears in toast</span>
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 flex-1 border-2 border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332]/5"
                          onClick={requestSignupOtp}
                        >
                          OTP တောင်းမည် · Request OTP
                        </Button>
                        <Button
                          type="button"
                          className="h-12 flex-1 text-base font-bold bg-[#16a34a] hover:bg-[#15803d] border-4 border-[#15803d]"
                          onClick={requestSignupOtp}
                        >
                          ဆက်ရန်
                        </Button>
                      </div>
                    </>
                  )}

                  {signupPhase === "otp" && (
                    <div className="space-y-4">
                      <div className="rounded-xl border-2 border-[#16a34a]/40 bg-[#f0fdf4] p-3 text-sm text-[#166534]">
                        ဖုန်းနံပါတ် <span className="font-mono font-semibold">{suPhone}</span>
                        သို့ ဒေမို OTP ပို့ပြီးပါပြီ။ Toast ရှိ PIN ထည့်ပါ။
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="su-otp" className="text-base">
                          OTP ဂဏန်း <span className="text-gray-500">6-digit PIN</span>
                        </Label>
                        <Input
                          id="su-otp"
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) =>
                            setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))
                          }
                          className={`${fieldClass} text-center font-mono text-2xl tracking-[0.35em]`}
                          placeholder="••••••"
                        />
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 flex-1 border-2 border-gray-300"
                          onClick={() => {
                            setSignupPhase("phone");
                            setPendingOtp("");
                            setOtpInput("");
                          }}
                        >
                          နောက်သို့
                        </Button>
                        <Button
                          type="button"
                          className="h-12 flex-1 font-bold bg-[#16a34a] hover:bg-[#15803d] border-4 border-[#15803d]"
                          onClick={verifySignupOtp}
                        >
                          အတည်ပြုရန် · Verify
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full text-sm text-[#1B4332] underline-offset-2 hover:underline"
                        onClick={requestSignupOtp}
                      >
                        OTP ပြန်ပို့မည် · Resend (new PIN)
                      </Button>
                    </div>
                  )}

                  {signupPhase === "details" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="su-name" className="text-base">
                          အမည် <span className="text-gray-500">Display name</span>
                        </Label>
                        <Input
                          id="su-name"
                          autoComplete="name"
                          value={suName}
                          onChange={(e) => setSuName(e.target.value)}
                          className={fieldClass}
                          placeholder="ဦးလှမြင့်"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="su-phone-ro" className="text-base">
                          ဖုန်းနံပါတ်{" "}
                          <span className="text-gray-500">Verified</span>
                        </Label>
                        <Input
                          id="su-phone-ro"
                          type="tel"
                          readOnly
                          value={suPhone}
                          className={`${fieldClass} bg-gray-50 text-gray-700`}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-14 text-lg font-bold bg-[#16a34a] hover:bg-[#15803d] border-4 border-[#15803d]"
                      >
                        အကောင့်ဖွင့်မည်
                      </Button>
                    </>
                  )}
            </form>

            <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
              ဖုန်းနံပါတ် OTP အောင်မြင်ပြီးမှ အမည် ထည့်ပါ။
              <span className="block mt-1">
                Demo only — account data stays in this browser only.
              </span>
              <span className="block mt-2 text-[#166534]">
                Demo admin: sign up with phone{" "}
                <span className="font-semibold tabular-nums">09900000001</span>{" "}
                (digits only) to get an Admin account.
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
