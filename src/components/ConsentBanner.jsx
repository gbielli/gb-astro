// src/components/ConsentBanner.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const ConsentBanner = () => {
  // États pour gérer la visibilité et le montage du composant
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Vérifie l'existence du cookie de consentement au montage du composant
  useEffect(() => {
    setIsMounted(true);
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieConsent="));

    // Si aucun cookie n'existe, affiche la bannière et bloque le scroll
    if (!consentCookie) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  // Fonction pour définir le cookie avec une expiration d'un an
  const setCookie = (value) => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `cookieConsent=${value}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
  };

  // Fonction pour mettre à jour le dataLayer de GTM
  const updateGTMConsent = (value) => {
    // Initialise ou réinitialise le dataLayer
    window.dataLayer = window.dataLayer || [];

    // Pousse le nouvel événement de consentement
    window.dataLayer.push({
      event: "consent_update",
      consent_state: value,
    });
  };

  // Gestionnaire pour l'acceptation des cookies
  const handleAccept = () => {
    setCookie("granted");
    updateGTMConsent("granted");
    setIsVisible(false);
    document.body.style.overflow = "auto";
  };

  // Gestionnaire pour le refus des cookies
  const handleDecline = () => {
    setCookie("denied");
    updateGTMConsent("denied");
    setIsVisible(false);
    document.body.style.overflow = "auto";
  };

  // Ne rend rien si le composant n'est pas monté ou n'est pas visible
  if (!isMounted) return null;
  if (!isVisible) return null;

  return (
    <>
      {/* Overlay qui bloque l'interaction avec le reste de la page */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

      {/* Conteneur centré avec la popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-lg animate-in slide-in-from-bottom-4 duration-300">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold">
                  Nous respectons votre vie privée
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecline}
                  className="shrink-0 -mt-2 -mr-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-muted-foreground">
                Nous utilisons des cookies pour améliorer votre expérience de
                navigation, personnaliser le contenu et les publicités, fournir
                des fonctionnalités de médias sociaux et analyser notre trafic.
                Veuillez choisir si vous acceptez l'utilisation de ces cookies.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  variant="default"
                  onClick={handleAccept}
                  className="min-w-[120px]"
                >
                  Accepter
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="min-w-[120px]"
                >
                  Refuser
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ConsentBanner;
