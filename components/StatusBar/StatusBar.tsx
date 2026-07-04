'use client';

import { AlertTriangle } from 'lucide-react';
import { useEditor } from '@/context/EditorContext';

export function StatusBar() {
  const { activeFile, state } = useEditor();
  const hasFSA = typeof window !== 'undefined' && 'showOpenFilePicker' in window;

  return (
    <footer className="statusbar" aria-label="Barra de estado">
      {activeFile ? (
        <>
          <span className="statusbar-item">
            <strong>{activeFile.wordCount.toLocaleString()}</strong>&nbsp;palabras
          </span>
          <span className="statusbar-item">
            <strong>{activeFile.charCount.toLocaleString()}</strong>&nbsp;chars
          </span>
          <span className="statusbar-item">
            Ln&nbsp;<strong>{activeFile.lineCount}</strong>
          </span>
          <span className="statusbar-item">
            Markdown
          </span>
          {activeFile.isDirty && (
            <span className="statusbar-item" style={{ color: 'var(--peach)' }}>
              ● Sin guardar
            </span>
          )}
        </>
      ) : (
        <span className="statusbar-item" style={{ color: 'var(--overlay0)' }}>
          Sin archivo — Ctrl+O para abrir
        </span>
      )}

      <div className="statusbar-spacer" />

      {/* LocalStorage indicator */}
      <span
        className="ls-indicator statusbar-item"
        title="Los archivos abiertos se guardan temporalmente en localStorage de tu navegador para no perder cambios al recargar. No se envía nada al servidor."
      >
        <AlertTriangle />
        Sesión en caché local
      </span>

      {!hasFSA && (
        <span className="statusbar-warning statusbar-item" title="Tu navegador no soporta File System Access API. El guardado usará descarga de archivos.">
          <AlertTriangle />
          Navegador sin FS API
        </span>
      )}

      <span className="statusbar-item" style={{ color: 'var(--overlay0)' }}>
        EditorMD
      </span>
    </footer>
  );
}
