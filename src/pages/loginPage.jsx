import { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    }
  };

  return (
    <div className="card">
      <h1>React Quiz App</h1>
      <p>Masukkan nama untuk memulai</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Kamu..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Mulai</button>
      </form>
    </div>
  );
};

export default LoginPage;
