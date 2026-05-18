// ─────────────────────────────────────────────────────────────
// App.jsx — Raiz: envolve com o Provider do contexto
// ─────────────────────────────────────────────────────────────
import { TodoProvider } from "./context/TodoContext";
import TodoPage         from "./pages/TodoPage";
import "./index.css";

function App() {
  return (
    <TodoProvider>
      <TodoPage />
    </TodoProvider>
  );
}

export default App;
