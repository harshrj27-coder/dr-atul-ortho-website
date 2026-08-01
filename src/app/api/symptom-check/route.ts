import { NextRequest, NextResponse } from "next/server";
import { runSymptomCheck, type SymptomAnswers } from "@/lib/symptomRules";

// Rule-based by default. To upgrade to a real LLM: check for
// process.env.ANTHROPIC_API_KEY here and, if present, call out to the
// Anthropic API with the same `answers` payload instead of calling
// runSymptomCheck() — then map the model's response into the
// SymptomResult shape so the frontend needs no changes.
export async function POST(req: NextRequest) {
  try {
    const answers = (await req.json()) as SymptomAnswers;

    if (!answers?.painArea || !answers?.severity || !answers?.duration) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const result = runSymptomCheck(answers);
    return NextResponse.json({ ok: true, result, engine: "rule-based" });
  } catch (err) {
    console.error("symptom-check error:", err);
    return NextResponse.json(
      { error: "Could not process symptom check." },
      { status: 500 }
    );
  }
}
