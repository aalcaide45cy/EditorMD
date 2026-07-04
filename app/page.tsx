import { EditorProvider } from '@/context/EditorContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ScaleProvider } from '@/context/ScaleContext';
import { AppShell } from '@/components/AppShell';

export default function Home() {
  return (
    <ThemeProvider>
      <ScaleProvider>
        <EditorProvider>
          <AppShell />
        </EditorProvider>
      </ScaleProvider>
    </ThemeProvider>
  );
}
