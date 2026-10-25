/// <reference types="vitest/config" />
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { sectionAliases, sectionIds } from './src/data/sections.ts'

// GitHub Pages serves project sites from /<repo>/, so the deploy workflow sets
// BASE_PATH. Local dev and user sites (<user>.github.io) use the root.
const base = process.env.BASE_PATH ?? '/'

// GitHub Pages only serves files that exist, so give every home-page section its
// own copy of the home page to open on. Pages serves /projects from
// projects.html, which keeps addresses free of a trailing slash (a projects/
// folder would redirect to /projects/ instead).
function sectionPages(): Plugin {
  return {
    name: 'section-pages',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const home = bundle['index.html']
      if (home?.type !== 'asset') throw new Error('section-pages: index.html not found in bundle')
      for (const id of [...sectionIds, ...Object.keys(sectionAliases)]) {
        this.emitFile({ type: 'asset', fileName: `${id}.html`, source: home.source })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), sectionPages()],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    // Whole-page renders are fast but can stall on a busy machine or CI runner;
    // the 5s default made them flaky.
    testTimeout: 15_000,
  },
})
