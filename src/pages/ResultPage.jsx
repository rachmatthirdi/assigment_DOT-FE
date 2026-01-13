const ResultPage = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="card">
      <h2>Kuis Selesai!</h2>
      <div className="score-board">
        Nilai Kamu: {score} / {totalQuestions}
      </div>
      <p>{score > totalQuestions / 2 ? "Kerja Bagus!" : "Coba Lagi Ya!"}</p>
      <button onClick={onRestart}>Main Lagi</button>
    </div>
  );
};

export default ResultPage;
