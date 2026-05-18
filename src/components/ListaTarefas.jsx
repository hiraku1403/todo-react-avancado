// ─────────────────────────────────────────────────────────────
// components/ListaTarefas.jsx
// Lista de tarefas filtradas — useMemo via context
// ─────────────────────────────────────────────────────────────
import { memo } from "react";
import { useTodo } from "../context/TodoContext";
import ItemTarefa from "./ItemTarefa";

const ListaTarefas = memo(function ListaTarefas() {
  const { tarefasFiltradas, filtro } = useTodo();

  if (tarefasFiltradas.length === 0) {
    const msgs = {
      todas:      { emoji: "◌", texto: "Nenhuma tarefa ainda.", sub: "Adicione sua primeira tarefa acima." },
      pendentes:  { emoji: "✓", texto: "Tudo concluído!",       sub: "Você não tem tarefas pendentes." },
      concluidas: { emoji: "◌", texto: "Nada concluído ainda.", sub: "Conclua tarefas para vê-las aqui." },
    };
    const { emoji, texto, sub } = msgs[filtro] || msgs.todas;

    return (
      <div className="lista-vazia" role="status">
        <span className="lista-vazia__emoji" aria-hidden="true">{emoji}</span>
        <p className="lista-vazia__texto">{texto}</p>
        <p className="lista-vazia__sub">{sub}</p>
      </div>
    );
  }

  return (
    <ul className="lista-tarefas" aria-label="Lista de tarefas" aria-live="polite">
      {/* .map() para renderizar dinamicamente */}
      {tarefasFiltradas.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
    </ul>
  );
});

export default ListaTarefas;
