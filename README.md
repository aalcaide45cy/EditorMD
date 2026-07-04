# EditorMD

> Editor de Markdown serverless, elegante e inspirado en [Joplin](https://joplinapp.org/), construido con Next.js para desplegarse en Vercel.

![Screenshot](./public/next.svg)

## ✨ Características

- **Editor potente** — CodeMirror 6 con syntax highlighting de Markdown en tiempo real
- **Vista Split / Editor / Preview** — Como Joplin desktop
- **Abrir archivos individuales** — File System Access API (Chrome/Edge) o input fallback
- **Abrir carpetas completas** — Explorar y editar todos los `.md` de una carpeta con árbol colapsable
- **Guardar directamente** — Escribe de vuelta al archivo original en disco (no descarga)
- **Arrastrar & soltar** — Drag & drop de archivos `.md` directamente al editor
- **Caché localStorage** — Los documentos abiertos se preservan en sesión local (no se envía nada al servidor)
- **Múltiples documentos** — Gestión de varios archivos abiertos simultáneamente
- **Barra de herramientas** — Negrita, cursiva, headings, listas, código, tablas, citas...
- **Markdown completo** — GFM, tablas, listas de tareas, LaTeX/KaTeX, bloques de código con highlighting
- **Atajos de teclado** — Ctrl+O, Ctrl+Shift+O, Ctrl+S, Ctrl+N, Ctrl+B, Ctrl+I...
- **100% Serverless** — Ningún dato abandona tu equipo

## 🎨 Diseño

Tema oscuro premium inspirado en la paleta **Catppuccin Macchiato**, con accentos en violeta/lavanda, tipografía Inter + JetBrains Mono, y micro-animaciones.

## 🚀 Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aalcaide45cy/EditorMD)

## 💻 Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## ⌨️ Atajos de teclado

| Shortcut | Acción |
|---|---|
| `Ctrl+O` | Abrir archivo |
| `Ctrl+Shift+O` | Abrir carpeta |
| `Ctrl+S` | Guardar |
| `Ctrl+Shift+S` | Guardar como |
| `Ctrl+N` | Nuevo documento |
| `Ctrl+\` | Toggle sidebar |
| `Ctrl+B` | Negrita |
| `Ctrl+I` | Cursiva |
| `Ctrl+\`` | Código inline |
| `Alt+1/2/3` | Editor / Split / Preview |

## 🌐 Compatibilidad de navegadores

| Función | Chrome/Edge | Firefox | Safari |
|---|---|---|---|
| Abrir archivo | ✅ File System API | ✅ fallback | ✅ fallback |
| Abrir carpeta | ✅ File System API | ✅ webkitdirectory | ⚠️ parcial |
| Guardar directamente | ✅ File System API | ⬇️ descarga | ⬇️ descarga |
| Drag & drop | ✅ | ✅ | ✅ |

## 📦 Stack

- **Next.js 16** (App Router)
- **CodeMirror 6** — editor
- **react-markdown** — preview
- **remark-gfm, remark-math** — extensiones Markdown
- **rehype-highlight, rehype-katex** — código y matemáticas
- **lucide-react** — iconos
- **Vanilla CSS** — sin frameworks CSS

## 🔒 Privacidad

Todo el procesamiento ocurre **en el navegador**. Ningún archivo se envía a ningún servidor. El caché localStorage es local a tu dispositivo.
