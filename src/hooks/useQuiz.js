import { useState, useEffect } from "react";
import { fetchQuestions } from "../api/quizApi";
import { useLocalStorage } from "./useLocalStorage";
import { TIMER_DURATION } from "../utils/constants";

export const useQuiz = () => {
  const [gameState, setGameState] = useLocalStorage("quiz_progress", {
    questions: [],
    currentIndex: 0,
    score: 0,
    endTime: null,
    isActive: false,
    isFinished: false,
  });

  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      gameState.questions.length === 0 &&
      !gameState.isActive &&
      !gameState.isFinished
    ) {
      const initQuiz = async () => {
        setLoading(true);
        const data = await fetchQuestions();
        const targetTime = Date.now() + TIMER_DURATION * 1000;

        setGameState((prev) => ({
          ...prev,
          questions: data,
          isActive: true,
          endTime: targetTime,
        }));
        setLoading(false);
      };
      initQuiz();
    }
  }, []);

  useEffect(() => {
    if (!gameState.isActive || gameState.isFinished || !gameState.endTime)
      return;

    const timerInterval = setInterval(() => {
      const now = Date.now();
      const secondsLeft = Math.round((gameState.endTime - now) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        setTimeLeft(0);
        setGameState((prev) => ({
          ...prev,
          isFinished: true,
          isActive: false,
        }));
      } else {
        setTimeLeft(secondsLeft);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [
    gameState.isActive,
    gameState.isFinished,
    gameState.endTime,
    setGameState,
  ]);

  const handleAnswer = (answer) => {
    const currentQuestion = gameState.questions[gameState.currentIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setGameState((prev) => {
      const nextIndex = prev.currentIndex + 1;
      const isEnd = nextIndex >= prev.questions.length;

      return {
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        currentIndex: isEnd ? prev.currentIndex : nextIndex,
        isFinished: isEnd,
        isActive: !isEnd,
      };
    });
  };

  const resetQuiz = () => {
    setGameState({
      questions: [],
      currentIndex: 0,
      score: 0,
      endTime: null,
      isActive: false,
      isFinished: false,
    });
    localStorage.removeItem("quizUser");
    window.location.reload();
  };

  return {
    questions: gameState.questions,
    currentIndex: gameState.currentIndex,
    score: gameState.score,
    timeLeft: timeLeft,
    isFinished: gameState.isFinished,
    loading,
    handleAnswer,
    resetQuiz,
  };
};
