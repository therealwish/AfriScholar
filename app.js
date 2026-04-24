/* ═══════════════════════════════════════════════════
   AfriScholar — app.js
   Magic Link Auth · Survey · AI Match Score
   ═══════════════════════════════════════════════════ */

const SUPABASE_URL  = "https://mdzfrttreimhabhvxmpp.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kemZydHRyZWltaGFiaHZ4bXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NzI1OTUsImV4cCI6MjA5MjM0ODU5NX0.6XRuRHh581ao2-UpIYd_DXtjElHO4hepQTeXR8T1vYc";
const DEEPSEEK_URL  = "/api/score";  // Proxied via Vercel function

// ── Init Supabase with session persistence ─────────────────
const { createClient } = window.supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  }
});

// ── Data ───────────────────────────────────────────
const UNIS = [
    { id:1, name:"Ashesi University",            country:"Ghana",        ck:"ghana",       field:"Computer Science", fk:"cs",  funding:80,  duo:true,  req:{ minGrade:70 } },
    { id:2, name:"University of Cape Town",      country:"South Africa", ck:"southafrica", field:"Engineering",      fk:"eng", funding:75,  duo:true,  req:{ minGrade:75 } },
    { id:3, name:"USAP Community School",        country:"Zimbabwe",     ck:"zimbabwe",    field:"Various",          fk:"all", funding:100, duo:false, req:{ minGrade:80 } },
    { id:4, name:"Arizona State University",     country:"USA",          ck:"usa",         field:"Business",         fk:"bus", funding:60,  duo:true,  req:{ minGrade:70 } },
    { id:5, name:"University of Toronto",        country:"Canada",       ck:"canada",      field:"Computer Science", fk:"cs",  funding:50,  duo:true,  req:{ minGrade:85 } },
    { id:6, name:"University of Edinburgh",      country:"UK",           ck:"uk",          field:"Medicine",         fk:"med", funding:30,  duo:false, req:{ minGrade:90 } },
    { id:7, name:"Stellenbosch University",      country:"South Africa", ck:"southafrica", field:"Engineering",      fk:"eng", funding:90,  duo:false, req:{ minGrade:70 } },
    { id:8, name:"African Leadership University",country:"Rwanda",       ck:"rwanda",      field:"Business",         fk:"bus", funding:100, duo:true,  req:{ minGrade:65 } },
];
const FLAGS = { Ghana:"🇬🇭","South Africa":"🇿🇦",Zimbabwe:"🇿🇼",USA:"🇺🇸",Canada:"🇨🇦",UK:"🇬🇧",Rwanda:"🇷🇼" };

// ── State ──────────────────────────────────────────
let currentUser  = null;
let userProfile  = null;
let savedIds     = [];
let quickProfile = { grade:75, extra:"strong", english:"duolingo" };
let surveyStep   = 1;
const STEPS      = 5;

// ── DOM helpers ────────────────────────────────────
const get  = (id) => document.getElementById(id);
const show = (el) => { if (el) el.classList.remove("hidden"); };
const hide = (el) => { if (el) el.classList.add("hidden"); };

let D = {};
function cacheDOM() {
    D = {
        loader:       get("loadingScreen"),
        authWall:     get("authWall"),
        mainApp:      get("mainApp"),
        magicEmail:   get("magicEmail"),
        magicSendBtn: get("magicSendBtn"),
        magicSent:    get("magicSent"),
        magicEmailDisplay: get("magicEmailDisplay"),
        surveyModal:  get("surveyModal"),
        surveyBar:    get("surveyProgressBar"),
        surveyLabel:  get("surveyStepLabel"),
        surveyPrev:   get("surveyPrevBtn"),
        surveyNext:   get("surveyNextBtn"),
        surveySkip:   get("surveySkipBtn"),
        noSurveyBanner: get("noSurveyBanner"),
        scoreNumber:  get("scoreNumber"),
        ringFill:     get("ringFill"),
        scoreBreakdown: get("scoreBreakdown"),
        scoreFeedback:  get("scoreFeedback"),
        scoreActions:   get("scoreActions"),
        homeFeat:     get("homeFeaturedUnis"),
        results:      get("resultsContainer"),
        resultsMeta:  get("resultsMeta"),
        savedCont:    get("savedContainer"),
        toast:        get("toast"),
        userAvatar:   get("userAvatar"),
        userName:     get("userName"),
        signOutBtn:   get("signOutBtn"),
    };
}

// ── Toast ──────────────────────────────────────────
let toastTimer;
function toast(msg, ms = 2800) {
    if (!D.toast) return;
    D.toast.textContent = msg;
    D.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => D.toast.classList.remove("show"), ms);
}

function hideLoader() {
    const l = D.loader;
    if (!l) return;
    l.style.opacity = "0";
    l.style.transition = "opacity 0.4s";
    setTimeout(() => { l.style.display = "none"; }, 420);
}

// ═══════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════
async function initAuth() {
    const bail = setTimeout(() => {
        console.warn("Auth timed out — showing login");
        showAuthWall();
    }, 5000);

    try {
        const { data } = await sb.auth.getSession();
        clearTimeout(bail);
        if (data?.session?.user) {
            await onLogin(data.session.user);
        } else {
            showAuthWall();
        }
    } catch (e) {
        clearTimeout(bail);
        console.error("getSession error:", e);
        showAuthWall();
    }

    sb.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
            await onLogin(session.user);
        } else if (event === "SIGNED_OUT") {
            onLogout();
        }
    });
}

async function onLogin(user) {
    currentUser = user;

    let prof = null;
    try {
        const { data, error } = await sb.from("profiles").select("*").eq("id", user.id).single();
        if (error && error.code !== "PGRST116") console.warn("profile fetch:", error.message);
        prof = data;
    } catch(e) { /* non-fatal */ }

    if (!prof) {
        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split("@")[0];
        try {
            const { data } = await sb.from("profiles").insert({ id: user.id, email: user.email, full_name: name }).select().single();
            prof = data;
        } catch(e) { /* non-fatal */ }
        prof = prof || { id: user.id, email: user.email, full_name: user.email.split("@")[0], survey_completed: false, survey_skipped: false };
    }

    userProfile = prof;

    try {
        const { data } = await sb.from("saved_universities").select("university_id").eq("user_id", user.id);
        savedIds = data ? data.map(r => r.university_id) : [];
    } catch(e) { savedIds = []; }

    const name = prof.full_name || user.email || "Student";
    if (D.userAvatar) D.userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e3a2e&color=fff&size=64`;
    if (D.userName) D.userName.textContent = name.split(" ")[0];

    showMainApp();

    if (!prof.survey_completed && !prof.survey_skipped) {
        setTimeout(() => openSurvey(), 800);
    }
}

function onLogout() {
    currentUser = null;
    userProfile = null;
    savedIds = [];
    showAuthWall();
}

function showAuthWall() {
    hide(D.mainApp);
    hide(D.surveyModal);
    show(D.authWall);
    hideLoader();
}

function showMainApp() {
    hide(D.authWall);
    show(D.mainApp);
    hideLoader();
    renderAll();
    updateScoreSection();
}

// ── Magic Link ─────────────────────────────────────
function initMagicLink() {
    if (!D.magicSendBtn) return;
    D.magicSendBtn.addEventListener("click", sendMagicLink);
    D.magicEmail?.addEventListener("keydown", e => { if (e.key === "Enter") sendMagicLink(); });
}

async function sendMagicLink() {
    const email = D.magicEmail?.value.trim();
    if (!email || !email.includes("@")) {
        toast("Please enter a valid email address.");
        D.magicEmail?.focus();
        return;
    }

    D.magicSendBtn.disabled = true;
    D.magicSendBtn.innerHTML = `<span class="spinner"></span> Sending…`;

    try {
        const { error } = await sb.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
                shouldCreateUser: true,
            }
        });

        if (error) throw error;

        if (D.magicEmailDisplay) D.magicEmailDisplay.textContent = email;
        hide(get("magicFormWrap"));
        show(D.magicSent);

    } catch(e) {
        console.error("Magic link error:", e);
        toast("Something went wrong — please try again.");
        D.magicSendBtn.disabled = false;
        D.magicSendBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send me a login link`;
    }
}

function initSignOut() {
    D.signOutBtn?.addEventListener("click", async () => {
        await sb.auth.signOut();
    });
}

// ═══════════════════════════════════════════════════
// SURVEY
// ═══════════════════════════════════════════════════
function openSurvey() {
    surveyStep = 1;
    refreshSurveyUI();
    show(D.surveyModal);
}
window.openSurvey = openSurvey;

function closeSurvey() { hide(D.surveyModal); }

function refreshSurveyUI() {
    document.querySelectorAll(".survey-step").forEach(s => s.classList.remove("active"));
    const step = document.querySelector(`.survey-step[data-step="${surveyStep}"]`);
    if (step) step.classList.add("active");

    if (D.surveyBar) D.surveyBar.style.width = `${(surveyStep / STEPS) * 100}%`;
    if (D.surveyLabel) D.surveyLabel.textContent = `Step ${surveyStep} of ${STEPS}`;
    if (D.surveyPrev) D.surveyPrev.style.visibility = surveyStep === 1 ? "hidden" : "visible";
    if (D.surveyNext) D.surveyNext.innerHTML = surveyStep === STEPS
        ? `<i class="fa-solid fa-sparkles"></i> Calculate my score`
        : `Next <i class="fa-solid fa-arrow-right"></i>`;

    if (surveyStep === 3) {
        const testSel = get("s_englishTest");
        const scoreField = get("s_scoreField");
        if (testSel && scoreField) {
            testSel.onchange = () => {
                if (testSel.value && testSel.value !== "None") scoreField.classList.remove("hidden");
                else scoreField.classList.add("hidden");
            };
        }
    }
}

function initSurveyNav() {
    D.surveyNext?.addEventListener("click", async () => {
        if (!validateStep(surveyStep)) return;
        if (surveyStep < STEPS) {
            surveyStep++;
            refreshSurveyUI();
        } else {
            await submitSurvey();
        }
    });

    D.surveyPrev?.addEventListener("click", () => {
        if (surveyStep > 1) { surveyStep--; refreshSurveyUI(); }
    });

    D.surveySkip?.addEventListener("click", async () => {
        if (!currentUser) { closeSurvey(); return; }
        try { await sb.from("profiles").update({ survey_skipped: true }).eq("id", currentUser.id); } catch(e) {}
        if (userProfile) userProfile.survey_skipped = true;
        closeSurvey();
        updateScoreSection();
        toast("You can take the survey anytime from your Dashboard.");
    });
}

function validateStep(step) {
    const required = { 1: ["s_gradeLevel", "s_gradeAverage"], 2: ["s_targetField", "s_targetDegree"], 3: ["s_englishTest"], 4: [], 5: [] };
    for (const id of (required[step] || [])) {
        const el = get(id);
        if (!el || !el.value.trim()) {
            el?.focus();
            toast("Please fill in the required fields to continue.");
            return false;
        }
    }
    if (step === 5 && !document.querySelector('input[name="financialNeed"]:checked')) {
        toast("Please select your funding situation.");
        return false;
    }
    return true;
}

async function submitSurvey() {
    if (!currentUser) return;

    D.surveyNext.disabled = true;
    D.surveyNext.innerHTML = `<span class="spinner"></span> Analysing your profile…`;

    const data = {
        user_id:          currentUser.id,
        grade_level:      get("s_gradeLevel")?.value || "",
        grade_average:    parseInt(get("s_gradeAverage")?.value) || 0,
        subjects:         (get("s_subjects")?.value || "").split(",").map(s => s.trim()).filter(Boolean),
        target_field:     get("s_targetField")?.value || "",
        target_degree:    get("s_targetDegree")?.value || "",
        target_countries: (get("s_targetCountries")?.value || "").split(",").map(s => s.trim()).filter(Boolean),
        intended_start:   get("s_intendedStart")?.value || "",
        english_test:     get("s_englishTest")?.value || "",
        english_score:    get("s_englishScore")?.value || "",
        extracurriculars: get("s_extracurriculars")?.value || "",
        awards:           get("s_awards")?.value || "",
        leadership:       get("s_leadership")?.value || "",
        volunteer:        get("s_volunteer")?.value || "",
        financial_need:   document.querySelector('input[name="financialNeed"]:checked')?.value || "",
    };

    try { await sb.from("survey_responses").upsert(data); } catch(e) {}

    const ai = await getAIScore(data);

    try {
        await sb.from("profiles").update({
            survey_completed: true,
            survey_skipped: false,
            match_score: ai.score,
            match_breakdown: ai.breakdown,
            match_feedback: ai.feedback,
        }).eq("id", currentUser.id);
    } catch(e) {}

    if (userProfile) {
        userProfile.survey_completed = true;
        userProfile.match_score = ai.score;
        userProfile.match_breakdown = ai.breakdown;
        userProfile.match_feedback = ai.feedback;
    }

    closeSurvey();
    showSection("dashboard");
    updateScoreSection();
    toast("Your match score is ready! 🎉", 3500);
}

// ═══════════════════════════════════════════════════
// AI Score (Proxied)
// ═══════════════════════════════════════════════════
async function getAIScore(data) {
    try {
        const res = await fetch(DEEPSEEK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentData: data }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const raw = json.choices?.[0]?.message?.content || "";
        const clean = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        return JSON.parse(clean);

    } catch(e) {
        console.error("AI error, using fallback:", e);
        const g = data.grade_average || 0;
        const eng = data.english_test && data.english_test !== "None" ? 14 : 2;
        const act = (data.extracurriculars?.length || 0) > 15 ? 13 : 4;
        const aw  = (data.awards?.length || 0) > 5 ? 9 : 0;
        const sc  = Math.min(78, Math.round(g * 0.36 + eng + act + aw));
        return {
            score: sc,
            breakdown: {
                academics: Math.min(40, Math.round(g * 0.37)),
                profile:   Math.min(35, act + aw + 5),
                readiness: Math.min(25, eng + 4),
            },
            feedback: [
                "Score calculated offline — retake survey when online for AI analysis.",
                g >= 80 ? "Your grade average is competitive." : "Improving grades to 80%+ would boost your profile.",
                data.english_test !== "None" ? "English qualification is a strong advantage." : "Take Duolingo English Test to unlock more options.",
                (data.awards?.length || 0) > 5 ? "Your awards strengthen your profile." : "Entering competitions can improve your chances.",
            ],
        };
    }
}

// ═══════════════════════════════════════════════════
// SCORE RING
// ═══════════════════════════════════════════════════
function updateScoreSection() {
    if (!userProfile) return;
    const noSurvey = !userProfile.survey_completed;

    if (noSurvey) {
        show(D.noSurveyBanner);
        if (D.scoreNumber) D.scoreNumber.textContent = "—";
        if (D.scoreBreakdown) D.scoreBreakdown.innerHTML = "";
        if (D.scoreFeedback) D.scoreFeedback.innerHTML = "";
        if (D.scoreActions) D.scoreActions.innerHTML = `<button class="btn btn-small" onclick="openSurvey()"><i class="fa-solid fa-sparkles"></i> Take the survey</button>`;
        return;
    }

    hide(D.noSurveyBanner);

    const score     = userProfile.match_score || 0;
    const breakdown = userProfile.match_breakdown || {};
    const feedback  = userProfile.match_feedback || [];

    const ring = D.ringFill;
    if (ring) {
        ring.className = "ring-fill";
        const colour = score >= 80 ? "ring-great" : score >= 65 ? "ring-good" : score >= 45 ? "ring-ok" : "ring-low";
        ring.classList.add(colour);
        const circ = 502.65;
        ring.style.strokeDashoffset = circ;
        requestAnimationFrame(() => setTimeout(() => {
            ring.style.strokeDashoffset = circ - (score / 100) * circ;
        }, 120));
    }

    countUp(D.scoreNumber, score, 1300);

    if (D.scoreBreakdown) {
        D.scoreBreakdown.innerHTML = [
            { label:"Academic strength", key:"academics", max:40 },
            { label:"Profile & activities", key:"profile", max:35 },
            { label:"Readiness", key:"readiness", max:25 },
        ].map(item => {
            const val = breakdown[item.key] || 0;
            const pct = Math.round((val / item.max) * 100);
            return `<div class="breakdown-item">
                <div class="breakdown-label"><span>${item.label}</span><span>${val}/${item.max}</span></div>
                <div class="breakdown-bar-track"><div class="breakdown-bar-fill" data-w="${pct}%" style="width:0"></div></div>
            </div>`;
        }).join("");

        requestAnimationFrame(() => {
            document.querySelectorAll(".breakdown-bar-fill").forEach((b, i) => {
                setTimeout(() => { b.style.width = b.dataset.w; }, 250 + i * 130);
            });
        });
    }

    if (D.scoreFeedback && feedback.length) {
        D.scoreFeedback.innerHTML = feedback.map((f, i) => `
            <div class="feedback-item" style="animation-delay:${i*0.07}s">
                <i class="fa-solid fa-circle-arrow-right"></i><span>${f}</span>
            </div>`).join("");
    }

    if (D.scoreActions) {
        D.scoreActions.innerHTML = `<button class="btn btn-small btn-outline" onclick="openSurvey()"><i class="fa-solid fa-arrows-rotate"></i> Retake survey</button>`;
    }
}

function countUp(el, target, ms) {
    if (!el) return;
    const t0 = performance.now();
    const tick = (now) => {
        const p = Math.min((now - t0) / ms, 1);
        el.textContent = Math.round((1 - Math.pow(1-p, 3)) * target);
        if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

// ═══════════════════════════════════════════════════
// NAVIGATION & RENDERING
// ═══════════════════════════════════════════════════
function showSection(id) {
    document.querySelectorAll(".page-section").forEach(s => s.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.section === id));
    const target = get(id);
    if (target) target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id === "search") renderSearch();
    if (id === "dashboard") { renderDashboard(); updateScoreSection(); }
    if (id === "home") renderHome();
}
window.showSection = showSection;

function initNav() {
    document.querySelectorAll(".nav-item").forEach(n => {
        n.addEventListener("click", e => { e.preventDefault(); showSection(n.dataset.section); });
    });
}

function calcMatch(uni) {
    let s = 60;
    const g = parseInt(quickProfile.grade);
    if (g >= uni.req.minGrade) s += 20; else s -= 10;
    if (quickProfile.extra === "strong") s += 15;
    else if (quickProfile.extra === "moderate") s += 5;
    if (uni.duo && quickProfile.english === "duolingo") s += 10;
    else if (!uni.duo && quickProfile.english !== "duolingo") s += 5;
    return Math.min(99, Math.max(40, Math.round(s)));
}

function renderCards(container, unis) {
    if (!container) return;
    if (!unis.length) {
        container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon"><i class="fa-regular fa-face-frown-open"></i></div><p>No results match your filters.</p></div>`;
        return;
    }
    container.innerHTML = unis.map((uni, i) => {
        const match = calcMatch(uni);
        const saved = savedIds.includes(uni.id);
        return `<div class="uni-card" style="animation-delay:${i*0.05}s">
            <div class="uni-header"><span class="uni-name">${uni.name}</span><span class="match-badge">${match}% match</span></div>
            <div class="uni-meta">${FLAGS[uni.country]||"🌍"} ${uni.country} · ${uni.field}</div>
            <div class="funding"><i class="fa-solid fa-circle-dollar-to-slot" style="opacity:.6;font-size:.8rem;margin-right:5px"></i>Up to ${uni.funding}% funding</div>
            ${uni.duo ? `<div class="duolingo-tag"><i class="fa-regular fa-circle-check"></i> Duolingo accepted</div>` : ""}
            <div class="card-actions">
                <button class="btn btn-small btn-outline save-btn" data-id="${uni.id}">
                    <i class="${saved?"fa-solid":"fa-regular"} fa-bookmark"></i> ${saved?"Saved":"Save"}
                </button>
            </div>
        </div>`;
    }).join("");

    container.querySelectorAll(".save-btn").forEach(btn => {
        btn.addEventListener("click", () => toggleSave(parseInt(btn.dataset.id)));
    });
}

async function toggleSave(id) {
    if (!currentUser) { toast("Sign in to save universities."); return; }
    const uni = UNIS.find(u => u.id === id);
    if (!uni) return;

    if (savedIds.includes(id)) {
        savedIds = savedIds.filter(x => x !== id);
        try { await sb.from("saved_universities").delete().eq("user_id", currentUser.id).eq("university_id", id); } catch(e){}
        toast("Removed from your dashboard.");
    } else {
        savedIds.push(id);
        try { await sb.from("saved_universities").insert({ user_id: currentUser.id, university_id: id, university_name: uni.name }); } catch(e){}
        toast(`${uni.name} saved ✓`);
    }
    renderAll();
}

function renderHome() {
    const top3 = [...UNIS].sort((a,b) => calcMatch(b) - calcMatch(a)).slice(0,3);
    renderCards(D.homeFeat, top3);
}

function getFiltered() {
    const country = get("filterCountry")?.value || "all";
    const field   = get("filterField")?.value   || "all";
    const funding = parseInt(get("filterFunding")?.value) || 0;
    const duo     = get("filterDuolingo")?.checked || false;
    const fMap    = { cs:"Computer Science", eng:"Engineering", bus:"Business", med:"Medicine" };
    return UNIS.filter(u => {
        if (country !== "all" && u.ck !== country) return false;
        if (field   !== "all" && u.field !== (fMap[field] || field)) return false;
        if (u.funding < funding) return false;
        if (duo && !u.duo) return false;
        return true;
    });
}

function renderSearch() {
    const f = getFiltered();
    renderCards(D.results, f);
    if (D.resultsMeta) D.resultsMeta.textContent = f.length ? `${f.length} result${f.length!==1?"s":""} · sorted by match score` : "";
}

function renderDashboard() {
    const saved = UNIS.filter(u => savedIds.includes(u.id)).sort((a,b) => calcMatch(b)-calcMatch(a));
    if (!D.savedCont) return;
    if (!saved.length) {
        D.savedCont.innerHTML = `<div class="empty-state"><div class="empty-icon"><i class="fa-regular fa-folder-open"></i></div><p>Nothing saved yet.</p><p class="empty-hint">Go to Search and click <strong>Save</strong>.</p><button class="btn btn-small btn-outline" style="margin-top:14px" onclick="showSection('search')">Browse scholarships</button></div>`;
        return;
    }
    D.savedCont.innerHTML = `<table class="shortlist-table"><thead><tr><th>University</th><th>Funding</th><th>Match</th><th>Status</th></tr></thead><tbody>${saved.map(u => `<tr><td><strong>${u.name}</strong><small>${FLAGS[u.country]||""} ${u.country} · ${u.field}</small></td><td>${u.funding}%</td><td><span class="match-badge" style="padding:4px 10px;font-size:.75rem">${calcMatch(u)}%</span></td><td><span class="status-badge"><i class="fa-regular fa-bookmark"></i> Saved</span></td></tr>`).join("")}</tbody></table>`;
}

function renderAll() {
    renderHome();
    renderSearch();
    renderDashboard();
}

function initEvents() {
    get("updateMatchBtn")?.addEventListener("click", () => {
        quickProfile.grade   = get("profileGrade")?.value  || 75;
        quickProfile.extra   = get("profileExtra")?.value  || "strong";
        quickProfile.english = get("profileEnglish")?.value || "duolingo";
        renderAll();
        toast("Match scores updated.");
    });

    get("applyFiltersBtn")?.addEventListener("click", renderSearch);

    ["filterCountry","filterField","filterFunding"].forEach(id => {
        get(id)?.addEventListener("change", () => {
            if (get("search")?.classList.contains("active")) renderSearch();
        });
    });
    get("filterDuolingo")?.addEventListener("change", () => {
        if (get("search")?.classList.contains("active")) renderSearch();
    });

    get("clearSavedBtn")?.addEventListener("click", async () => {
        if (!currentUser || !savedIds.length) { toast("Nothing to clear."); return; }
        try { await sb.from("saved_universities").delete().eq("user_id", currentUser.id); } catch(e){}
        savedIds = [];
        renderDashboard();
        renderHome();
        toast("Dashboard cleared.");
    });
}

// ═══════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
    cacheDOM();
    initMagicLink();
    initSignOut();
    initSurveyNav();
    initNav();
    initEvents();
    initAuth();
});