"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function SaveButton({ scholarshipId }: { scholarshipId: string }) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSavedStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("saved_scholarships")
        .select("id")
        .eq("user_id", user.id)
        .eq("scholarship_id", scholarshipId)
        .maybeSingle();

      if (error) console.error("Check status error:", error);
      setIsSaved(!!data);
      setLoading(false);
    };

    checkSavedStatus();
  }, [scholarshipId]);

  const toggleSave = async () => {
    setLoading(true);
    
    // 1. Get the user directly to ensure we have a fresh ID
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      alert("You need to be logged in to save.");
      setLoading(false);
      return;
    }

    if (isSaved) {
      // Handle Unsave
      const { error } = await supabase
        .from("saved_scholarships")
        .delete()
        .eq("user_id", user.id)
        .eq("scholarship_id", scholarshipId);
      
      if (error) {
        alert("Error unsaving: " + error.message);
      } else {
        setIsSaved(false);
      }
    } else {
      // Handle Save
      const { error } = await supabase
        .from("saved_scholarships")
        .insert({ user_id: user.id, scholarship_id: scholarshipId });
      
      if (error) {
        // This will pop up an alert on your screen so we can see the exact DB error
        alert("Database Error: " + error.message);
        console.error(error);
      } else {
        setIsSaved(true);
      }
    }

    setLoading(false);
  };

  if (loading) {
    return <div className="h-5 w-5 animate-pulse bg-ink/10 rounded-sm"></div>;
  }

  return (
    <button 
      onClick={toggleSave}
      className={`text-xs font-mono uppercase tracking-wider transition-colors ${
        isSaved ? "text-forest font-bold" : "text-ink-faint hover:text-forest"
      }`}
    >
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}