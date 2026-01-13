const Timer = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const timerStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: timeLeft < 10 ? "#ff4d4d" : "white",
    padding: "10px",
    border: "2px solid",
    borderColor: timeLeft < 10 ? "#ff4d4d" : "#646cff",
    borderRadius: "10px",
    marginBottom: "20px",
    display: "inline-block",
  };

  return <div style={timerStyle}>Waktu Tersisa: {formatTime(timeLeft)}</div>;
};

export default Timer;
