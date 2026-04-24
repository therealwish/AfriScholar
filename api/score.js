export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { studentData } = req.body;

    const prompt = `You are an expert international university admissions advisor specialising in African student scholarship applications.

Analyse this student profile and return their scholarship competitiveness score as JSON.

STUDENT PROFILE:
- Study level: ${studentData.grade_level}
- Grade average: ${studentData.grade_average}%
- Subjects: ${studentData.subjects.join(", ") || "Not specified"}
- Target field: ${studentData.target_field}
- Target degree: ${studentData.target_degree}
- Target countries: ${studentData.target_countries.join(", ") || "Not specified"}
- Intended start: ${studentData.intended_start}
- English test: ${studentData.english_test}${studentData.english_score ? ` (Score: ${studentData.english_score})` : ""}
- Extracurriculars: ${studentData.extracurriculars || "None mentioned"}
- Awards: ${studentData.awards || "None mentioned"}
- Leadership: ${studentData.leadership || "None mentioned"}
- Volunteer/Work: ${studentData.volunteer || "None mentioned"}
- Financial need: ${studentData.financial_need}

SCORING RULES — be realistic, international scholarship competition is fierce:
- 0-35: Weak profile, major gaps
- 36-50: Below average for international scholarships
- 51-65: Average — competitive for some but not top programmes
- 66-79: Strong — good shot at many scholarships with solid applications
- 80-89: Excellent — competitive for most scholarships
- 90+: Exceptional only (near perfect grades + major national awards + strong English)

Breakdown maxes: academics=40, profile=35, readiness=25

Return ONLY this JSON, nothing else:
{"score":<0-100>,"breakdown":{"academics":<0-40>,"profile":<0-35>,"readiness":<0-25>},"feedback":["<specific point 1>","<specific point 2>","<specific point 3>","<specific point 4>"]}

Feedback must reference THIS student's actual data, not be generic.`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 600,
        temperature: 0.25,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: error.message });
  }
}