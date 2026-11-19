import { Scholarship } from "./types";

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

// We now pass the scholarships from the database into this function
export function getMatchedScholarships(answers: QuizAnswers, databaseScholarships: Scholarship[]) {
  const eligible = databaseScholarships.filter((scholarship) => {
    const userDegree = answers.degree.toLowerCase();
    const scholarshipLevel = scholarship.level.toLowerCase();

    const matchesDegree = 
      (userDegree === "undergraduate" && (scholarshipLevel.includes("undergrad") || scholarshipLevel === "any")) ||
      (userDegree === "master's" && (scholarshipLevel.includes("postgrad") || scholarshipLevel.includes("master") || scholarshipLevel === "any")) ||
      (userDegree === "phd" && (scholarshipLevel.includes("phd") || scholarshipLevel === "any")) ||
      (userDegree === "short course" && (scholarshipLevel.includes("short") || scholarshipLevel === "any"));

    if (!matchesDegree) return false;

    return true; 
  });

  return eligible;
}