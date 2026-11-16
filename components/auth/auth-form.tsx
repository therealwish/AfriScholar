"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);

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

      <form className="space-y-4 border-2 border-ink bg-paper p-8 shadow-none">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Tariro Moyo"
              className="w-full border-2 border-ink/20 p-3 focus:border-forest focus:outline-none bg-paper text-ink transition-colors"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Email Address</label>
          <input 
            type="email" 
            placeholder="you@example.com"
            className="w-full border-2 border-ink/20 p-3 focus:border-forest focus:outline-none bg-paper text-ink transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full border-2 border-ink/20 p-3 focus:border-forest focus:outline-none bg-paper text-ink transition-colors"
          />
        </div>

        <Button type="button" className="w-full mt-6">
          {isLogin ? "Log in" : "Create free account"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button 
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-ink-soft hover:text-forest transition-colors underline underline-offset-4"
        >
          {isLogin 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}