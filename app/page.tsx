import { EditorProvider } from '@/context/EditorContext';
import { AppShell } from '@/components/AppShell';

export default function Home() {
  return (
    <EditorProvider>
      <AppShell />
    </EditorProvider>
  );
}
