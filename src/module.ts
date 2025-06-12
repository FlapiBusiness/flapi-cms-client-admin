import {
  defineNuxtModule,
  addComponentsDir,
  createResolver,
  installModule,
  addImportsDir,
  addPlugin,
  extendPages,
  addLayout,
  addServerHandler,
} from '@nuxt/kit'
import type { Resolver } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import { fileURLToPath } from 'node:url'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'flapi-cms-admin',
    configKey: 'flapiCMSAdmin',
  },
  async setup(_: ModuleOptions, nuxt: Nuxt): Promise<void> {
    const resolver: Resolver = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    const tailwindCssPath: string = resolver.resolve('./runtime/assets/css/tailwind.css')
    const generatedCssPath: string = resolver.resolve('./runtime/assets/css/generated.css')

    // Installation de Tailwind CSS
    await installModule('@nuxtjs/tailwindcss', {
      /**
       * Here, you specify where your config is.
       * By default, the module have a configPath relative
       * to the current path, ie the playground!
       * (or the app using your module)
       */
      cssPath: tailwindCssPath,
      configPath: resolver.resolve('../tailwind.config'),
    })

    // Installez Pinia
    await installModule('@pinia/nuxt')

    // Ajout du fichier CSS généré
    if (!nuxt.options.css.includes(generatedCssPath)) {
      nuxt.options.css.push(generatedCssPath)
    }

    // Ajout de l'alias # pour le répertoire runtime/
    nuxt.options.alias['#cmsadmin'] = resolver.resolve('./runtime')

    // Ajoute le répertoire des composants
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      pathPrefix: false,
      prefix: '',
      global: true,
    })

    // Ajouter le dossier core/ (services, types, etc.)
    addImportsDir(resolver.resolve('./runtime/core'))

    // Ajouter le dossier stores/ (Pinia stores)
    addImportsDir(resolver.resolve('./runtime/stores'))

    // Ajouter le dossier composables/ (composables)
    addImportsDir(resolver.resolve('./runtime/composables'))

    // Ajoute le layout cms
    addLayout(
      {
        src: resolver.resolve('./runtime/layouts/cms.vue'),
        filename: 'cms.vue',
        write: true, // Nécessaire pour écrire le fichier en raison des limitations de Vite
      },
      'cms', // Nom du layout
    )

    // Ajout des pages
    extendPages((pages: any): void => {
      // Ajout de la page d'accueil
      pages.push({
        name: 'index', // Nom de la route
        path: '/', // La route accessible
        file: resolver.resolve('./runtime/pages/index.vue'), // Fichier Vue à charger
      })

      // Ajout de la page dashboard
      pages.push({
        name: 'dashboard', // Nom de la route
        path: '/dashboard', // La route accessible
        file: resolver.resolve('./runtime/pages/dashboard/index.vue'), // Fichier Vue à charger
      })
    })

    // Ajout du middleware global pour le dashboard
    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware/dashboard.global.ts'),
      // Pas de route = middleware global
    })

    // Ajout du plugin : VeeValidate
    addPlugin(
      {
        src: resolver.resolve('./runtime/plugins/VeeValidate'),
      },
      {
        append: true,
      },
    )
  },
})
