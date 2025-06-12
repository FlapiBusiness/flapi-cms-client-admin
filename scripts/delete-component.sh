#!/bin/bash

# Chemins de base
BASE_PATH="src/runtime/components"
BASE_STORIES_PATH="stories"
BASE_TYPES_PATH="src/runtime/core/types"
TYPES_INDEX_FILE="$BASE_TYPES_PATH/index.ts"

# Vérification de l'argument
if [ -z "$1" ]; then
  echo "Usage: npm run delete:component <path/to/ComponentName>"
  exit 1
fi

# Récupérer le chemin complet et le nom du composant
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

# Supprimer le fichier du composant Vue
if [ -f "$COMPONENT_FILE" ]; then
  rm "$COMPONENT_FILE"
  echo "✅ Composant supprimé : $COMPONENT_FILE"
else
  echo "❌ Le composant n'existe pas : $COMPONENT_FILE"
fi

# Supprimer le fichier Storybook
if [ -f "$STORYBOOK_FILE" ]; then
  rm "$STORYBOOK_FILE"
  echo "✅ Fichier Storybook supprimé : $STORYBOOK_FILE"
else
  echo "❌ Le fichier Storybook n'existe pas : $STORYBOOK_FILE"
fi

# Supprimer le fichier TypeScript du type
if [ -f "$TYPES_FILE" ]; then
  rm "$TYPES_FILE"
  echo "✅ Fichier TypeScript supprimé : $TYPES_FILE"
else
  echo "❌ Le fichier TypeScript n'existe pas : $TYPES_FILE"
fi

# Supprimer la ligne d'export du fichier `index.ts`
if [ -f "$TYPES_INDEX_FILE" ]; then
  sed -i "/export \* from '\.\/$CAPITALIZED_NAME'/d" "$TYPES_INDEX_FILE"
  echo "✅ Ligne d'export supprimée de $TYPES_INDEX_FILE"
else
  echo "❌ Le fichier index.ts n'existe pas : $TYPES_INDEX_FILE"
fi

# Vérifier si le dossier du composant est vide et le supprimer
if [ -d "$FULL_DIR_PATH" ] && [ -z "$(ls -A "$FULL_DIR_PATH")" ]; then
  rmdir "$FULL_DIR_PATH"
  echo "✅ Dossier du composant supprimé : $FULL_DIR_PATH"
fi

# Vérifier si le dossier Storybook est vide et le supprimer
if [ -d "$STORYBOOK_DIR_PATH" ] && [ -z "$(ls -A "$STORYBOOK_DIR_PATH")" ]; then
  rmdir "$STORYBOOK_DIR_PATH"
  echo "✅ Dossier Storybook supprimé : $STORYBOOK_DIR_PATH"
fi