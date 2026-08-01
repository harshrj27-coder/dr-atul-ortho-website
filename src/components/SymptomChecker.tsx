"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, AlertTriangle, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import type {
  PainArea,
  Severity,
  Duration,
  SymptomAnswers,
  SymptomResult,
} from "@/lib/symptomRules";

const PAIN_AREAS: PainArea[] = [
  "Neck",
  "Shoulder",
  "Elbow",
  "Wrist",
  "Spine / Back",
  "Hip",
  "Knee",
  "Ankle",
  "Foot",
];
const SEVERITIES: Severity[] = ["Mild", "Moderate", "Severe"];
const DURATIONS: Duration[] = ["Less than 1 week", "1–4 weeks", "1–6 months", "Over 6 months"];
const EXTRA_SYMPTOMS = [
  "Swelling",
  "Redness / Warmth",
  "Numbness",
  "Instability",
  "Locking / Clicking",
];

const STEPS = ["area", "severity", "age", "duration", "movement", "history", "extra", "result"] as const;
type Step = (typeof STEPS)[number];

export default function SymptomChecker() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<SymptomAnswers>>({ extraSymptoms: [] });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const step: Step = STEPS[stepIndex];

  function next() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }
  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/symptom-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      // Small delay so the "AI thinking" animation feels real.
      await new Promise((r) => setTimeout(r, 700));
      setResult(data.result as SymptomResult);
      next();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  return (
    <div className="glass-card mx-auto max-w-2xl rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[var(--lux-blue)] to-[var(--emerald)] text-white">
          <Bot size={20} />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-[#0b0f1a]">AI Symptom Checker</p>
          <p className="text-xs text-[#0b0f1a]/50">
            Rule-based triage assistant — not a diagnosis. See a doctor for confirmation.
          </p>
        </div>
      </div>

      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-[#0b0f1a]/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--lux-blue)] via-[var(--emerald)] to-[var(--gold)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === "area" && (
            <QuestionBlock title="Where is the pain located?">
              <div className="grid grid-cols-3 gap-2">
                {PAIN_AREAS.map((area) => (
                  <ChipButton
                    key={area}
                    label={area}
                    active={answers.painArea === area}
                    onClick={() => {
                      setAnswers((a) => ({ ...a, painArea: area }));
                      next();
                    }}
                  />
                ))}
              </div>
            </QuestionBlock>
          )}

          {step === "severity" && (
            <QuestionBlock title="How severe is the pain?" onBack={back}>
              <div className="flex flex-col gap-2">
                {SEVERITIES.map((s) => (
                  <ChipButton
                    key={s}
                    label={s}
                    active={answers.severity === s}
                    onClick={() => {
                      setAnswers((a) => ({ ...a, severity: s }));
                      next();
                    }}
                  />
                ))}
              </div>
            </QuestionBlock>
          )}

          {step === "age" && (
            <QuestionBlock title="What is your age?" onBack={back}>
              <input
                type="number"
                min={1}
                max={120}
                value={answers.age ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, age: Number(e.target.value) }))}
                className="w-full rounded-xl border border-[#0b0f1a]/10 bg-white/70 px-4 py-3 text-sm outline-none focus:border-[var(--lux-blue)]"
                placeholder="e.g. 45"
              />
              <button
                disabled={!answers.age}
                onClick={next}
                className="mt-4 w-full rounded-full bg-[var(--lux-blue)] py-3 text-sm font-semibold text-white disabled:opacity-40"
              >
                Continue
              </button>
            </QuestionBlock>
          )}

          {step === "duration" && (
            <QuestionBlock title="How long have you had this pain?" onBack={back}>
              <div className="flex flex-col gap-2">
                {DURATIONS.map((d) => (
                  <ChipButton
                    key={d}
                    label={d}
                    active={answers.duration === d}
                    onClick={() => {
                      setAnswers((a) => ({ ...a, duration: d }));
                      next();
                    }}
                  />
                ))}
              </div>
            </QuestionBlock>
          )}

          {step === "movement" && (
            <QuestionBlock title="Do you have difficulty moving the joint?" onBack={back}>
              <div className="grid grid-cols-2 gap-2">
                {["Yes", "No"].map((v) => (
                  <ChipButton
                    key={v}
                    label={v}
                    active={answers.movementDifficulty === (v === "Yes")}
                    onClick={() => {
                      setAnswers((a) => ({ ...a, movementDifficulty: v === "Yes" }));
                      next();
                    }}
                  />
                ))}
              </div>
            </QuestionBlock>
          )}

          {step === "history" && (
            <QuestionBlock title="Any previous injury to this area?" onBack={back}>
              <div className="grid grid-cols-2 gap-2">
                {["Yes", "No"].map((v) => (
                  <ChipButton
                    key={v}
                    label={v}
                    active={answers.previousInjury === (v === "Yes")}
                    onClick={() => {
                      setAnswers((a) => ({ ...a, previousInjury: v === "Yes" }));
                      next();
                    }}
                  />
                ))}
              </div>
            </QuestionBlock>
          )}

          {step === "extra" && (
            <QuestionBlock title="Any of these additional symptoms?" onBack={back}>
              <div className="flex flex-wrap gap-2">
                {EXTRA_SYMPTOMS.map((sym) => {
                  const activeList = answers.extraSymptoms ?? [];
                  const isActive = activeList.includes(sym);
                  return (
                    <ChipButton
                      key={sym}
                      label={sym}
                      active={isActive}
                      onClick={() =>
                        setAnswers((a) => {
                          const list = a.extraSymptoms ?? [];
                          return {
                            ...a,
                            extraSymptoms: isActive
                              ? list.filter((s) => s !== sym)
                              : [...list, sym],
                          };
                        })
                      }
                    />
                  );
                })}
              </div>
              {error && <p className="mt-3 text-xs text-red-500">{error}</p>}
              <button
                onClick={submit}
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--lux-blue)] to-[var(--emerald)] py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Analysing your symptoms…
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Get My Assessment
                  </>
                )}
              </button>
            </QuestionBlock>
          )}

          {step === "result" && result && (
            <div>
              {result.emergency && (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-300/50 bg-red-50 p-4">
                  <AlertTriangle className="mt-0.5 shrink-0 text-red-600" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-red-700">
                      This may need urgent attention
                    </p>
                    <p className="mt-1 text-xs text-red-600/80">{result.emergencyReason}</p>
                  </div>
                </div>
              )}

              <ResultBlock title="Possible Conditions" items={result.possibleConditions} color="text-[var(--lux-blue)]" />
              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b0f1a]/50">
                  Recommended Department
                </p>
                <p className="mt-1 font-display text-lg text-[#0b0f1a]">
                  {result.recommendedDepartment}
                </p>
              </div>
              <ResultBlock title="Suggested Tests" items={result.suggestedTests} color="text-[var(--emerald)]" />
              <div className="mt-4 rounded-2xl bg-[#0b0f1a]/5 p-4 text-sm text-[#0b0f1a]/70">
                {result.guidance}
              </div>

              <Link
                href="/appointment"
                className="mt-6 block w-full rounded-full bg-gradient-to-r from-[var(--lux-blue)] to-[var(--gold)] py-3 text-center text-sm font-semibold text-white"
              >
                Book Appointment
              </Link>
              <button
                onClick={() => {
                  setResult(null);
                  setAnswers({ extraSymptoms: [] });
                  setStepIndex(0);
                }}
                className="mt-3 w-full text-center text-xs font-medium text-[#0b0f1a]/50 underline"
              >
                Start over
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function QuestionBlock({
  title,
  children,
  onBack,
}: {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <div>
      <p className="mb-4 font-display text-xl text-[#0b0f1a]">{title}</p>
      {children}
      {onBack && (
        <button onClick={onBack} className="mt-4 text-xs font-medium text-[#0b0f1a]/40 underline">
          ← Back
        </button>
      )}
    </div>
  );
}

function ChipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
        active
          ? "border-[var(--lux-blue)] bg-[var(--lux-blue)]/10 text-[var(--lux-blue)]"
          : "border-[#0b0f1a]/10 bg-white/60 text-[#0b0f1a]/75 hover:border-[var(--lux-blue)]/40"
      }`}
    >
      {label}
    </button>
  );
}

function ResultBlock({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <div className="mt-4">
      <p className={`text-[11px] font-semibold uppercase tracking-wide ${color}`}>{title}</p>
      <ul className="mt-2 space-y-1 text-sm text-[#0b0f1a]/75">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
