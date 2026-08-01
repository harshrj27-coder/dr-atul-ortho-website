/**
 * Deterministic, rule-based symptom triage engine.
 *
 * This is NOT a real AI model — it is a transparent decision tree that
 * ships with zero external dependencies so the "AI Symptom Checker" works
 * out of the box. To upgrade it to a genuine LLM-backed checker later,
 * replace the body of `runSymptomCheck` (or the caller in
 * src/app/api/symptom-check/route.ts) with a call to your model of choice
 * (e.g. the Anthropic API using ANTHROPIC_API_KEY from .env.local),
 * keeping the same SymptomAnswers -> SymptomResult contract so the UI
 * doesn't need to change.
 */

export type PainArea =
  | "Neck"
  | "Shoulder"
  | "Elbow"
  | "Wrist"
  | "Spine / Back"
  | "Hip"
  | "Knee"
  | "Ankle"
  | "Foot";

export type Severity = "Mild" | "Moderate" | "Severe";
export type Duration = "Less than 1 week" | "1–4 weeks" | "1–6 months" | "Over 6 months";

export type SymptomAnswers = {
  painArea: PainArea;
  severity: Severity;
  age: number;
  duration: Duration;
  movementDifficulty: boolean;
  previousInjury: boolean;
  extraSymptoms: string[]; // e.g. "Swelling", "Redness / Warmth", "Numbness", "Instability", "Locking / Clicking"
};

export type SymptomResult = {
  emergency: boolean;
  emergencyReason?: string;
  possibleConditions: string[];
  recommendedDepartment: string;
  suggestedTests: string[];
  guidance: string;
};

const DEPARTMENT_BY_AREA: Record<PainArea, string> = {
  Neck: "Spine Surgery",
  Shoulder: "Joint Replacement / Sports Injury",
  Elbow: "Sports Injury",
  Wrist: "Trauma Care",
  "Spine / Back": "Spine Surgery",
  Hip: "Joint Replacement",
  Knee: "Knee Replacement / Sports Injury",
  Ankle: "Trauma Care",
  Foot: "Trauma Care",
};

export function runSymptomCheck(answers: SymptomAnswers): SymptomResult {
  const { painArea, severity, age, duration, movementDifficulty, previousInjury, extraSymptoms } =
    answers;

  const hasSwelling = extraSymptoms.includes("Swelling");
  const hasRedness = extraSymptoms.includes("Redness / Warmth");
  const hasNumbness = extraSymptoms.includes("Numbness");
  const hasInstability = extraSymptoms.includes("Instability");
  const hasLocking = extraSymptoms.includes("Locking / Clicking");

  // --- Emergency triage ---
  let emergency = false;
  let emergencyReason: string | undefined;

  if (severity === "Severe" && duration === "Less than 1 week" && (hasSwelling || hasRedness)) {
    emergency = true;
    emergencyReason =
      "Sudden severe pain with swelling or warmth can indicate an acute injury, fracture or infection. Please seek in-person or emergency care promptly.";
  } else if (severity === "Severe" && movementDifficulty && duration === "Less than 1 week") {
    emergency = true;
    emergencyReason =
      "Sudden severe pain with inability to move the joint may indicate a fracture or dislocation. Please seek urgent care.";
  } else if (hasNumbness && (painArea === "Neck" || painArea === "Spine / Back")) {
    emergency = true;
    emergencyReason =
      "Numbness associated with neck or back pain can indicate nerve involvement. Please seek prompt medical evaluation.";
  }

  // --- Possible conditions (broad, non-diagnostic guidance) ---
  const possibleConditions: string[] = [];

  if (["Knee", "Shoulder"].includes(painArea) && hasLocking) {
    possibleConditions.push("Meniscus / cartilage tear", "Loose body in the joint");
  }
  if (painArea === "Knee" && hasInstability) {
    possibleConditions.push("ACL / PCL ligament injury");
  }
  if (hasSwelling && hasRedness) {
    possibleConditions.push("Inflammatory joint condition", "Possible infection — needs evaluation");
  } else if (hasSwelling) {
    possibleConditions.push("Soft tissue inflammation", "Effusion (fluid in the joint)");
  }
  if (duration === "Over 6 months" && !hasSwelling) {
    possibleConditions.push("Osteoarthritis / degenerative joint changes");
  }
  if (previousInjury) {
    possibleConditions.push("Old injury-related instability or early arthritis");
  }
  if (age >= 55 && ["Knee", "Hip"].includes(painArea)) {
    possibleConditions.push("Age-related joint degeneration");
  }
  if (possibleConditions.length === 0) {
    possibleConditions.push("Soft tissue strain or mechanical joint pain");
  }

  // --- Suggested tests ---
  const suggestedTests = ["Clinical examination by an orthopedic surgeon"];
  if (duration !== "Less than 1 week" || hasLocking || hasInstability) {
    suggestedTests.push("X-ray of the affected joint");
  }
  if (hasLocking || hasInstability || severity === "Severe") {
    suggestedTests.push("MRI for soft tissue / ligament assessment");
  }
  if (hasSwelling && hasRedness) {
    suggestedTests.push("Blood tests (infection / inflammatory markers)");
  }

  // --- Guidance ---
  let guidance =
    "This is general guidance only, not a diagnosis. Based on your answers, we recommend booking a consultation for a hands-on clinical assessment.";
  if (severity === "Mild" && duration === "Less than 1 week" && !hasSwelling) {
    guidance =
      "Mild, recent pain without swelling often settles with rest, ice and activity modification. If it persists beyond 1–2 weeks, please book a consultation.";
  } else if (severity === "Severe" || hasInstability || hasLocking) {
    guidance =
      "Your symptoms suggest a clinical evaluation is advisable soon — possibly including imaging — to rule out a structural injury.";
  }

  return {
    emergency,
    emergencyReason,
    possibleConditions: Array.from(new Set(possibleConditions)),
    recommendedDepartment: DEPARTMENT_BY_AREA[painArea],
    suggestedTests: Array.from(new Set(suggestedTests)),
    guidance,
  };
}
