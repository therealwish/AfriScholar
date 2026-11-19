"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function SaveButton({ scholarshipId }: { scholarshipId: string }) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkSavedStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setLoading(false);
        return;
      }
      
      setUserId(session.user.id);

      const { data } = await supabase
        .from("saved_scholarships")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("scholarship_id", scholarshipId)
        .single();

      setIsSaved(!!data);
      setLoading(false);
    };

    checkSavedStatus();
  }, [scholarshipId]);

  const toggleSave = async () => {
    if (!userId) {
      alert("Please log in to save scholarships.");
      return;
    }

    setLoading(true);

    if (isSaved) {
      await supabase
        .from("saved_scholarships")
        .delete()
        .eq("user_id", userId)
        .eq("scholarship_id", scholarshipId);
      setIsSaved(false);
    } else {
      await supabase
        .from("saved_scholarships")
        .insert([{ user_id: userId, scholarship_id: scholarshipId }]);
      setIsSaved(true);
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
