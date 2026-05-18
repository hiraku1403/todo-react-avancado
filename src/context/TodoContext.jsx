// ─────────────────────────────────────────────────────────────
// context/TodoContext.jsx
// Context API: estado global de tarefas + filtro
// ─────────────────────────────────────────────────────────────
import { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// ── 1. Reducer (lógica pura de estado) ───────────────────────
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        {
          id: crypto.randomUUID(),
          texto: action.payload.trim(),
          concluida: false,
          criadaEm: new Date().toISOString(),
        },
        ...state,
      ];

    case "TOGGLE":
      return state.map((t) =>
        t.id === action.id ? { ...t, concluida: !t.concluida } : t
      );

    case "REMOVE":
      return state.filter((t) => t.id !== action.id);

    case "EDIT":
      return state.map((t) =>
        t.id === action.id ? { ...t, texto: action.texto } : t
      );

    case "CLEAR_CONCLUIDAS":
      return state.filter((t) => !t.concluida);

    case "LOAD":
      return action.payload;

    default:
      return state;
  }
}

// ── 2. Criação do Contexto ────────────────────────────────────
const TodoContext = createContext(null);

// ── 3. Provider ──────────────────────────────────────────────
export function TodoProvider({ children }) {
  // Hook customizado: persistência no localStorage
  const [savedTodos, setSavedTodos] = useLocalStorage("todos", []);

  const [tarefas, dispatch] = useReducer(todoReducer, savedTodos);
  const [filtro, setFiltro] = useLocalStorage("filtro", "todas");

  // ✅ useEffect: persiste tarefas no localStorage sempre que a lista mudar
  useEffect(() => {
    setSavedTodos(tarefas);
  }, [tarefas]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Actions com useCallback (evita re-criação) ────────────
  const adicionarTarefa = useCallback((texto) => {
    if (!texto.trim()) return;
    dispatch({ type: "ADD", payload: texto });
  }, []);

  const alternarTarefa = useCallback((id) => {
    dispatch({ type: "TOGGLE", id });
  }, []);

  const removerTarefa = useCallback((id) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const editarTarefa = useCallback((id, texto) => {
    if (!texto.trim()) return;
    dispatch({ type: "EDIT", id, texto });
  }, []);

  const limparConcluidas = useCallback(() => {
    dispatch({ type: "CLEAR_CONCLUIDAS" });
  }, []);

  // ── useMemo: lista filtrada (evita recalculo a cada render) ─
  const tarefasFiltradas = useMemo(() => {
    switch (filtro) {
      case "concluidas": return tarefas.filter((t) => t.concluida);
      case "pendentes":  return tarefas.filter((t) => !t.concluida);
      default:           return tarefas;
    }
  }, [tarefas, filtro]);

  // ── useMemo: contadores ───────────────────────────────────
  const contadores = useMemo(() => ({
    total:      tarefas.length,
    concluidas: tarefas.filter((t) => t.concluida).length,
    pendentes:  tarefas.filter((t) => !t.concluida).length,
  }), [tarefas]);

  const value = {
    tarefas,
    tarefasFiltradas,
    filtro,
    setFiltro,
    contadores,
    adicionarTarefa,
    alternarTarefa,
    removerTarefa,
    editarTarefa,
    limparConcluidas,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// ── 4. Hook de acesso ao contexto ────────────────────────────
export function useTodo() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo deve ser usado dentro de <TodoProvider>");
  return ctx;
}
