// ─────────────────────────────────────────────────────────────
// hooks/useInputControlado.js
// Hook customizado: gerencia campo de input com reset e validação
// ─────────────────────────────────────────────────────────────
import { useState, useCallback } from "react";

export function useInputControlado(inicial = "") {
  const [valor, setValor]   = useState(inicial);
  const [erro,  setErro]    = useState("");

  const handleChange = useCallback((e) => {
    setValor(e.target.value);
    if (e.target.value.trim()) setErro("");
  }, []);

  const reset = useCallback(() => {
    setValor(inicial);
    setErro("");
  }, [inicial]);

  const validar = useCallback(() => {
    if (!valor.trim()) {
      setErro("Digite o texto da tarefa.");
      return false;
    }
    if (valor.trim().length > 160) {
      setErro("Máximo de 160 caracteres.");
      return false;
    }
    return true;
  }, [valor]);

  return { valor, erro, handleChange, reset, validar, setValor };
}
