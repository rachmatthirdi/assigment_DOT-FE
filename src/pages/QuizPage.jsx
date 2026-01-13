import { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
const QuizPage = ({ onFinished }) => {
  const {
    questions,
    currentIndex,
    score,
    timeLeft,
    isFinished,
    loading,
    handleAnswer,
    resetQuiz,
  } = useQuiz();

  useEffect(() => {
    if (isFinished) {
      onFinished(score, questions.length, resetQuiz);
    }
  }, [isFinished, score, questions.length, onFinished, resetQuiz]);

  if (loading || questions.length === 0) {
    return <div className="card">Loading Soal...</div>;
  }

  return (
    <div>
      <Timer timeLeft={timeLeft} />

      <QuestionCard
        question={questions[currentIndex].question}
        answers={questions[currentIndex].answers}
        questionIndex={currentIndex}
        totalQuestions={questions.length}
        onAnswerClick={handleAnswer}
      />
    </div>
  );
};

export default QuizPage;
