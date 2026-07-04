'use client';

import { useEditor } from '@/context/EditorContext';
import { EditorFile } from '@/lib/types';
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  Code,
  Code2,
  Link,
  Image,
  Table,
  Quote,
  Minus,
} from 'lucide-react';

type InsertAction = {
  icon: React.ReactNode;
  label: string;
  title: string;
  id: string;
  insert: (sel: string) => { before: string; after: string; placeholder: string };
};

const TOOLBAR_ACTIONS: (InsertAction | 'sep')[] = [
  {
    icon: <Bold />, label: 'B', title: 'Negrita (Ctrl+B)', id: 'tb-bold',
    insert: (sel) => ({ before: '**', after: '**', placeholder: 'texto en negrita' }),
  },
  {
    icon: <Italic />, label: 'I', title: 'Cursiva (Ctrl+I)', id: 'tb-italic',
    insert: (sel) => ({ before: '_', after: '_', placeholder: 'texto en cursiva' }),
  },
  {
    icon: <Strikethrough />, label: 'S', title: 'Tachado', id: 'tb-strike',
    insert: (sel) => ({ before: '~~', after: '~~', placeholder: 'texto tachado' }),
  },
  'sep',
  {
    icon: <Heading1 />, label: 'H1', title: 'Encabezado 1', id: 'tb-h1',
    insert: (sel) => ({ before: '# ', after: '', placeholder: 'Encabezado 1' }),
  },
  {
    icon: <Heading2 />, label: 'H2', title: 'Encabezado 2', id: 'tb-h2',
    insert: (sel) => ({ before: '## ', after: '', placeholder: 'Encabezado 2' }),
  },
  {
    icon: <Heading3 />, label: 'H3', title: 'Encabezado 3', id: 'tb-h3',
    insert: (sel) => ({ before: '### ', after: '', placeholder: 'Encabezado 3' }),
  },
  'sep',
  {
    icon: <List />, label: '—', title: 'Lista sin orden', id: 'tb-ul',
    insert: (sel) => ({ before: '- ', after: '', placeholder: 'elemento de lista' }),
  },
  {
    icon: <ListOrdered />, label: '—', title: 'Lista ordenada', id: 'tb-ol',
    insert: (sel) => ({ before: '1. ', after: '', placeholder: 'elemento de lista' }),
  },
  {
    icon: <ListChecks />, label: '—', title: 'Lista de tareas', id: 'tb-task',
    insert: (sel) => ({ before: '- [ ] ', after: '', placeholder: 'tarea' }),
  },
  'sep',
  {
    icon: <Code />, label: '`', title: 'Código inline (Ctrl+`)', id: 'tb-code-inline',
    insert: (sel) => ({ before: '`', after: '`', placeholder: 'código' }),
  },
  {
    icon: <Code2 />, label: '```', title: 'Bloque de código', id: 'tb-code-block',
    insert: (sel) => ({ before: '```\n', after: '\n```', placeholder: 'código aquí' }),
  },
  'sep',
  {
    icon: <Quote />, label: '"', title: 'Cita', id: 'tb-quote',
    insert: (sel) => ({ before: '> ', after: '', placeholder: 'cita' }),
  },
  {
    icon: <Link />, label: '🔗', title: 'Enlace', id: 'tb-link',
    insert: (sel) => ({ before: '[', after: '](url)', placeholder: sel || 'texto del enlace' }),
  },
  {
    icon: <Image />, label: '🖼', title: 'Imagen', id: 'tb-image',
    insert: (sel) => ({ before: '![', after: '](url)', placeholder: 'descripción de imagen' }),
  },
  {
    icon: <Table />, label: '⊞', title: 'Tabla', id: 'tb-table',
    insert: (sel) => ({
      before: '| Col 1 | Col 2 | Col 3 |\n| --- | --- | --- |\n| ',
      after: ' | valor | valor |',
      placeholder: 'valor',
    }),
  },
  {
    icon: <Minus />, label: '—', title: 'Separador horizontal', id: 'tb-hr',
    insert: (sel) => ({ before: '\n---\n', after: '', placeholder: '' }),
  },
];

interface EditorToolbarProps {
  onInsert: (before: string, after: string, placeholder: string) => void;
}

export function EditorToolbar({ onInsert }: EditorToolbarProps) {
  const { activeFile } = useEditor();

  return (
    <div className="editor-toolbar" role="toolbar" aria-label="Herramientas de formato">
      {TOOLBAR_ACTIONS.map((action, i) => {
        if (action === 'sep') {
          return <div key={`sep-${i}`} className="toolbar-separator" role="separator" />;
        }
        return (
          <button
            key={action.id}
            id={action.id}
            className="toolbar-btn"
            title={action.title}
            onClick={() => {
              const { before, after, placeholder } = action.insert('');
              onInsert(before, after, placeholder);
            }}
            disabled={!activeFile}
            aria-label={action.title}
          >
            {action.icon}
          </button>
        );
      })}
    </div>
  );
}
