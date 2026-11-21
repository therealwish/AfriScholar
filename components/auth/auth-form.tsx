"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export function AuthForm({ initialMode = "signup" }: { initialMode?: "login" | "signup" }) {
  // Set the initial state based on the URL parameter
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (isLogin) {
      // Handle Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
        router.refresh(); // Force the navbar to update immediately
      }
    } else {
      // Handle Sign Up
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name }, // Saves the name to the user profile
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess("Account created! Redirecting...");
        // Redirect immediately since we turned off email confirmation
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 800); // 0.8 second delay just so they see the success message
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl text-forest mb-2">
          {isLogin ? "Welcome back." : "Join AfriScholar."}
        </h1>
        <p className="text-ink-soft">
          {isLogin 
            ? "Log in to track your applications and saved opportunities." 
            : "Create a free account to save scholarships and access grants."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border-2 border-ink bg-paper p-8 shadow-none">
        
        {/* Error & Success Messages */}
        {error && <div className="bg-clay/10 text-clay border-2 border-clay p-3 text-sm">{error}</div>}
        {success && <div className="bg-forest/10 text-forest border-2 border-forest p-3 text-sm">{success}</div>}

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tariro Moyo"
              className="w-full border-2 border-ink/20 p-3 focus:border-forest focus:outline-none bg-paper text-ink transition-colors"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border-2 border-ink/20 p-3 focus:border-forest focus:outline-none bg-paper text-ink transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border-2 border-ink/20 p-3 focus:border-forest focus:outline-none bg-paper text-ink transition-colors"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full mt-6">
          {loading ? "Please wait..." : isLogin ? "Log in" : "Create free account"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button 
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
            setSuccess(null);
          }}
          className="text-sm text-ink-soft hover:text-forest transition-colors underline underline-offset-4"
        >
          {/* Using &apos; to prevent build errors */}
          {isLogin 
            ? "Don&apos;t have an account? Sign up" 
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}