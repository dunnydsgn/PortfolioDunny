import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        
        // Procura em src/assets
        const assetsPath = path.resolve(__dirname, 'src/assets', filename)
        if (fs.existsSync(assetsPath)) {
          return assetsPath
        }

        // Procura em src/imports (caso o Figma Make tenha exportado lá)
        const importsPath = path.resolve(__dirname, 'src/imports', filename)
        if (fs.existsSync(importsPath)) {
          return importsPath
        }

        // Caminho padrão caso não encontre
        return assetsPath
      }
    },
  }
}

export default defineConfig({
  base: '/PortfolioDunny/', // Mantém o caminho correto para o GitHub Pages
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp'],
})
