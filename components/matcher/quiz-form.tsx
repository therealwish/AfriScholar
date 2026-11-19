"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getMatchedScholarships } from "@/lib/matcher";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { Scholarship } from "@/lib/types"; // Updated import

type QuizAnswers = {
  degree: string;
  grade: string;
  region: string;
  fundingNeed: string;
  field: string;
  timeline: string;
  achievement: string;
  vision: string;
  tests: string;
  extraNote: string;
};

// Added databaseScholarships prop
export function QuizForm({ databaseScholarships }: { databaseScholarships: Scholarship[] }) {
  const [step, setStep] = useState(1);
  
  const [results, setResults] = useState<Scholarship[]>([]);
  
  const [answers, setAnswers] = useState<QuizAnswers>({
    degree: "",
    grade: "",
    region: "",
    fundingNeed: "",
    field: "",
    timeline: "",
    achievement: "",
    vision: "",
    tests: "",
    extraNote: "",
  });

  const updateAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  // --- STAGE 1 ---
  if (step === 1) {
    const isComplete = answers.degree && answers.grade && answers.region;
    return (
      <div className="border-2 border-ink bg-paper p-8">
        <ProgressBar step={1} />
        
        <div className="mb-8">
          <h2 className="text-3xl text-forest">Hard Eligibility</h2>
          <p className="text-ink-soft mt-2">We only show you what you legally qualify for.</p>
        </div>

        <div className="space-y-8">
          <Question 
            label="Target Degree Level" 
            options={["Undergraduate", "Master's", "PhD", "Short Course"]} 
            selected={answers.degree} 
            onSelect={(val) => updateAnswer("degree", val)} 
          />
          <Question 
            label="Current Academic Standing" 
            options={["Top 5% / Straight A's", "Mostly A's & B's", "Average / B's & C's", "Awaiting results"]} 
            selected={answers.grade} 
            onSelect={(val) => updateAnswer("grade", val)} 
          />
          <Question 
            label="Citizenship / Home Region" 
            options={["Sub-Saharan Africa", "North Africa", "South Asia", "Other"]} 
            selected={answers.region} 
            onSelect={(val) => updateAnswer("region", val)} 
          />
        </div>

        <div className="mt-10 pt-6 border-t-2 border-ink flex justify-end">
          <Button onClick={handleNext} disabled={!isComplete}>
            Next stage →
          </Button>
        </div>
      </div>
    );
  }

  // --- STAGE 2 ---
  if (step === 2) {
    const isComplete = answers.fundingNeed && answers.field && answers.timeline;
    return (
      <div className="border-2 border-ink bg-paper p-8">
        <ProgressBar step={2} />
        
        <div className="mb-8">
          <h2 className="text-3xl text-forest">Financial & Lifestyle Fit</h2>
          <p className="text-ink-soft mt-2">Let us know what package actually works for you.</p>
        </div>

        <div className="space-y-8">
          <Question 
            label="Funding Need" 
            options={["Full-ride only", "Full tuition", "Partial (50%+)", "Any top university"]} 
            selected={answers.fundingNeed} 
            onSelect={(val) => updateAnswer("fundingNeed", val)} 
          />
          <Question 
            label="Field of Study" 
            options={["Computer Science", "Engineering", "Business", "Health Sciences", "Social Sciences", "Arts"]} 
            selected={answers.field} 
            onSelect={(val) => updateAnswer("field", val)} 
          />
          <Question 
            label="Application Timeline" 
            options={["Within 6 months", "Next academic year", "In 1 to 2 years"]} 
            selected={answers.timeline} 
            onSelect={(val) => updateAnswer("timeline", val)} 
          />
        </div>

        <div className="mt-10 pt-6 border-t-2 border-ink flex justify-between">
          <Button variant="secondary" onClick={handleBack}>
            ← Back
          </Button>
          <Button onClick={handleNext} disabled={!isComplete}>
            Next stage →
          </Button>
        </div>
      </div>
    );
  }

  // --- STAGE 3 ---
  if (step === 3) {
    const isComplete = answers.achievement && answers.vision && answers.tests;
    return (
      <div className="border-2 border-ink bg-paper p-8">
        <ProgressBar step={3} />
        
        <div className="mb-8">
          <h2 className="text-3xl text-forest">Holistic Profile</h2>
          <p className="text-ink-soft mt-2">Top scholarships look at who you are, not just your grades.</p>
        </div>

        <div className="space-y-8">
          <Question 
            label="Strongest Achievement Outside Class" 
            options={["Building projects / Startups", "Community service", "Student leadership", "Academic Olympiads", "Sports / Arts"]} 
            selected={answers.achievement} 
            onSelect={(val) => updateAnswer("achievement", val)} 
          />
          <Question 
            label="Primary Goal After Graduating" 
            options={["Launch a business", "Drive local development", "Conduct research", "Work at a global company"]} 
            selected={answers.vision} 
            onSelect={(val) => updateAnswer("vision", val)} 
          />
          <Question 
            label="Test & English Readiness" 
            options={["SAT/ACT or GRE/GMAT", "IELTS/TOEFL only", "No tests yet", "Studied in English (Exempt)"]} 
            selected={answers.tests} 
            onSelect={(val) => updateAnswer("tests", val)} 
          />
          
          <div>
            <label className="block text-lg text-ink mb-2">Anything else? (Optional)</label>
            <p className="text-sm text-ink-soft mb-3">Specific sports, disabilities, or unique awards.</p>
            <textarea 
              value={answers.extraNote}
              onChange={(e) => updateAnswer("extraNote", e.target.value)}
              className="w-full border-2 border-ink/20 p-3 focus:border-forest focus:outline-none bg-paper text-ink"
              rows={3}
              placeholder="I am a national chess champion..."
            />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t-2 border-ink flex justify-between">
          <Button variant="secondary" onClick={handleBack}>
            ← Back
          </Button>
          <Button 
            onClick={() => {
              // Pass the database scholarships to the engine here
              const matches = getMatchedScholarships(answers, databaseScholarships);
              setResults(matches);
              setStep(4); 
            }} 
            disabled={!isComplete}
          >
            Find my matches
          </Button>
        </div>
      </div>
    );
  }

  // --- RESULTS ---
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl text-forest">Your Matches</h2>
        <p className="text-ink-soft mt-2">
          We found {results.length} opportunities you are eligible for based on your profile.
        </p>
      </div>
      
      {results.length === 0 ? (
        <div className="border-2 border-ink/20 bg-paper-deep p-8 text-center">
          <p className="text-ink-soft">
            No exact matches found for your specific combination yet. Try adjusting your degree level or check the full scholarships list.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {results.map((item) => (
            <ScholarshipCard key={item.id} scholarship={item} />
          ))}
        </div>
      )}

      <div className="pt-8 text-center">
        <Button variant="secondary" onClick={() => setStep(1)}>
          Start over
        </Button>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-2 mb-8 border-b-2 border-ink/10 pb-6">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className={`h-2 flex-1 ${i <= step ? "bg-forest" : "bg-ink/10"}`} 
        />
      ))}
    </div>
  );
}

function Question({ label, options, selected, onSelect }: { label: string, options: string[], selected: string, onSelect: (val: string) => void }) {
  return (
    <div>
      <label className="block text-lg text-ink mb-3">{label}</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`text-left px-4 py-3 border-2 transition-all ${
              selected === option 
                ? "border-forest bg-forest/10 text-forest" 
                : "border-ink/20 hover:border-ink text-ink-soft"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}