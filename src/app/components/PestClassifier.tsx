import { useState } from "react";
import {
  AlertTriangle,
  Camera,
  Check,
  Pill,
  Sprout,
  X,
} from "lucide-react";
import { MOCK_PEST_SCAN_RESULT, type PestScanResult } from "../../mocks";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import ImagePicker from "./ImagePicker";
export function PestClassifier() {
	const [scanning, setScanning] = useState(false);
	const [showCamera, setShowCamera] = useState(false);
	const [result, setResult] = useState<PestScanResult | null>(null);
	const [error, setError] = useState<string | null>(null);
 const [ImagePicked, setImagePicked] = useState(true);
	// API call to backend /scan
	const scanPestImage = async (file: File) => {
		setScanning(true);
		setResult(null);
		setError(null);
		try {
			const formData = new FormData();
			formData.append("image", file);
			const response = await fetch("http://localhost:8000/scan", {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
				throw new Error("Scan failed");
			}
			const data = await response.json();
      console.log("Scan result:", data);
			setResult({
				name: data.label || "Unknown",
				nameMM: data.label || "Unknown",
				confidence: data.confidence || 0,
				treatment: [],
				treatmentMM: [],
			});
		} catch (e: any) {
			setError(e.message || "Unknown error");
		} finally {
			setScanning(false);
		}
	};

	const handleImageSelected = (file: File) => {
		scanPestImage(file);
	};

	const handleScan = () => {
		
		setScanning(false);
		setResult(null);
	};

	const handleRetake = () => {
		setResult(null);
		setScanning(false);
	};

	const handleClose = () => {
		setShowCamera(false);
		setResult(null);
		setScanning(false);
	};

	if (!showCamera) {
		return (
			<div className="min-h-dvh overflow-x-hidden bg-[#F8FAFC]">
				{/* Header matching Dashboard design */}
				<header className="bg-[#1B4332] px-4 pb-5 pt-[max(1.5rem,env(safe-area-inset-top))] text-white shadow-lg sm:px-6 sm:pb-6 sm:pt-8">
					<div className="mb-3 flex items-center gap-3">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
							<Camera className="size-5" strokeWidth={2.2} aria-hidden />
						</div>
						<div className="min-w-0">
							<h1 className="text-xl font-bold tracking-wide sm:text-3xl">
								AI ပိုးမွှားခွဲခြားစနစ်
							</h1>
							<p className="mt-1 text-sm opacity-90 sm:text-base">
								AI Pest Classifier
							</p>
						</div>
					</div>
				</header>

  if (!showCamera) {
    return (
      <div className="min-h-dvh overflow-x-hidden bg-[#F8FAFC]">
        {/* Header matching Dashboard design */}
        <header className="bg-[#1B4332] px-4 pb-5 pt-[max(1.5rem,env(safe-area-inset-top))] text-white shadow-lg sm:px-6 sm:pb-6 sm:pt-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
              <Camera className="size-5" strokeWidth={2.2} aria-hidden />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-wide sm:text-3xl">
                AI အပင်ရောဂါပိုးခွဲခြားစနစ်
              </h1>
              <p className="mt-1 text-sm opacity-90 sm:text-base">AI Pest Classifier</p>
            </div>
          </div>
        </header>

					<div className="space-y-2 text-center sm:space-y-3">
						<h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
							ပိုးမွှားကို စကင်ဖတ်ပါ
						</h2>
						<p className="text-base text-gray-600 sm:text-xl">Scan a Pest</p>
					</div>

          <div className="space-y-2 text-center sm:space-y-3">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            အပင်ရောဂါပိုးကို စကင်ဖတ်ပါ
            </h2>
            <p className="text-base text-gray-600 sm:text-xl">Scan a Pest</p>
          </div>

          {/* Instructions */}
          <Card className="w-full max-w-lg border-4 border-gray-300">
            <CardContent className="space-y-4 p-4 sm:space-y-6 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#16a34a] text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-2xl">
                  1
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-base font-bold text-gray-900 sm:text-xl">
                    အပင်ရောဂါပိုးကို အနီးကပ်ရိုက်ပါ
                  </p>
                  <p className="text-sm text-gray-600 sm:text-lg">Take a close-up photo of the pest</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#16a34a] text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-2xl">
                  2
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-base font-bold text-gray-900 sm:text-xl">
                    အလင်းရောင် လုံလောက်ပါစေ
                  </p>
                  <p className="text-sm text-gray-600 sm:text-lg">Ensure good lighting conditions</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#16a34a] text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-2xl">
                  3
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-base font-bold text-gray-900 sm:text-xl">ပုံရှင်းလင်း ရိုက်ပါ</p>
                  <p className="text-sm text-gray-600 sm:text-lg">Keep the image clear and focused</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleScan}
            className="h-16 w-full max-w-lg gap-2 border-4 border-[#15803d] bg-[#16a34a] text-base font-bold hover:bg-[#15803d] sm:h-20 sm:gap-3 sm:text-2xl"
          >
            <Camera className="size-6 shrink-0 sm:size-8" strokeWidth={2.2} aria-hidden />
            အပင်ရောဂါပိုးခွဲခြားရန် (Identify Pest)
          </Button>
        </div>
      </div>
    );
  }

					{/* Large Focus Frame */}
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-8 border-[#16a34a] rounded-3xl">
						<div className="absolute -top-2 -left-2 w-12 h-12 border-t-8 border-l-8 border-white rounded-tl-2xl"></div>
						<div className="absolute -top-2 -right-2 w-12 h-12 border-t-8 border-r-8 border-white rounded-tr-2xl"></div>
						<div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-8 border-l-8 border-white rounded-bl-2xl"></div>
						<div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-8 border-r-8 border-white rounded-br-2xl"></div>
					</div>

					{/* Instruction Text */}
					{!scanning && !result && (
						<div className="absolute left-0 right-0 top-20 px-4 text-center text-white sm:top-24 sm:px-6">
							<p className="mb-1 text-lg font-bold sm:mb-2 sm:text-2xl">
								ပိုးမွှားကို ဘောင်အတွင်းထည့်ပါ
							</p>
							<p className="text-sm sm:text-lg">Place pest inside the frame</p>
						</div>
					)}
				</div>

          {/* Instruction Text */}
          {!scanning && !result && (
            <div className="absolute left-0 right-0 top-20 px-4 text-center text-white sm:top-24 sm:px-6">
              <p className="mb-1 text-lg font-bold sm:mb-2 sm:text-2xl">အပင်ရောဂါပိုးကို ဘောင်အတွင်းထည့်ပါ</p>
              <p className="text-sm sm:text-lg">Place pest inside the frame</p>
            </div>
          )}
        </div>

				{/* Scanning Overlay */}
				{scanning && (
					<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
						<div className="bg-white rounded-3xl p-10 max-w-sm mx-6 text-center space-y-6">
							<div className="w-24 h-24 mx-auto border-8 border-[#16a34a] border-t-transparent rounded-full animate-spin"></div>
							<div>
								<p className="text-2xl font-bold text-gray-900 mb-2">
									AI ဖြင့် ခွဲခြားနေသည်...
								</p>
								<p className="text-lg text-gray-600">Analyzing with AI...</p>
							</div>
						</div>
					</div>
				)}

				{/* Result Card Overlay */}
				{result && (
					<div className="absolute inset-0 flex items-end">
						<div className="max-h-[82dvh] w-full overflow-y-auto rounded-t-3xl border-t-8 border-[#16a34a] bg-white p-4 pb-[max(2rem,env(safe-area-inset-bottom))] sm:rounded-t-[3rem] sm:p-8 sm:max-h-[75vh]">
							{/* Confidence Badge */}
							<div className="flex items-center justify-center mb-6">
								<Badge className="gap-2 border-4 border-[#15803d] bg-[#16a34a] px-4 py-2 text-lg text-white sm:px-6 sm:py-3 sm:text-2xl">
									<Check
										className="size-7 shrink-0"
										strokeWidth={2.5}
										aria-hidden
									/>
									{result.confidence}% ယုံကြည်မှု
								</Badge>
							</div>

							{/* Large Pest Photo Placeholder */}
							<div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 flex items-center justify-center border-2 border-gray-300 text-[#1B4332]">
								<Bug className="size-24" strokeWidth={1.5} aria-hidden />
							</div>

              {/* Placeholder after scan — plant motif (affected crop context) */}
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 flex items-center justify-center border-2 border-gray-300 text-[#1B4332]">
                <Sprout className="size-24" strokeWidth={1.5} aria-hidden />
              </div>

							{/* Treatment Checklist - Simple 1-2-3 */}
							<Card className="bg-[#FEF3C7] border-4 border-[#E67E22] mb-6">
								<CardContent className="p-4 sm:p-6">
									<div className="mb-4 flex items-center gap-2 text-[#E67E22] sm:mb-6 sm:gap-3">
										<Pill
											className="size-8 shrink-0 sm:size-9"
											strokeWidth={2}
											aria-hidden
										/>
										<h3 className="text-lg font-bold text-gray-900 sm:text-2xl">
											ကုသမှုနည်းလမ်း
										</h3>
									</div>

									<div className="space-y-4">
										{result.treatmentMM.map((treatment, index) => (
											<div key={index} className="flex gap-4 items-start">
												<div className="w-12 h-12 bg-[#E67E22] text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">
													{index + 1}
												</div>
												<div className="flex-1">
													<p className="text-lg font-bold text-gray-900 mb-1">
														{treatment}
													</p>
													<p className="text-base text-gray-600">
														{result.treatment[index]}
													</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Action Buttons */}
							<div className="space-y-4">
								<Button
									className="w-full h-16 bg-[#16a34a] hover:bg-[#15803d] text-xl font-bold border-4 border-[#15803d]"
									onClick={() =>
										alert(
											"Verify via Knowledge tab or extension (demo — coming soon)",
										)
									}
								>
									<BookOpen
										className="w-7 h-7 mr-2 shrink-0"
										strokeWidth={2.5}
									/>
									ဉာဏ်မျှဝေရေးတွင် စစ်ဆေးရန်
								</Button>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleRetake}
                    className="h-16 bg-white hover:bg-gray-100 text-[#16a34a] border-4 border-[#16a34a] text-lg font-bold"
                  >
                    ပြန်ရိုက်မည်
                  </Button>
                  <Button 
                    onClick={handleClose}
                    className="h-16 bg-white hover:bg-gray-100 text-gray-700 border-4 border-gray-300 text-lg font-bold"
                  >
                    ပိတ်မည်
                  </Button>
                </div>
              </div>

							{/* Warning */}
							<div className="mt-6 bg-[#FEF3C7] border-4 border-[#FDB813] rounded-xl p-4 flex gap-3 items-start">
								<AlertTriangle
									className="size-6 shrink-0 text-amber-700 mt-0.5"
									strokeWidth={2.2}
									aria-hidden
								/>
								<div>
									<p className="text-base text-gray-900">
										သတိပေးချက်: ဓာတုပစ္စည်းများကို သတ်မှတ်ချက်အတိုင်း
										အသုံးပြုပါ။
									</p>
									<p className="text-sm text-gray-600 mt-1">
										Warning: Always follow chemical application guidelines.
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Bottom Capture Button - Massive Green Circle */}
				{!scanning && !result && (
					<div className="absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] left-0 right-0 flex flex-col items-center gap-3 sm:bottom-12 sm:gap-4">
						<button
							type="button"
							onClick={handleScan}
							className="w-28 h-28 bg-[#16a34a] rounded-full border-4 border-white shadow-2xl active:scale-95 transition-transform flex items-center justify-center text-white"
							aria-label="Capture"
						>
							<Camera className="size-12" strokeWidth={2} aria-hidden />
						</button>
						<div className="text-white text-center">
							<p className="text-xl font-bold">ဓာတ်ပုံရိုက်ရန် နှိပ်ပါ</p>
							<p className="text-base opacity-90">Tap to capture</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
