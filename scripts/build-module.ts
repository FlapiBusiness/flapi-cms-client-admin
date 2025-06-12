/**
 * Script pour construire le module Nuxt
 * Il remplace temporairement le tsconfig.json par tsconfig.build.json,
 * effectue le build, puis restaure les fichiers originaux.
 *
 * Obligatoire parce que Nuxt Module Build pointe vers tsconfig.json par défaut.
 *
 * (Contrainte)
 */

import { renameSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

// Détermine les chemins absolus
const ROOT = process.cwd()
const tsconfig = join(ROOT, 'tsconfig.json')
const tsconfigBuild = join(ROOT, 'tsconfig.build.json')
const tsconfigBackup = join(ROOT, 'tsconfig.temp.json')

// Vérifie que tsconfig.build.json existe
if (!existsSync(tsconfigBuild)) {
  console.error('❌ tsconfig.build.json introuvé.')
  process.exit(1)
}

// Sauvegarde tsconfig.json existant (s’il existe)
const hadOriginalTsconfig = existsSync(tsconfig)
if (hadOriginalTsconfig) {
  renameSync(tsconfig, tsconfigBackup)
}

// Remplace temporairement par tsconfig.build.json
renameSync(tsconfigBuild, tsconfig)

try {
  // Exécute le build
  execSync('nuxt-module-build build', { stdio: 'inherit' })
} catch (err) {
  console.error('❌ Erreur pendant le build :', (err as Error).message)
} finally {
  // Restaure les fichiers
  renameSync(tsconfig, tsconfigBuild)
  if (hadOriginalTsconfig) {
    renameSync(tsconfigBackup, tsconfig)
  }
}
