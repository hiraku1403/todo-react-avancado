// ─────────────────────────────────────────────────────────────
// components/FormNovaTarefa.jsx
// Formulário controlado usando hook customizado + Context API
// ─────────────────────────────────────────────────────────────
import { memo } from "react";
import { useTodo } from "../context/TodoContext";
import { useInputControlado } from "../hooks/useInputControlado";

// React.memo: evita re-render se as props não mudarem
const FormNovaTarefa = memo(function FormNovaTarefa() {
  const { adicionarTarefa } = useTodo();
  const { valor, erro, handleChange, reset, validar } = useInputControlado("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    adicionarTarefa(valor);
    reset();
  };

  const chars = valor.length;
  const pct   = Math.min((chars / 160) * 100, 100);

  return (
    <form className="form-nova" onSubmit={handleSubmit} noValidate>
      <div className={`form-nova__campo${erro ? " --erro" : ""}`}>
        <input
          type="text"
          value={valor}
          onChange={handleChange}
          placeholder="Nova tarefa…"
          aria-label="Texto da nova tarefa"
          maxLength={160}
          autoFocus
        />
        <button type="submit" aria-label="Adicionar tarefa">
          <span>+</span>
        </button>
      </div>

      <div className="form-nova__meta">
        {erro ? (
          <span className="form-nova__erro" role="alert">{erro}</span>
        ) : (
          <span className="form-nova__hint">⏎ Enter para adicionar</span>
        )}
        <div className="form-nova__chars">
          <div
            className="form-nova__chars-bar"
            style={{ width: `${pct}%`, background: pct > 85 ? "var(--cor-perigo)" : "var(--cor-acento)" }}
          />
          <span>{chars}/160</span>
        </div>
      </div>
    </form>
  );
});

export default FormNovaTarefa;
