"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [hook, setHook] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]);

  function gradeHook() {
    if (!name || !email || !hook.trim()) {
      alert("Please fill in your name, email and hook.");
      return;
    }

    let points = 100;
    const issues: string[] = [];
    const words = hook.trim().split(/\s+/);

    if (words.length < 8) {
      points -= 15;
      issues.push("Hook is too short. Add more context.");
    }

    if (words.length > 35) {
      points -= 15;
      issues.push("Hook is too long. Keep it concise.");
    }

    if (!hook.includes("?")) {
      points -= 15;
      issues.push("Try asking an engaging question.");
    }

    if (!/\d/.test(hook)) {
      points -= 15;
      issues.push("Add a specific number where relevant.");
    }

    if (!/\b(you|your|I|we)\b/i.test(hook)) {
      points -= 15;
      issues.push("Make it more personal.");
    }

    setScore(Math.max(0, points));
    setFeedback(issues);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-3">
          LinkedIn Hook Grader
        </h1>

        <p className="text-center text-slate-300 mb-10">
          Improve your LinkedIn post hooks with AI-powered insights.
        </p>

        <div className="bg-slate-900 p-6 rounded-2xl space-y-5">
          <h2 className="text-xl font-semibold">
            Your Details
          </h2>

          <input
            className="w-full p-3 rounded-lg bg-slate-800"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-slate-800"
            placeholder="Your Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-slate-800"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h2 className="text-xl font-semibold">
            Paste Your LinkedIn Hook
          </h2>

          <textarea
            className="w-full p-4 rounded-lg bg-slate-800 min-h-36"
            placeholder="Paste the first two lines of your LinkedIn post..."
            value={hook}
            onChange={(e) => setHook(e.target.value)}
          />

          <button
            onClick={gradeHook}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold"
          >
            Grade My Hook
          </button>
        </div>

        {score !== null && (
          <div className="bg-slate-900 p-6 rounded-2xl mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Your Hook Score
            </h2>

            <p className="text-5xl font-bold text-green-400 mb-5">
              {score}/100
            </p>

            <h3 className="font-semibold mb-3">
              Improvement Suggestions
            </h3>

            {feedback.length === 0 ? (
              <p>Great! Your hook passed all five checks.</p>
            ) : (
              <ul className="list-disc pl-6 space-y-2">
                {feedback.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </main>
  );
}