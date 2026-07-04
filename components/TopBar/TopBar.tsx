'use client';

import { FileText, Save, FolderOpen, File, Plus, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useEditor } from '@/context/EditorContext';

const VIEW_MODES = [
  { key: 'editor', label: 'Editor' },
  { key: 'split', label: 'Split' },
  { key: 'preview', label: 'Preview' },
] as const;

export function TopBar() {
  const {
    state,
    dispatch,
    activeFile,
    openFile,
    openFolder,
    saveFile,
    saveFileAs,
    newFile,
    setViewMode,
  } = useEditor();

  const hasFSA = typeof window !== 'undefined' && 'showOpenFilePicker' in window;

  return (
    <header className="topbar">
      {/* Brand */}
      <div className="topbar-brand">
        <div className="topbar-logo">
          <FileText />
        </div>
        <span className="topbar-title">EditorMD</span>
      </div>

      {/* Sidebar toggle */}
      <button
        className="topbar-btn"
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        title={state.sidebarOpen ? 'Ocultar sidebar (Ctrl+\\)' : 'Mostrar sidebar (Ctrl+\\)'}
        id="btn-toggle-sidebar"
      >
        {state.sidebarOpen ? <PanelLeftClose /> : <PanelLeft />}
      </button>

      <div className="topbar-divider" />

      {/* Active file name */}
      {activeFile ? (
        <span className={`topbar-file-name${activeFile.isDirty ? ' unsaved' : ''}`}>
          {activeFile.name}
          {!hasFSA && activeFile.isDirty && (
            <span style={{ fontSize: 10, color: 'var(--overlay0)', marginLeft: 4 }}>
              (sin acceso directo)
            </span>
          )}
        </span>
      ) : (
        <span className="topbar-file-name" style={{ color: 'var(--overlay0)' }}>
          Sin archivo abierto
        </span>
      )}

      {/* View mode toggle */}
      <div className="view-toggle" role="group" aria-label="Modo de vista">
        {VIEW_MODES.map(({ key, label }) => (
          <button
            key={key}
            className={`view-toggle-btn${state.viewMode === key ? ' active' : ''}`}
            onClick={() => setViewMode(key as any)}
            id={`btn-view-${key}`}
            aria-pressed={state.viewMode === key}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        <button className="topbar-btn" onClick={newFile} title="Nuevo documento" id="btn-new">
          <Plus />
          <span>Nuevo</span>
          <span className="shortcut">Ctrl+N</span>
        </button>

        <button className="topbar-btn" onClick={openFile} title="Abrir archivo" id="btn-open-file">
          <File />
          <span>Abrir</span>
          <span className="shortcut">Ctrl+O</span>
        </button>

        <button className="topbar-btn" onClick={openFolder} title="Abrir carpeta" id="btn-open-folder">
          <FolderOpen />
          <span>Carpeta</span>
          <span className="shortcut">Ctrl+⇧+O</span>
        </button>

        {activeFile && (
          <>
            <div className="topbar-divider" />
            <button
              className={`topbar-btn primary${!activeFile.isDirty ? ' disabled' : ''}`}
              onClick={() => saveFile()}
              title={`Guardar${hasFSA ? ' en disco' : ' (descarga)'}`}
              id="btn-save"
              disabled={!activeFile.isDirty}
              style={{ opacity: activeFile.isDirty ? 1 : 0.5 }}
            >
              <Save />
              <span>Guardar</span>
              <span className="shortcut">Ctrl+S</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
