import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node', // Utilisez 'node' pour les tests de logique pure
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      provider: 'v8', // Fournisseur de couverture
      reportsDirectory: './tests/unit/test-reports', // Répertoire pour les rapports de couverture
      reporter: ['html'],
      include: [
        'src/runtime/core/services/**', // Inclure uniquement les fichiers du dossier services
      ],
      exclude: [
        'src/runtime/core/services/index.ts', // Exclure index.ts spécifiquement
      ],
    },
  },
})
