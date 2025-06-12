/**
 * Utilisatin du script :
 * tsx scripts/generate-listeicons-metadata.ts
 *
 * Output :
 */

import { parse } from 'vue-docgen-api'
import fs from 'fs'
import path from 'path'

type ComponentMeta = {
  name: string
  description?: string
  props?: Record<string, any>
  events?: Record<string, any>
  slots?: Record<string, any>
  category: string
}

const componentsDir = path.resolve('node_modules/@flapi/cms-designsystem/dist/runtime/components')
const iconsDir = path.join(componentsDir, 'icons')

// 🎯 Chemins de sortie dans src/runtime/assets/
const outputDir = path.resolve('src/runtime/assets')
const outputMetaFile = path.join(outputDir, 'components-meta.json')
const outputIconsFile = path.join(outputDir, 'icons/liste.json')

const getFilesRecursively = (dir: string, extension = '.vue', fileList: string[] = []): string[] => {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    if (filePath === iconsDir) continue
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, extension, fileList)
    } else if (filePath.endsWith(extension)) {
      fileList.push(filePath)
    }
  }
  return fileList
}

const generateComponentMeta = async () => {
  const vueFiles = getFilesRecursively(componentsDir)
  const componentsMeta: ComponentMeta[] = []

  for (const filePath of vueFiles) {
    try {
      const doc = await parse(filePath)
      componentsMeta.push({
        name: doc.displayName,
        description: doc.description,
        props: doc.props,
        events: doc.events,
        slots: doc.slots,
        category: path.relative(componentsDir, path.dirname(filePath)),
      })
    } catch (error) {
      console.error(`❌ Failed to parse ${filePath}:`, (error as Error).message)
    }
  }

  fs.mkdirSync(path.dirname(outputMetaFile), { recursive: true })
  fs.writeFileSync(outputMetaFile, JSON.stringify(componentsMeta, null, 2))
  console.log(`✅ ${componentsMeta.length} composants exportés dans ${outputMetaFile}`)
}

const generateIconList = () => {
  if (!fs.existsSync(iconsDir)) {
    console.warn(`⚠️ Le dossier ${iconsDir} n'existe pas.`)
    return
  }

  const icons = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith('.vue'))
    .map((file) => path.basename(file, '.vue'))

  fs.mkdirSync(path.dirname(outputIconsFile), { recursive: true })
  fs.writeFileSync(outputIconsFile, JSON.stringify(icons, null, 2))
  console.log(`✅ ${icons.length} icônes exportées dans ${outputIconsFile}`)
}

const run = async () => {
  await generateComponentMeta()
  generateIconList()
}

run()
