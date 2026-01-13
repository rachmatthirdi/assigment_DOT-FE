const QuestionCard = ({
  question,
  answers,
  totalQuestions,
  questionIndex,
  onAnswerClick,
}) => {
  return (
    <div className="card">
      <div style={{ marginBottom: "10px", fontSize: "0.9em", color: "#aaa" }}>
        Soal {questionIndex + 1} / {totalQuestions}
      </div>

      <h3 dangerouslySetInnerHTML={{ __html: question }} />

      <div className="answers-list">
        {answers.map((answer, index) => (
          <button
            key={index}
            className="answer-btn"
            onClick={() => onAnswerClick(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
