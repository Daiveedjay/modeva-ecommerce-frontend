import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { ImageCarousel } from "@/components/auth/image-carousel";
export const metadata: Metadata = {
  title: "Sign In | Modeva",
  description: "Sign in to access your Modeva account",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image carousel */}
      <div className="hidden lg:block lg:w-1/2 xl:w-[55%] relative bg-muted">
        <ImageCarousel />
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-20 bg-background">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-16">
            <span className="text-2xl tracking-[0.3em] uppercase font-light font-beatrice-deck">
              Modeva
            </span>
          </div>

          {/* Editorial tagline */}
          <div className="mb-12">
            <h1 className="font-(family-name:--font-playfair) text-4xl md:text-5xl font-light leading-tight tracking-tight text-balance">
              Where elegance
              <br />
              meets expression
            </h1>
            <p className="mt-6 text-muted-foreground text-sm leading-relaxed max-w-sm">
              Sign in to explore curated collections, manage your wishlist, and
              enjoy an exclusive shopping experience.
            </p>
          </div>

          {/* Login form */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-foreground transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile image - shown below form on small screens */}
      <div className="lg:hidden h-64 relative bg-muted">
        <img
          src="https://images.unsplash.com/photo-1746730921374-ab56549262f3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fashion editorial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
      </div>
    </main>
  );
}
