# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Minimal Portfolio — React + TypeScript + Vite + Tailwind

  A clean, black-and-white portfolio with light/dark themes:


  Built with React, TypeScript, Vite, and Tailwind CSS v4.

  ## Features

  - Minimal, responsive layout using Tailwind utilities
  - Navbar with anchor links and a theme toggle
  - Sections: Hero, About, Projects, Contact
  - Theme persisted in `localStorage` and respects system preference

  ## Quick Start

  ```powershell
  cd "d:\Web Application\portfolio"
  npm install
  npm run dev
  ```

  Then open http://localhost:5173

  ## Build

  ```powershell
  npm run build
  npm run preview
  ```

  ## Theming

  Theme colors are driven by CSS variables and Tailwind v4 tokens defined in `src/index.css`:

  - `:root { --bg: #DFDFDF; --text: #1B1B1B; }`
  - `.dark { --bg: #1B1B1B; --text: #DFDFDF; }`
  - `@theme` maps these to Tailwind color tokens `surface` and `copy`.

  Use classes like `bg-surface`, `text-copy`, `border-copy/20` throughout.

  ## Customize

  - Update your name and links in `src/components/Navbar.tsx` and `src/sections/*`.
  - Add or edit projects in `src/sections/Projects.tsx`.
      parserOptions: {
