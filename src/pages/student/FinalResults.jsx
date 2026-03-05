import { useLocation, useNavigate } from "react-router-dom";

function FinalResults() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state?.studentName || !state?.gameCode) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
        <button
          onClick={() => navigate("/student/join")}
          className="game-font bg-cyan-500 hover:bg-cyan-400 text-slate-900 py-3 px-6 rounded-xl transition"
        >
          Go to Join Page
        </button>
      </div>
    );
  }

  const totalPoints = state?.totalPoints ?? 0;
  const totalQuestions = state?.totalQuestions ?? 5;

  const answersStatus = Array.isArray(state?.answersStatus)
    ? state.answersStatus
    : [];

  const leaderboard =
    state?.leaderboard ?? [
      { name: "Student1", score: 260 },
      { name: "Student3", score: 240 },
      { name: "Student21", score: 225 },
      { name: "Student56", score: 200 },
      { name: "Student20", score: 180 },
      { name: "Student12", score: 160 },
    ];

  const correctCount = answersStatus.filter(Boolean).length;

  // حساب رتبة الطالب (مؤقت)
  const studentEntry = { name: state.studentName, score: totalPoints };
  const combined = [...leaderboard, studentEntry].sort((a, b) => b.score - a.score);
  const rank = combined.findIndex((x) => x.name === state.studentName) + 1;

  const rightList = combined.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* LEFT: question status 1..N */}
      <div className="w-28 md:w-36 p-4 flex flex-col gap-4 items-center justify-center border-r border-slate-700 bg-slate-900">
        {Array.from({ length: totalQuestions }).map((_, i) => {
          const ok = answersStatus[i] === true;
          const wrong = answersStatus[i] === false;

          return (
            <div
              key={i}
              className={[
                "w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl shadow",
                ok ? "bg-emerald-400" : wrong ? "bg-red-500" : "bg-slate-600",
              ].join(" ")}
            >
              <span className="game-font text-4xl text-white">{i + 1}</span>
            </div>
          );
        })}
      </div>

      {/* CENTER */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-900">
        <div className="w-full max-w-2xl bg-slate-800 border border-slate-600 rounded-2xl shadow-xl p-8 text-center">
          <h1 className="game-font text-4xl md:text-5xl text-cyan-300 mb-8">
            Quiz Answer Results
          </h1>

          <div className="mx-auto bg-emerald-400 rounded-[40px] shadow-2xl px-8 py-10 text-slate-900 max-w-xl">
            <h2 className="game-font text-5xl text-white mb-6">
              {state.studentName}
            </h2>

            <p className="game-font text-3xl text-white">
              Total Score: {totalPoints}
            </p>

            <p className="mt-6 text-white font-semibold">
              Questions answered: {correctCount}/{totalQuestions}
            </p>

            <p className="mt-3 text-white font-semibold">Rank: #{rank}</p>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate("/student/lobby", { state })}
              className="w-full bg-transparent border border-slate-600 hover:bg-slate-700 py-3 rounded-xl transition"
            >
              Back to Lobby
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: leaderboard (داخل نفس الصفحة) */}
      <aside className="w-72 md:w-80 bg-slate-900 border-l border-slate-700 p-6 overflow-y-auto">
        <h2 className="game-font text-2xl mb-4 text-pink-300">
          Current Leaderboard
        </h2>

        <div className="space-y-3">
          {rightList.map((p, idx) => (
            <div
              key={p.name + idx}
              className="bg-emerald-700/80 hover:bg-emerald-700 border border-emerald-300/20 rounded-2xl px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "🎖️"}
                </span>
                <span className="game-font text-lg text-white">{p.name}</span>
              </div>
              <span className="text-yellow-300 font-semibold">{p.score}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default FinalResults;