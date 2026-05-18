// ─────────────────────────────────────────────────────────────
// hooks/useLocalStorage.js
// Hook customizado: sincroniza state com localStorage
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export function useLocalStorage(chave, valorInicial) {
  // Inicializa do localStorage se existir
  const [valor, setValor] = useState(() => {
    try {
      const item = window.localStorage.getItem(chave);
      return item ? JSON.parse(item) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  // Persiste no localStorage a cada mudança
  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      console.warn(`useLocalStorage: não foi possível salvar "${chave}"`);
    }
  }, [chave, valor]);

  return [valor, setValor];
}
