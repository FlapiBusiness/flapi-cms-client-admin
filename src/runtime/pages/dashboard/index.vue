<template>
  <div v-for="(c, index) in cmsComponents" @dragover="onDragOver(index)">
    <!-- @mouseleave="closeContextMenu" -->

    <div
      @dragover.prevent
      @onDragLeave="onDragLeave"
      @drop="onDrop(index)"
      class="absolute inset-0 z-10"
      :class="[
        'group relative p-1 transition',
        hoveredIndex === index && hoveredIndex !== draggedIndex && draggedIndex !== null
          ? 'my-2 rounded border-2 border-blue-500 bg-blue-500'
          : '',
      ]"
    ></div>

    <component
      draggable="true"
      @dragover.prevent
      @dragstart="onDragStart(index)"
      @onDragLeave="onDragLeave"
      @contextmenu.prevent="onContextMenu($event, index)"
      @drop="onSlotDrop(index)"
      @mouseenter="hoveredIndex = index"
      @click="closeContextMenu"
      :class="[
        'rounded bg-gray-100 p-2 shadow-sm transition',
        hoveredIndex === index ? 'border-2 border-blue-500' : 'border border-gray-300',
      ]"
      :style="{ cursor: 'grab' }"
      :is="getComponentName(c.name)"
      v-bind="c.data.props"
    >
      <div v-for="slot in c.data.slots" :component="slot">
        <div v-if="!slot.components" class="m-1 rounded border border-gray-300 p-2 text-center text-gray-500">
          Composent déposable ici
        </div>
        <FlapiComponentRenderer :childComponents="slot.components ?? []" :edition="true" />
      </div>
    </component>
    <div
      @dragover.prevent
      @onDragLeave="onDragLeave"
      @drop="onDrop(index)"
      class="absolute inset-0 z-10"
      :class="[
        'group relative p-1 transition',
        hoveredIndex === index && hoveredIndex !== draggedIndex && draggedIndex !== null
          ? 'my-2 rounded border-2 border-blue-500 bg-blue-500'
          : '',
      ]"
    ></div>
  </div>

  <div
    v-if="contextMenu.index !== null"
    :style="{ position: 'fixed', top: contextMenu.y + 'px', left: contextMenu.x + 'px', zIndex: 1000 }"
    class="rounded border bg-gray-500 p-2 shadow"
  >
    <button
      class="block w-full rounded px-2 py-1 text-left text-sm font-medium text-light-400 hover:bg-gray-600"
      @click="removeComponent(contextMenu.index)"
    >
      Supprimer
    </button>
    <button
      class="block w-full rounded px-2 py-1 text-left text-sm font-medium text-light-400 hover:bg-gray-600"
      @click="updateCmsComponents(contextMenu.index)"
    >
      Modifier
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useCmsComponentStore } from '#cmsadmin/stores/cmsComponentStore'
import type { CmsComponentStore } from '#cmsadmin/stores/cmsComponentStore'
import { getComponentName } from '#cmsadmin/core/others/componentDisplayMap'
import FlapiComponentRenderer from '#cmsadmin/components/display/FlapiComponentRenderer.vue'

import type { Ref } from 'vue'
import { ref, onMounted } from 'vue'
import type { FlapiSlot } from '#cmsadmin/core/types/FlapiCmsComponent'

definePageMeta({
  layout: 'cms',
})

const cmsComponentStore: ReturnType<typeof useCmsComponentStore> = useCmsComponentStore()
const cmsComponents: Ref<CmsComponentStore[]> = ref(cmsComponentStore.components)

const hoveredIndex: Ref<number | null> = ref(null)
const draggedIndex: Ref<number | null> = ref(null)

const contextMenu: Ref = ref<{ x: number; y: number; index: number | null }>({ x: 0, y: 0, index: null })

onMounted(() => {
  const published: CmsComponentStore[] = localStorage.getItem('cmsComponents')
    ? JSON.parse(localStorage.getItem('cmsComponents') as string)
    : []

  cmsComponentStore.setCmsComponentStores(published)
  cmsComponents.value = published
})
/**
 * @param {number} index - The index of the component being dragged.
 * @returns {void}
 * @description This function sets the components in the store and local storage.
 */
const onDragStart: (index: number) => void = (index: number): void => {
  draggedIndex.value = index
}

/**
 * @param {number} dropIndex - The index where the component is dropped.
 * @returns {void}
 * @description This function handles the drop event and reorders the components.
 */
const onDrop: (dropIndex: number) => void = (dropIndex: number): void => {
  console.log('onDrop', dropIndex, draggedIndex)
  if (draggedIndex.value === null) return
  const items: CmsComponentStore[] = [...cmsComponents.value]
  const draggedItem: CmsComponentStore = items.splice(draggedIndex.value, 1)[0]
  items.splice(dropIndex, 0, draggedItem)

  // Réaffecte les ordres
  items.forEach((item: CmsComponentStore, index: number) => (item.order = index + 1))
  cmsComponents.value = items
  cmsComponentStore.setCmsComponentStores(items)

  hoveredIndex.value = null
  draggedIndex.value = null
}

/**
 * @param {number} index - The index of the component being dragged over.
 * @returns {void}
 * @description This function sets the hovered index when a component is dragged over.
 */
const onDragOver: (index: number) => void = (index: number): void => {
  hoveredIndex.value = index
}

/**
 * @returns {void}
 */
const onDragLeave: () => void = (): void => {
  hoveredIndex.value = null
}

/**
 * @param {number} index - The index of the slot where the component is dropped.
 * @returns {void}
 * @description This function handles the drop event for a slot and adds the component to the first slot of the component.
 */
const onSlotDrop: (index: number) => void = (index: number): void => {
  console.log('onSlotDrop', index)

  if (draggedIndex.value === index) {
    return
  }

  const component: CmsComponentStore = cmsComponents.value[index]
  if (!component.data.slots || component.data.slots.length === 0) {
    return
  }
  if (draggedIndex.value === null) return
  const firstSlot: FlapiSlot = component.data.slots[0]
  firstSlot.components = firstSlot.components || []
  firstSlot.components.push(cmsComponents.value[draggedIndex.value].data)
  cmsComponents.value.splice(draggedIndex.value, 1)
  cmsComponents.value.forEach((item: CmsComponentStore, i: number) => (item.order = i + 1))
  cmsComponentStore.setCmsComponentStores(cmsComponents.value)
}

/**
 * @param {number} index - The index of the component being dragged over.
 * @returns {void}
 */
const removeComponent: (index: number) => void = (index: number): void => {
  cmsComponents.value.splice(index, 1)
  cmsComponents.value.forEach((item: CmsComponentStore, i: number) => (item.order = i + 1))
  cmsComponentStore.setCmsComponentStores(cmsComponents.value)
  closeContextMenu()
}

/**
 * @param {number} index - The index of the component to update.
 * @returns {void}
 * @description This function sets the current component in the store and opens the modal for editing.
 */
const updateCmsComponents: (index: number) => void = (index: number): void => {
  // TODO: Implement the logic to update the component
  const currentComponent: CmsComponentStore = cmsComponents.value[index]
  cmsComponentStore.updateCmsComponentStore(currentComponent)
  closeContextMenu()
}

/**
 * @param {MouseEvent} event - The mouse event that triggered the context menu.
 * @param {number} index - The index of the component for which the context menu is opened.
 * @returns {void}
 * @description This function opens a context menu at the position of the mouse event.
 */
const onContextMenu: (event: MouseEvent, index: number) => void = (event: MouseEvent, index: number): void => {
  event.preventDefault()
  contextMenu.value = {
    x: event.clientX,
    y: event.clientY,
    index: index,
  }
}

/**
 * @returns {void}
 * @description This function closes the context menu.
 */
const closeContextMenu: () => void = (): void => {
  contextMenu.value.index = null
  contextMenu.value.x = 0
  contextMenu.value.y = 0
}
</script>
