export const site = {
  name: "AfriScholar",
  short: "AS",
  tagline: "Learn. Apply. Get funded.",
  description:
    "A free platform for young Africans to discover scholarships, learn business skills, and access real funding. All in one place.",
  nav: [
    { label: "Scholarships", href: "/scholarships" },
    { label: "Grants", href: "/grants" },
    { label: "Learn", href: "/learn" },
    { label: "Community", href: "/community" },
  ],
  levels: ["Undergrad", "Postgrad", "PhD", "Any"] as const,
  funding: ["Full", "Partial", "Tuition only", "Stipend"] as const,
  cities: [
    "Harare",
    "Bulawayo",
    "Mutare",
    "Gweru",
    "Masvingo",
    "Chitungwiza",
    "Other",
  ] as const,
} as const;