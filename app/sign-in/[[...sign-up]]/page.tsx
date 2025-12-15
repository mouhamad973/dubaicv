import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fcfaf7]">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fcfaf7] to-white" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="hidden lg:flex flex-col justify-center">
            <Link href="/" className="inline-flex items-center gap-3 w-fit">
              <img
                src="/img/logo.png"
                alt="logo"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <h1 className="mt-10 text-4xl font-semibold tracking-tight text-gray-900">
              Connexion
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600 max-w-md">
              Connectez-vous pour accéder à votre espace et, si vous êtes autorisé,
              à l'administration.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                Retour à la boutique
              </Link>
              <span className="text-gray-300">/</span>
              <Link
                href="/sign-up"
                className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                Créer un compte
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="rounded-3xl bg-white/80 backdrop-blur border border-gray-200 shadow-xl shadow-black/5 p-6 sm:p-8">
                <div className="flex items-center justify-between lg:hidden mb-6">
                  <Link href="/" className="inline-flex items-center gap-3">
                    <img
                      src="/img/logo.png"
                      alt="logo"
                      className="h-9 w-auto object-contain"
                    />
                  </Link>
                  <Link
                    href="/"
                    className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                  >
                    Retour
                  </Link>
                </div>

                <SignIn
                  appearance={{
                    variables: {
                      colorPrimary: "#d97706",
                      colorText: "#111827",
                      colorTextSecondary: "#6b7280",
                      colorBackground: "transparent",
                      colorInputBackground: "#ffffff",
                      borderRadius: "14px",
                    },
                    elements: {
                      card: "bg-transparent shadow-none p-0",
                      headerTitle: "text-2xl font-semibold text-gray-900",
                      headerSubtitle: "text-sm text-gray-600",
                      socialButtonsBlockButton:
                        "border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors rounded-xl",
                      formButtonPrimary:
                        "bg-gray-900 hover:bg-amber-600 text-white rounded-xl transition-colors",
                      formFieldInput:
                        "rounded-xl border-gray-200 focus:border-amber-500 focus:ring-amber-500",
                      footerActionLink:
                        "text-amber-700 hover:text-amber-600",
                    },
                  }}
                />
              </div>
              <p className="mt-6 text-center text-xs text-gray-500">
                En continuant, vous acceptez nos conditions et notre politique de
                confidentialité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}