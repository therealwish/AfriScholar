import { allScholarships } from "./data";

export type QuizAnswers = {
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

export function getMatchedScholarships(answers: QuizAnswers) {
  // 1. Filter the 25 scholarships down to only what they are eligible for
  const eligible = allScholarships.filter((scholarship) => {
    const userDegree = answers.degree.toLowerCase();
    const scholarshipLevel = scholarship.level.toLowerCase();

    // Degree Match Logic
    const matchesDegree = 
      (userDegree === "undergraduate" && (scholarshipLevel.includes("undergrad") || scholarshipLevel === "any")) ||
      (userDegree === "master's" && (scholarshipLevel.includes("postgrad") || scholarshipLevel.includes("master") || scholarshipLevel === "any")) ||
      (userDegree === "phd" && (scholarshipLevel.includes("phd") || scholarshipLevel === "any")) ||
      (userDegree === "short course" && (scholarshipLevel.includes("short") || scholarshipLevel === "any"));

    if (!matchesDegree) return false;

    // (Future logic: We can add region or grade filters here using the `answers` object)

    return true; // If it passes all hard filters, keep it
  });

  // 2. Rank the eligible ones (For now, we just return them. AI will handle ranking later)
  return eligible;
}