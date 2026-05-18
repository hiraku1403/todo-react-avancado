// ─────────────────────────────────────────────────────────────
// components/ItemTarefa.jsx
// Item individual de tarefa com edição inline — React.memo
// ─────────────────────────────────────────────────────────────
import { memo, useState, useRef, useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import { useInputControlado } from "../hooks/useInputControlado";

// React.memo com comparação customizada: só re-renderiza se a tarefa mudar
const ItemTarefa = memo(function ItemTarefa({ tarefa }) {
  const { alternarTarefa, removerTarefa, editarTarefa } = useTodo();
  const [editando, setEditando] = useState(false);
  const { valor, handleChange, reset, validar, setValor } = useInputControlado(tarefa.texto);
  const inputRef = useRef(null);

  // Foca o input ao entrar em modo edição
  useEffect(() => {
    if (editando) inputRef.current?.focus();
  }, [editando]);

  const iniciarEdicao = () => {
    setValor(tarefa.texto);
    setEditando(true);
  };

  const confirmarEdicao = () => {
    if (!validar()) return;
    editarTarefa(tarefa.id, valor);
    setEditando(false);
  };

  const cancelarEdicao = () => {
    reset();
    setEditando(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter")  confirmarEdicao();
    if (e.key === "Escape") cancelarEdicao();
  };

  // Data formatada
  const data = new Date(tarefa.criadaEm).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short"
  });

  return (
    <li className={`item-tarefa${tarefa.concluida ? " --concluida" : ""}${editando ? " --editando" : ""}`}>

      {/* Checkbox personalizado */}
      <button
        className="item-tarefa__check"
        onClick={() => alternarTarefa(tarefa.id)}
        aria-label={tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"}
        aria-checked={tarefa.concluida}
        role="checkbox"
      >
        {tarefa.concluida && <span aria-hidden="true">✓</span>}
      </button>

      {/* Texto ou input de edição */}
      <div className="item-tarefa__corpo">
        {editando ? (
          <input
            ref={inputRef}
            className="item-tarefa__edit-input"
            value={valor}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={160}
            aria-label="Editar tarefa"
          />
        ) : (
          <span
            className="item-tarefa__texto"
            onDoubleClick={!tarefa.concluida ? iniciarEdicao : undefined}
            title={!tarefa.concluida ? "Duplo clique para editar" : ""}
          >
            {tarefa.texto}
          </span>
        )}
        <span className="item-tarefa__data">{data}</span>
      </div>

      {/* Ações */}
      <div className="item-tarefa__acoes">
        {editando ? (
          <>
            <button className="item-tarefa__btn --ok"  onClick={confirmarEdicao} aria-label="Confirmar edição">✓</button>
            <button className="item-tarefa__btn --cancel" onClick={cancelarEdicao} aria-label="Cancelar edição">✕</button>
          </>
        ) : (
          <>
            {!tarefa.concluida && (
              <button className="item-tarefa__btn --editar" onClick={iniciarEdicao} aria-label="Editar tarefa">
                ✎
              </button>
            )}
            <button
              className="item-tarefa__btn --remover"
              onClick={() => removerTarefa(tarefa.id)}
              aria-label="Remover tarefa"
            >
              ×
            </button>
          </>
        )}
      </div>
    </li>
  );
},
// Comparação customizada: só re-renderiza se o objeto tarefa mudar de referência
(prev, next) => prev.tarefa === next.tarefa
);

export default ItemTarefa;
