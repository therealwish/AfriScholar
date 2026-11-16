import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-paper">
      
      {/* Left Side: Bold Brand Statement */}
      <div className="hidden md:flex md:w-1/2 bg-forest p-12 lg:p-20 flex-col justify-between relative overflow-hidden">


        <div className="relative z-10">
          <h2 className="text-4xl lg:text-6xl text-paper leading-[1.05] tracking-tight">
            The future of Africa is not waiting for permission.
          </h2>
          <p className="mt-6 text-lg text-paper/80 max-w-md">
            It is being built right now by students, founders, and creators who refuse to give up.
          </p>
        </div>
        <div className="relative z-10">
          <p className="font-mono text-sm text-gold uppercase tracking-widest">
            Learn. Build. Get funded.
          </p>
        </div>

        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-forest-soft rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </div>

      {/* Right Side: The Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <AuthForm />
      </div>

    </div>
  );
}