# _TODO — Lista de Tarefas

Aplicação de lista de tarefas desenvolvida com React, aplicando Hooks avançados, Context API, Hooks Customizados e Memoization.

## Tecnologias utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Biblioteca de UI |
| Vite | 6 | Bundler e dev server |
| JavaScript (ES2022) | — | Linguagem principal |
| CSS3 | — | Estilização (sem biblioteca externa) |

## Funcionalidades

- ✅ Adicionar tarefas
- ✅ Marcar/desmarcar como concluída
- ✅ Edição inline (duplo clique)
- ✅ Remover tarefas
- ✅ Filtrar por: Todas / Pendentes / Concluídas
- ✅ Limpar todas as concluídas
- ✅ Barra de progresso
- ✅ Persistência no `localStorage`

## Estrutura do projeto

```
src/
├── context/
│   └── TodoContext.jsx       ← Context API + useReducer + useCallback
├── hooks/
│   ├── useLocalStorage.js    ← Hook customizado: persistência
│   └── useInputControlado.js ← Hook customizado: campo de input
├── components/
│   ├── FormNovaTarefa.jsx    ← React.memo + useInputControlado
│   ├── FiltrosTarefa.jsx     ← React.memo + filtro de estado
│   ├── ListaTarefas.jsx      ← React.memo + .map() dinâmico
│   ├── ItemTarefa.jsx        ← React.memo com comparação customizada
│   └── Progresso.jsx         ← React.memo + useMemo
├── pages/
│   └── TodoPage.jsx          ← Composição dos componentes
├── App.jsx                   ← TodoProvider envolve a árvore
├── main.jsx
└── index.css
```

## Como rodar localmente

**Pré-requisitos:** Node.js 18+ e npm instalados.

```bash
# 1. Clone ou extraia o projeto
cd todolist

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

```bash
# Para gerar o build de produção:
npm run build
```

## Recursos do módulo aplicados

### Hooks
- `useState` — estado do formulário, modo de edição
- `useEffect` — dentro do `useLocalStorage`, persiste no storage a cada mudança
- `useReducer` — gerencia a lista de tarefas via actions tipadas (`ADD`, `TOGGLE`, `REMOVE`, `EDIT`, `CLEAR_CONCLUIDAS`)
- `useCallback` — memoiza as action creators no contexto, evitando re-criação a cada render
- `useRef` — foca o input ao entrar em modo de edição

### Context API
- `TodoContext` com `TodoProvider` centraliza todo o estado global
- `useTodo()` — hook de acesso ao contexto, com erro descritivo se usado fora do Provider

### Hooks Customizados
- `useLocalStorage(chave, valorInicial)` — lê do storage na inicialização, persiste via `useEffect`
- `useInputControlado(inicial)` — gerencia `value`, `onChange`, `reset`, `validar` e `erro`

### Memoization
- `React.memo` em todos os componentes filhos (FormNovaTarefa, FiltrosTarefa, ListaTarefas, ItemTarefa, Progresso)
- `useMemo` para `tarefasFiltradas` (recalcula só quando `tarefas` ou `filtro` mudam) e `contadores`
- `useCallback` para todas as actions do contexto
- `React.memo` com comparação customizada em `ItemTarefa` (compara referência do objeto tarefa)
