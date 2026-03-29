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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
  if (code === "WEAK_PASSWORD")
    return {
      mm: "စကားဝေါ် အနည်းဆုံး ၆ လုံး",
      en: "Password must be at least 6 characters.",
    };
  if (code === "INVALID_CREDENTIALS")
    return {
      mm: "အမည်၊ ဖုန်းနံပါတ် သို့မဟုတ် စကားဝေါ် မမှန်ကန်ပါ",
      en: "Name, phone, or password is incorrect.",
    };
  return { mm: "တစ်ခုခု မှားယွင်းနေပါသည်", en: "Something went wrong." };
};

export function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">("login");

  const [loginName, setLoginName] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [suName, setSuName] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = normalizePhone(loginPhone);
    if (!loginName.trim() || !isValidPhoneDigits(digits) || !loginPassword) {
      toast.error("All fields required", {
        description: "အမည်၊ ဖုန်းနံပါတ်၊ စကားဝေါ် ထည့်ပါ",
      });
      return;
    }
    try {
      await signIn(loginName, loginPhone, loginPassword);
      toast.success("Welcome back", { description: "ပြန်လည်ကြိုဆိုပါသည်" });
    } catch (e) {
      const m = errMessage((e as Error).message);
      toast.error(m.en, { description: m.mm });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
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
    if (suPassword.length < 6) {
      toast.error("Password too short", {
        description: "စကားဝေါ် အနည်းဆုံး ၆ လုံး",
      });
      return;
    }
    if (suPassword !== suConfirm) {
      toast.error("Passwords do not match", {
        description: "စကားဝေါ်များ မတူညီပါ",
      });
      return;
    }
    try {
      await signUp(suName, suPhone, suPassword);
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
              For paddy growers — sign in to continue
            </span>
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-md flex-1 px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <Card className="border-4 border-[#1B4332]/20 shadow-xl">
          <CardContent className="p-5 pt-6">
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as "login" | "signup")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 h-12 mb-6 bg-[#e8f5e9] p-1 rounded-xl">
                <TabsTrigger
                  value="login"
                  className="rounded-lg data-[state=active]:bg-[#16a34a] data-[state=active]:text-white text-[#1B4332] font-semibold"
                >
                  ဝင်ရောက်
                  <span className="block text-[10px] font-normal opacity-80">
                    Log in
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-lg data-[state=active]:bg-[#16a34a] data-[state=active]:text-white text-[#1B4332] font-semibold"
                >
                  အကောင့်ဖွင့်မည်
                  <span className="block text-[10px] font-normal opacity-80">
                    Sign up
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-name" className="text-base">
                      အမည် <span className="text-gray-500">Your name</span>
                    </Label>
                    <Input
                      id="login-name"
                      autoComplete="name"
                      value={loginName}
                      onChange={(e) => setLoginName(e.target.value)}
                      className={fieldClass}
                      placeholder="ဦးလှမြင့်"
                    />
                    <p className="text-xs text-gray-500">
                      စာရင်းသွင်းစဉ် သုံးခဲ့သည့်အမည် အတိုင်းထည့်ပါ
                      <span className="block">Same spelling as when you signed up</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-phone" className="text-base">
                      ဖုန်းနံပါတ်{" "}
                      <span className="text-gray-500">Phone number</span>
                    </Label>
                    <Input
                      id="login-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      className={fieldClass}
                      placeholder="09 123 456 789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-base">
                      စကားဝေါ် <span className="text-gray-500">Password</span>
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      autoComplete="current-password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-bold bg-[#16a34a] hover:bg-[#15803d] border-4 border-[#15803d]"
                  >
                    ဝင်ရောက်မည်
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSignup} className="space-y-4">
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
                      ၈ လုံးမှ ၁၅ လုံး / 8–15 digits (spaces optional)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-password" className="text-base">
                      စကားဝေါ် <span className="text-gray-500">Password</span>
                    </Label>
                    <Input
                      id="su-password"
                      type="password"
                      autoComplete="new-password"
                      value={suPassword}
                      onChange={(e) => setSuPassword(e.target.value)}
                      className={fieldClass}
                    />
                    <p className="text-xs text-gray-500">
                      အနည်းဆုံး ၆ လုံး / At least 6 characters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-confirm" className="text-base">
                      စကားဝေါ်အတည်ပြု{" "}
                      <span className="text-gray-500">Confirm password</span>
                    </Label>
                    <Input
                      id="su-confirm"
                      type="password"
                      autoComplete="new-password"
                      value={suConfirm}
                      onChange={(e) => setSuConfirm(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-bold bg-[#16a34a] hover:bg-[#15803d] border-4 border-[#15803d]"
                  >
                    အကောင့်ဖွင့်မည်
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
              ဝင်ရောက်ရန် အမည်၊ ဖုန်းနံပါတ်၊ စကားဝေါ် သုံးမျိုးစလုံး မှန်ကန်ရမည်။
              <span className="block mt-1">
                Demo only — stored locally; passwords are not securely hashed.
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
