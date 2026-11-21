"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// 1. Define the custom event type so we don't use 'any'
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPrompt() {
  // 2. Use the custom type here
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault(); // Prevent the default mini-infobar
      
      // 3. Cast the event to our custom type
      setDeferredPrompt(e as BeforeInstallPromptEvent); 
      
      const dismissed = localStorage.getItem("installPromptDismissed");
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("installPromptDismissed", "true");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[100]">
      <div className="bg-forest text-paper p-4 shadow-hard-gold border-2 border-ink flex flex-col gap-3">
        <p className="text-sm font-semibold">
          Install AfriScholar for quick access to scholarships and grants. Works offline!
        </p>
        <div className="flex gap-3">
          <Button 
            onClick={handleInstallClick}
            className="flex-1 bg-paper text-forest hover:bg-paper-deep border-none"
          >
            Install App
          </Button>
          <button
            onClick={handleDismiss}
            className="text-xs text-paper/60 hover:text-paper underline self-center"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}