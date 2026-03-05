import { useLocation, useNavigate } from "react-router-dom";

function Difficulty() {
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
  const questionIndex = state?.questionIndex ?? 0;
  const totalPoints = state?.totalPoints ?? 0;

  // لو خلص، لا يرجع للصعوبة
  if (questionIndex >= TOTAL_QUESTIONS) {
    navigate("/student/final-results", { state });
    return null;
  }

  const goToQuestion = (difficulty, points) => {
    navigate("/student/question", {
      state: {
        ...state,
        difficulty,
        pointsPerQuestion: points,
        questionIndex,  // ✅ حافظنا عليه
        totalPoints,    // ✅ حافظنا عليه
      },
    });
  };

  const cards = [
    { label: "Easy", diff: "easy", points: 10, badge: "bg-emerald-400" },
    { label: "Medium", diff: "medium", points: 25, badge: "bg-yellow-300" },
    { label: "Hard", diff: "hard", points: 50, badge: "bg-red-400" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-4xl bg-slate-800 border border-slate-600 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="game-font text-3xl text-cyan-300">
              Pick Question Difficulty
            </h1>
            <p className="text-slate-300 mt-2">
              Question <span className="text-white font-semibold">{questionIndex + 1}</span> /{" "}
              <span className="text-white font-semibold">{TOTAL_QUESTIONS}</span> • Total Score{" "}
              <span className="text-yellow-300 font-semibold">{totalPoints}</span>
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-600 rounded-2xl px-5 py-4 text-center">
            <p className="text-slate-300 text-sm">Game Code</p>
            <p className="game-font text-3xl text-yellow-300 mt-1">
              {state.gameCode}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((c) => (
            <div
              key={c.diff}
              className="relative bg-slate-900 border border-slate-700 rounded-2xl p-6"
            >
              <div
                className={`absolute -top-3 -left-3 ${c.badge} text-slate-900 font-bold rounded-full px-3 py-1 shadow`}
              >
                +{c.points}
              </div>

              <h2 className="game-font text-3xl text-white">{c.label}</h2>
              <p className="text-slate-300 mt-2">
                Earn <span className="text-white font-semibold">+{c.points}</span> if correct.
              </p>

              <button
                onClick={() => goToQuestion(c.diff, c.points)}
                className="w-full mt-6 game-font bg-yellow-300 hover:bg-yellow-200 text-slate-900 py-3 rounded-xl transition"
              >
                Select
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/student/lobby", { state })}
          className="w-full mt-6 bg-transparent border border-slate-600 hover:bg-slate-700 py-3 rounded-xl transition"
        >
          Back to Lobby
        </button>
      </div>
    </div>
  );
}

export default Difficulty;