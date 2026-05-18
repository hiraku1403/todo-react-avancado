// ─────────────────────────────────────────────────────────────
// components/Progresso.jsx
// Barra de progresso — useMemo via context, React.memo
// ─────────────────────────────────────────────────────────────
import { memo, useMemo } from "react";
import { useTodo } from "../context/TodoContext";

const Progresso = memo(function Progresso() {
  const { contadores } = useTodo();

  // useMemo: evita recalcular porcentagem a cada render
  const pct = useMemo(() => {
    if (contadores.total === 0) return 0;
    return Math.round((contadores.concluidas / contadores.total) * 100);
  }, [contadores]);

  if (contadores.total === 0) return null;

  return (
    <div className="progresso" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="progresso__header">
        <span className="progresso__label">Progresso</span>
        <span className="progresso__pct">{pct}%</span>
      </div>
      <div className="progresso__trilha">
        <div className="progresso__barra" style={{ width: `${pct}%` }} />
      </div>
      <div className="progresso__detalhe">
        <span>{contadores.concluidas} concluída{contadores.concluidas !== 1 ? "s" : ""}</span>
        <span>{contadores.pendentes} pendente{contadores.pendentes !== 1 ? "s" : ""}</span>
      </div>
    </div>
  );
});

export default Progresso;
