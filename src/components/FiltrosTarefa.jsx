// ─────────────────────────────────────────────────────────────
// components/FiltrosTarefa.jsx
// Filtros de tarefas — React.memo + useContext
// ─────────────────────────────────────────────────────────────
import { memo } from "react";
import { useTodo } from "../context/TodoContext";

const OPCOES = [
  { valor: "todas",      label: "Todas"      },
  { valor: "pendentes",  label: "Pendentes"  },
  { valor: "concluidas", label: "Concluídas" },
];

// React.memo: só re-renderiza se filtro ou contadores mudarem
const FiltrosTarefa = memo(function FiltrosTarefa() {
  const { filtro, setFiltro, contadores, limparConcluidas } = useTodo();

  return (
    <div className="filtros">
      <div className="filtros__tabs" role="group" aria-label="Filtrar tarefas">
        {OPCOES.map(({ valor, label }) => (
          <button
            key={valor}
            className={`filtros__tab${filtro === valor ? " --ativo" : ""}`}
            onClick={() => setFiltro(valor)}
            aria-pressed={filtro === valor}
          >
            {label}
            <span className="filtros__tab-count">
              {valor === "todas"      && contadores.total}
              {valor === "pendentes"  && contadores.pendentes}
              {valor === "concluidas" && contadores.concluidas}
            </span>
          </button>
        ))}
      </div>

      {contadores.concluidas > 0 && (
        <button
          className="filtros__limpar"
          onClick={limparConcluidas}
          title="Remover tarefas concluídas"
        >
          Limpar concluídas
        </button>
      )}
    </div>
  );
});

export default FiltrosTarefa;
