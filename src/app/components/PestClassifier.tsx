import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface PestResult {
  name: string;
  nameMM: string;
  confidence: number;
  treatment: string[];
  treatmentMM: string[];
}

export function PestClassifier() {
  const [scanning, setScanning] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [result, setResult] = useState<PestResult | null>(null);

  const handleScan = () => {
    setShowCamera(true);
    setScanning(true);
    setResult(null);

    // Simulate AI scanning
    setTimeout(() => {
      setScanning(false);
      setResult({
        name: "Brown Planthopper",
        nameMM: "ပိုးညို (သွားကောင်)",
        confidence: 87,
        treatment: [
          "Apply Imidacloprid 17.8% SL",
          "Spray in the evening (4-6 PM)",
          "Repeat after 7 days if needed"
        ],
        treatmentMM: [
          "Imidacloprid 17.8% SL ဖြန်းပါ",
          "ညနေ ၄-၆ နာရီတွင် ဖြန်းပါ",
          "လိုအပ်ရင် ၇ ရက်အကြာ ထပ်ဖြန်းပါ"
        ]
      });
    }, 2500);
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
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Header matching Dashboard design */}
        <header className="bg-[#1B4332] text-white px-6 pt-8 pb-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-2xl">📷</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wide">AI ပိုးမွှားခွဲခြားစနစ်</h1>
              <p className="text-base opacity-90 mt-1">AI Pest Classifier</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center p-8 space-y-8 min-h-[70vh]">
          {/* Large Simple Camera Icon */}
          <div className="w-40 h-40 bg-[#16a34a] rounded-3xl flex items-center justify-center">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="30" width="70" height="50" rx="8" stroke="white" strokeWidth="5" fill="none"/>
              <circle cx="50" cy="55" r="18" stroke="white" strokeWidth="5" fill="none"/>
              <circle cx="50" cy="55" r="10" fill="white"/>
              <rect x="35" y="20" width="30" height="12" rx="4" fill="white"/>
              <circle cx="75" cy="40" r="4" fill="white"/>
            </svg>
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">
              ပိုးမွှားကို စကင်ဖတ်ပါ
            </h2>
            <p className="text-xl text-gray-600">Scan a Pest</p>
          </div>

          {/* Instructions */}
          <Card className="w-full max-w-lg border-4 border-gray-300">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#16a34a] text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">1</div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">ပိုးမွှားကို အနီးကပ်ရိုက်ပါ</p>
                  <p className="text-lg text-gray-600">Take a close-up photo of the pest</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#16a34a] text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">2</div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">အလင်းရောင် လုံလောက်ပါစေ</p>
                  <p className="text-lg text-gray-600">Ensure good lighting conditions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#16a34a] text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">3</div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">ပုံရှင်းလင်း ရိုက်ပါ</p>
                  <p className="text-lg text-gray-600">Keep the image clear and focused</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleScan}
            className="w-full max-w-lg h-20 text-2xl bg-[#16a34a] hover:bg-[#15803d] font-bold border-4 border-[#15803d]"
          >
            <span className="text-3xl mr-3">📷</span>
            ပိုးမွှားခွဲခြားရန် (Identify Pest)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Camera Viewfinder */}
      <div className="relative w-full h-full">
        {/* Mock Camera Feed */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
          {/* Simple Grid Overlay */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white" />
            ))}
          </div>

          {/* Large Focus Frame */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-8 border-[#16a34a] rounded-3xl">
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-8 border-l-8 border-white rounded-tl-2xl"></div>
            <div className="absolute -top-2 -right-2 w-12 h-12 border-t-8 border-r-8 border-white rounded-tr-2xl"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-8 border-l-8 border-white rounded-bl-2xl"></div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-8 border-r-8 border-white rounded-br-2xl"></div>
          </div>

          {/* Instruction Text */}
          {!scanning && !result && (
            <div className="absolute top-24 left-0 right-0 text-center text-white px-6">
              <p className="text-2xl font-bold mb-2">ပိုးမွှားကို ဘောင်အတွင်းထည့်ပါ</p>
              <p className="text-lg">Place pest inside the frame</p>
            </div>
          )}
        </div>

        {/* Top Close Button */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
          <button
            onClick={handleClose}
            className="w-16 h-16 flex items-center justify-center bg-black/70 rounded-full text-white border-4 border-white active:scale-95 transition-transform"
          >
            <X className="w-8 h-8" strokeWidth={3} />
          </button>
        </div>

        {/* Scanning Overlay */}
        {scanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
            <div className="bg-white rounded-3xl p-10 max-w-sm mx-6 text-center space-y-6">
              <div className="w-24 h-24 mx-auto border-8 border-[#16a34a] border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-2">AI ဖြင့် ခွဲခြားနေသည်...</p>
                <p className="text-lg text-gray-600">Analyzing with AI...</p>
              </div>
            </div>
          </div>
        )}

        {/* Result Card Overlay */}
        {result && (
          <div className="absolute inset-0 flex items-end">
            <div className="w-full bg-white rounded-t-[3rem] p-8 max-h-[75vh] overflow-y-auto border-t-8 border-[#16a34a]">
              {/* Confidence Badge */}
              <div className="flex items-center justify-center mb-6">
                <Badge className="text-2xl py-3 px-6 bg-[#16a34a] text-white border-4 border-[#15803d]">
                  <span className="text-3xl mr-2">✓</span>
                  {result.confidence}% ယုံကြည်မှု
                </Badge>
              </div>

              {/* Large Pest Photo Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-6 flex items-center justify-center border-4 border-gray-400">
                <span className="text-6xl">🐛</span>
              </div>

              {/* Pest Name */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{result.nameMM}</h2>
                <p className="text-xl text-gray-600">{result.name}</p>
              </div>

              {/* Treatment Checklist - Simple 1-2-3 */}
              <Card className="bg-[#FEF3C7] border-4 border-[#E67E22] mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">💊</span>
                    <h3 className="text-2xl font-bold text-gray-900">ကုသမှုနည်းလမ်း</h3>
                  </div>

                  <div className="space-y-4">
                    {result.treatmentMM.map((treatment, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="w-12 h-12 bg-[#E67E22] text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-gray-900 mb-1">{treatment}</p>
                          <p className="text-base text-gray-600">{result.treatment[index]}</p>
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
                  onClick={() => alert("Verify via Community (Feature coming soon)")}
                >
                  <span className="text-2xl mr-2">👥</span>
                  လူမှုကွန်ရက်တွင် အတည်ပြုရန်
                </Button>
                
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
              <div className="mt-6 bg-[#FEF3C7] border-4 border-[#FDB813] rounded-xl p-4">
                <p className="text-base text-gray-900">
                  <span className="text-2xl mr-2">⚠️</span>
                  သတိပေးချက်: ဓာတုပစ္စည်းများကို သတ်မှတ်ချက်အတိုင်း အသုံးပြုပါ။
                </p>
                <p className="text-sm text-gray-600 mt-1 ml-9">
                  Warning: Always follow chemical application guidelines.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Capture Button - Massive Green Circle */}
        {!scanning && !result && (
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4">
            <button
              onClick={handleScan}
              className="w-28 h-28 bg-[#16a34a] rounded-full border-8 border-white shadow-2xl active:scale-95 transition-transform flex items-center justify-center"
            >
              <div className="w-20 h-20 bg-white rounded-full"></div>
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