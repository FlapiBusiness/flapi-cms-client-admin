#!/bin/bash

# Chemin de base pour les composants
BASE_PATH="src/runtime/components"
BASE_STORIES_PATH="stories"
BASE_TYPES_PATH="src/runtime/core/types"

# Vérification de l'argument
if [ -z "$1" ]; then
  echo "Usage: npm run create:component <path/to/ComponentName>"
  exit 1
fi

# Récupérer le chemin complet et le nom du composantBASE_TYPES_PATH="src/runtime/core/types"
INPUT_PATH="$1"
DIR_PATH=$(dirname "$INPUT_PATH")
COMPONENT_NAME=$(basename "$INPUT_PATH")

# Forcer la première lettre en majuscule pour le nom du composant
CAPITALIZED_NAME="$(echo "${COMPONENT_NAME:0:1}" | tr '[:lower:]' '[:upper:]')${COMPONENT_NAME:1}"

# Construire les chemins finaux
FULL_DIR_PATH="$BASE_PATH/$DIR_PATH"
COMPONENT_FILE="$FULL_DIR_PATH/$CAPITALIZED_NAME.vue"
STORYBOOK_DIR_PATH="$BASE_STORIES_PATH/$DIR_PATH"
STORYBOOK_FILE="$STORYBOOK_DIR_PATH/$CAPITALIZED_NAME.stories.ts"
TYPES_FILE="$BASE_TYPES_PATH/$CAPITALIZED_NAME.ts"
TYPES_INDEX_FILE="$BASE_TYPES_PATH/index.ts"

# Créer les dossiers nécessaires pour le composant
mkdir -p "$FULL_DIR_PATH"
mkdir -p "$BASE_TYPES_PATH"


# Générer le fichier de type si non existant
if [ ! -f "$TYPES_FILE" ]; then
  cat <<EOF > "$TYPES_FILE"
/**
 * Type definitions for the ${CAPITALIZED_NAME} component props
 */
export type ${CAPITALIZED_NAME}Props = {
  title: string;
};
EOF
  echo "✅ Fichier TypeScript créé : $TYPES_FILE"
else
  echo "❌ Le fichier TypeScript existe déjà : $TYPES_FILE"
fi

# Vérification et création du fichier index.ts s'il n'existe pas
if [ ! -f "$TYPES_INDEX_FILE" ]; then
  touch "$TYPES_INDEX_FILE"
  echo "✅ Fichier index.ts créé : $TYPES_INDEX_FILE"
fi

# Vérifier si l'export existe déjà avant de l'ajouter
if ! grep -q "export \* from './${CAPITALIZED_NAME}';" "$TYPES_INDEX_FILE"; then
  echo "export * from './${CAPITALIZED_NAME}';" >> "$TYPES_INDEX_FILE"
  echo "✅ Export ajouté dans $TYPES_INDEX_FILE"
else
  echo "❌ L'export existe déjà dans $TYPES_INDEX_FILE"
fi

# Générer le fichier .vue si non existant
if [ ! -f "$COMPONENT_FILE" ]; then
  cat <<EOF > "$COMPONENT_FILE"
<template>
  <h1>{{ props.title }}</h1>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'
import type { ${CAPITALIZED_NAME}Props } from '#/core'

/**
 * Type definitions for the ${CAPITALIZED_NAME} component props
 * @type {${CAPITALIZED_NAME}Props}
 * @property {string} title - The title of the component
 */
const props: ${CAPITALIZED_NAME}Props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
EOF
  echo "✅ Composant Vue créé : $COMPONENT_FILE"
else
  echo "❌ Le composant Vue existe déjà : $COMPONENT_FILE"
fi

# Créer les dossiers nécessaires pour les fichiers Storybook
mkdir -p "$STORYBOOK_DIR_PATH"

# Générer le fichier .stories.ts si non existant
if [ ! -f "$STORYBOOK_FILE" ]; then
  cat <<EOF > "$STORYBOOK_FILE"
import type { Meta, StoryFn } from '@storybook/vue3';
import ${CAPITALIZED_NAME} from '#/components/${DIR_PATH}/${CAPITALIZED_NAME}.vue';
import type { ${CAPITALIZED_NAME}Props } from '#/core';

type ${CAPITALIZED_NAME}Args = ${CAPITALIZED_NAME}Props

export default {
  title: '${DIR_PATH}/${CAPITALIZED_NAME}',
  component: ${CAPITALIZED_NAME},
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the component',
    },
  },
} as Meta<typeof ${CAPITALIZED_NAME}>;

export const Default: StoryFn<${CAPITALIZED_NAME}Args> = (args) => ({
  components: { ${CAPITALIZED_NAME} },
  setup() {
    return { args };
  },
  template: \`
    <${CAPITALIZED_NAME} v-bind="args" :title="args.title" />
  \`,
});

Default.args = {
  title: '${CAPITALIZED_NAME}',
};
EOF
  echo "✅ Fichier Storybook créé : $STORYBOOK_FILE"
else
  echo "❌ Le fichier Storybook existe déjà : $STORYBOOK_FILE"
fi
