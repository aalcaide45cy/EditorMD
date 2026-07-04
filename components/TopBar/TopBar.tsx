'use client';

import { Sun, Moon, FileText, Save, FolderOpen, File, Plus, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useEditor } from '@/context/EditorContext';
import { useTheme } from '@/context/ThemeContext';
import { useScale } from '@/context/ScaleContext';

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

  const { theme, toggleTheme } = useTheme();
  const { scale, increaseScale, decreaseScale, resetScale, canIncrease, canDecrease } = useScale();

  const hasFSA = typeof window !== 'undefined' && 'showOpenFilePicker' in window;

  return (
    <header className="topbar">
      {/* Brand */}
      <div className="topbar-brand">
        <div className="topbar-logo" aria-hidden="true">
          <FileText style={{ width: 16, height: 16, color: 'white', strokeWidth: 2.5 }} />
        </div>
        <span className="topbar-title">EditorMD</span>
      </div>

      {/* Sidebar toggle */}
      <button
        className="topbar-btn"
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        title={state.sidebarOpen ? 'Ocultar sidebar (Ctrl+\\)' : 'Mostrar sidebar (Ctrl+\\)'}
        id="btn-toggle-sidebar"
        aria-label={state.sidebarOpen ? 'Ocultar panel lateral' : 'Mostrar panel lateral'}
      >
        {state.sidebarOpen ? <PanelLeftClose /> : <PanelLeft />}
      </button>

      <div className="topbar-divider" />

      {/* Active file name */}
      {activeFile ? (
        <span className={`topbar-file-name${activeFile.isDirty ? ' unsaved' : ''}`} title={activeFile.path}>
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
        <button className="topbar-btn" onClick={newFile} title="Nuevo documento (Ctrl+N)" id="btn-new">
          <Plus />
          <span>Nuevo</span>
          <span className="shortcut">Ctrl+N</span>
        </button>

        <button className="topbar-btn" onClick={openFile} title="Abrir archivo (Ctrl+O)" id="btn-open-file">
          <File />
          <span>Abrir</span>
          <span className="shortcut">Ctrl+O</span>
        </button>

        <button className="topbar-btn" onClick={openFolder} title="Abrir carpeta (Ctrl+Shift+O)" id="btn-open-folder">
          <FolderOpen />
          <span>Carpeta</span>
          <span className="shortcut">Ctrl+⇧+O</span>
        </button>

        {activeFile && (
          <>
            <div className="topbar-divider" />
            <button
              className="topbar-btn primary"
              onClick={() => saveFile()}
              title={`Guardar${hasFSA ? ' en disco' : ' (descarga)'} (Ctrl+S)`}
              id="btn-save"
              style={{ opacity: activeFile.isDirty ? 1 : 0.6 }}
            >
              <Save />
              <span>Guardar</span>
              <span className="shortcut">Ctrl+S</span>
            </button>
          </>
        )}

        <div className="topbar-divider" />

        {/* UI Scale controls */}
        <div className="scale-controls" role="group" aria-label="Escala de interfaz" title="Ajustar tamaño de la interfaz">
          <button
            className="scale-btn"
            onClick={decreaseScale}
            disabled={!canDecrease}
            id="btn-scale-down"
            aria-label="Reducir escala"
            title="Reducir tamaño"
          >
            −
          </button>
          <button
            className="scale-label"
            onClick={resetScale}
            id="btn-scale-reset"
            aria-label={`Escala actual ${scale}%. Clic para restablecer`}
            title="Restablecer al 100%"
            style={{ cursor: scale !== 100 ? 'pointer' : 'default', background: 'none', border: 'none' }}
          >
            {scale}%
          </button>
          <button
            className="scale-btn"
            onClick={increaseScale}
            disabled={!canIncrease}
            id="btn-scale-up"
            aria-label="Aumentar escala"
            title="Aumentar tamaño"
          >
            +
          </button>
        </div>

        {/* Theme toggle */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          id="btn-theme-toggle"
          aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  );
}
