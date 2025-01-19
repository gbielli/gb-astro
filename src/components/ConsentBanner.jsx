"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const ConsentBanner = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieConsent="));

    if (!consentCookie) {
      document.body.style.overflow = "hidden";
      setShouldShow(true);
    }
  }, []);

  const setCookie = (value) => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `cookieConsent=${value}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
  };

  const handleConsent = (value) => {
    setCookie(value);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consent_update",
      consent_state: value,
    });
    setShouldShow(false);
    document.body.style.overflow = "auto";
  };

  if (!shouldShow) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-lg animate-in slide-in-from-bottom-4 duration-300">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold">
                Je respecte votre vie privée
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleConsent("denied")}
                className="shrink-0 -mt-2 -mr-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-muted-foreground text-sm">
              J'utilise des cookies pour améliorer votre expérience, suivre la
              qualité et la performance de mon contenu.
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => handleConsent("granted")}
                className="min-w-[120px]"
              >
                Accepter
              </Button>
              <Button
                variant="outline"
                onClick={() => handleConsent("denied")}
                className="min-w-[120px]"
              >
                Refuser
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ConsentBanner;
