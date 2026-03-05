import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Question() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state?.studentName || !state?.gameCode) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-slate-800 border border-slate-600 rounded-2xl shadow-xl p-8 text-center">
          <h1 className="game-font text-3xl text-yellow-300 mb-4">Oops!</h1>
          <p className="text-slate-300 mb-6">You need to join a game first.</p>
          <button
            onClick={() => navigate("/student/join")}
            className="game-font bg-cyan-500 hover:bg-cyan-400 text-slate-900 py-3 px-6 rounded-xl transition"
          >
            Go to Join Page
          </button>
        </div>
      </div>
    );
  }

  const TOTAL_QUESTIONS = 3;

  const difficulty = state?.difficulty ?? "medium";
  const pointsPerQuestion = state?.pointsPerQuestion ?? 10;

  const questionIndex = state?.questionIndex ?? 0;
  const totalPoints = state?.totalPoints ?? 0;

  const answersStatus = Array.isArray(state?.answersStatus)
    ? state.answersStatus
    : [];

  const questionsByDifficulty = useMemo(
    () => ({
      easy: [
        { q: "2 + 3 = ?", choices: ["4", "5", "6", "7"], answer: "5" },
        { q: "5 + 1 = ?", choices: ["4", "5", "6", "7"], answer: "6" },
        { q: "10 - 6 = ?", choices: ["3", "4", "5", "6"], answer: "4" },
      ],
      medium: [
        { q: "12 - 5 = ?", choices: ["5", "6", "7", "8"], answer: "7" },
        { q: "9 × 2 = ?", choices: ["16", "18", "20", "22"], answer: "18" },
        { q: "14 ÷ 2 = ?", choices: ["6", "7", "8", "9"], answer: "7" },
      ],
      hard: [
        { q: "25 ÷ 5 = ?", choices: ["3", "4", "5", "6"], answer: "5" },
        { q: "15 + 7 = ?", choices: ["20", "21", "22", "23"], answer: "22" },
        { q: "12 × 3 = ?", choices: ["30", "33", "36", "39"], answer: "36" },
      ],
    }),
    []
  );

  const list = questionsByDifficulty[difficulty] ?? questionsByDifficulty.medium;
  const current = list[Math.min(questionIndex, TOTAL_QUESTIONS - 1)];

  const [locked, setLocked] = useState(false);

  // leaderboard مؤقت (تظهر داخل FinalResults فقط)
  const mockTop = [
    { name: "Student1", score: 260 },
    { name: "Student3", score: 240 },
    { name: "Student56", score: 200 },
    { name: "Student20", score: 180 },
    { name: "Student12", score: 160 },
  ];

  const handlePick = (choice) => {
    if (locked) return;
    setLocked(true);

    const isCorrect = choice === current.answer;
    const earned = isCorrect ? pointsPerQuestion : 0;
    const newTotal = totalPoints + earned;

    const updatedAnswersStatus = [...answersStatus];
    updatedAnswersStatus[questionIndex] = isCorrect;

    // بعد الإجابة: يروح Result (وليس Final) دائمًا الآن
    navigate("/student/result", {
      state: {
        ...state,
        lastPoints: earned,
        totalPoints: newTotal,
        answersStatus: updatedAnswersStatus,
        totalQuestions: TOTAL_QUESTIONS,
        leaderboard: mockTop,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-slate-800 border border-slate-600 rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="game-font text-3xl text-cyan-300">Question</h1>
            <p className="text-slate-300 mt-1">
              Q {questionIndex + 1} / {TOTAL_QUESTIONS} • Difficulty:{" "}
              <span className="text-white">{difficulty}</span> • Play for{" "}
              <span className="text-yellow-300 font-semibold">
                +{pointsPerQuestion}
              </span>
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-600 rounded-2xl px-5 py-3 text-center">
            <p className="text-slate-300 text-sm">Score</p>
            <p className="game-font text-3xl text-yellow-300">{totalPoints}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-6">
          <p className="game-font text-2xl">{current.q}</p>
          <p className="text-slate-400 mt-2 text-sm">Tap an answer to continue.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {current.choices.map((c) => (
            <button
              key={c}
              onClick={() => handlePick(c)}
              disabled={locked}
              className="text-left bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 transition hover:bg-slate-800 disabled:opacity-60 disabled:hover:bg-slate-900"
            >
              <span className="text-white">{c}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/student/lobby", { state })}
          className="w-full mt-8 bg-transparent border border-slate-600 hover:bg-slate-700 py-3 rounded-xl transition"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

export default Question;