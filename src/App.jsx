import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState("loading");
  const [username, setUsername] = useState("");

  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [resetFunc, setResetFunc] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("quizUser");
    const savedProgress = JSON.parse(localStorage.getItem("quiz_progress"));

    if (savedUser && savedProgress && savedProgress.isActive) {
      setUsername(savedUser);
      setGameState("quiz");
    } else {
      setGameState("login");
    }
  }, []);

  const handleLogin = (name) => {
    localStorage.setItem("quizUser", name);
    setUsername(name);
    setGameState("quiz");
  };

  const handleFinish = (score, total, resetFn) => {
    setFinalScore(score);
    setTotalQuestions(total);
    setResetFunc(() => resetFn);
    setGameState("result");
  };

  const handleRestart = () => {
    if (resetFunc) resetFunc();
  };

  if (gameState === "loading") return <div>Memuat data kuis...</div>;

  return (
    <div className="App">
      {gameState !== "login" && (
        <div style={{ marginBottom: "20px" }}>
          Halo, <strong>{username}</strong>!
        </div>
      )}

      {gameState === "login" && <LoginPage onLogin={handleLogin} />}

      {gameState === "quiz" && <QuizPage onFinished={handleFinish} />}

      {gameState === "result" && (
        <ResultPage
          score={finalScore}
          totalQuestions={totalQuestions}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
