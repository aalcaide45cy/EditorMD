'use client';

import { useEffect } from 'react';
import { useEditor } from '@/context/EditorContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { TopBar } from '@/components/TopBar/TopBar';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { EditorArea } from '@/components/Editor/EditorArea';
import { StatusBar } from '@/components/StatusBar/StatusBar';
import { LocalStorageNotice } from '@/components/LocalStorageNotice/LocalStorageNotice';
import { DragDropOverlay } from '@/components/DragDrop/DragDropOverlay';

export function AppShell() {
  useKeyboardShortcuts();
  const { hasUnsavedChanges } = useEditor();

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasUnsavedChanges]);

  return (
    <div className="app-root">
      <TopBar />
      <div className="app-body">
        <Sidebar />
        <EditorArea />
      </div>
      <StatusBar />
      <LocalStorageNotice />
      <DragDropOverlay />
    </div>
  );
}
