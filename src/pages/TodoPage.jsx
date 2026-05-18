// ─────────────────────────────────────────────────────────────
// pages/TodoPage.jsx
// Página principal — compõe todos os componentes
// ─────────────────────────────────────────────────────────────
import FormNovaTarefa from "../components/FormNovaTarefa";
import FiltrosTarefa  from "../components/FiltrosTarefa";
import ListaTarefas   from "../components/ListaTarefas";
import Progresso      from "../components/Progresso";

function TodoPage() {
  return (
    <main className="pagina">
      <header className="pagina__header">
        <div className="pagina__logo" aria-hidden="true">
          <span>_</span>TODO
        </div>
        <h1 className="pagina__titulo">Minhas Tarefas</h1>
        <p className="pagina__sub">Organizado. Focado. Feito.</p>
      </header>

      <div className="pagina__card">
        <FormNovaTarefa />
        <Progresso />
        <FiltrosTarefa />
        <ListaTarefas />
      </div>

      <footer className="pagina__rodape">
        <span>duplo clique para editar · dados salvos localmente</span>
      </footer>
    </main>
  );
}

export default TodoPage;
