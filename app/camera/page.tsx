"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  // Stream is stored in a ref (not state) so that updating it never triggers
  // a re-render, which would re-run the srcObject assignment effect in a loop.
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 1280, height: 720 },
        audio: false,
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      setError(null);
    } catch (err) {
      setError("Kamera-Zugriff verweigert. Bitte erlauben Sie den Kamera-Zugriff in Ihren Browser-Einstellungen.");
      console.error("Camera error:", err);
    }
  }, []);

  // srcObject must be set after the <video> element is in the DOM, so it lives
  // in a separate effect that runs when isCameraActive flips to true.
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraActive]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg", 0.9);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setError(null);
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Bitte wählen Sie eine Bilddatei aus.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setCapturedImage(dataUrl);
      setError(null);
    };
    reader.readAsDataURL(file);
    // Reset so the same file can be re-selected if needed
    e.target.value = "";
  }, []);

  const analyzePhoto = useCallback(async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Convert base64 data URL to Blob
      const blobResponse = await fetch(capturedImage);
      const blob = await blobResponse.blob();

      const formData = new FormData();
      formData.append("file", blob, "skin.jpg");
      formData.append("tta", "false");

      const apiResponse = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || "Analyse fehlgeschlagen");
      }

      const result = await apiResponse.json();

      // Pass result and image via sessionStorage so the next page can read them
      // without exposing them in the URL or a global store.
      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      sessionStorage.setItem("analysisImage", capturedImage);

      router.push("/analysis-result");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Analyse fehlgeschlagen. Bitte versuchen Sie es erneut."
      );
      setIsAnalyzing(false);
    }
  }, [capturedImage, router]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Hautanalyse</h1>
          <p className="text-muted-foreground">
            Nehmen Sie ein Foto auf oder laden Sie ein Bild hoch
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Live camera feed */}
        {isCameraActive && !capturedImage && (
          <div className="space-y-4">
            <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 justify-center">
              <Button size="lg" onClick={capturePhoto}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Foto aufnehmen
              </Button>
              <Button size="lg" variant="outline" onClick={stopCamera}>
                Abbrechen
              </Button>
            </div>
          </div>
        )}

        {/* Captured image preview */}
        {capturedImage && (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border">
              <img
                src={capturedImage}
                alt="Aufgenommenes Bild"
                className="w-full object-contain max-h-96"
              />
            </div>
            <div className="flex gap-3 justify-center">
              <Button size="lg" onClick={analyzePhoto} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analysiere...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                      <path d="m9 11-6 6v3h9l3-3" />
                      <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
                    </svg>
                    Jetzt analysieren
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline" onClick={retakePhoto} disabled={isAnalyzing}>
                Anderes Bild wählen
              </Button>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Idle state, just the action buttons */}
        {!isCameraActive && !capturedImage && (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="flex gap-3">
              <Button size="lg" onClick={startCamera}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                Kamera starten
              </Button>
              <Button size="lg" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Bild hochladen
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Gute Beleuchtung · Läsion vollständig im Bild · 10–15 cm Abstand
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
