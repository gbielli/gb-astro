import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const ConsentBanner = () => {
  // Regroupons les états liés dans un seul objet pour une meilleure gestion
  const [state, setState] = useState({
    isVisible: false,
    isMounted: false,
  });

  // Séparons la logique de gestion des cookies dans des fonctions utilitaires
  const checkConsentCookie = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieConsent="));
  };

  const setCookie = (value) => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `cookieConsent=${value}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
  };

  // Fonction utilitaire pour gérer l'état du scroll
  const toggleScrollLock = (lock) => {
    document.body.style.overflow = lock ? "hidden" : "auto";
  };

  // Gestionnaire unifié pour le consentement
  const handleConsent = (value) => {
    setCookie(value);
    setState((prev) => ({ ...prev, isVisible: false }));
    toggleScrollLock(false);
  };

  useEffect(() => {
    // Initialisation du composant
    const consentCookie = checkConsentCookie();

    setState({
      isMounted: true,
      isVisible: !consentCookie,
    });

    // Si pas de consentement, verrouiller le scroll
    if (!consentCookie) {
      toggleScrollLock(true);
    }

    // Nettoyage lors du démontage du composant
    return () => {
      toggleScrollLock(false);
    };
  }, []);

  // Protection contre le rendu prématuré
  if (!state.isMounted || !state.isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
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
                  onClick={() => handleConsent("denied")}
                  className="shrink-0 -mt-2 -mr-2"
                  aria-label="Refuser les cookies"
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
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ConsentBanner;
