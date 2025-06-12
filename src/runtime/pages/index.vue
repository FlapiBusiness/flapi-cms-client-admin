<template>
  <div>
    <component
      v-for="(component, index) in components"
      :key="index"
      :is="getComponentName(component.name)"
      v-bind="component.data.props"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CmsComponentStore } from '#cmsadmin/stores/cmsComponentStore'
import { getComponentName } from '#cmsadmin/components/sections/componentDisplayMap'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const components: Ref<CmsComponentStore[]> = ref([])

// /**
//  * @param {string} name - The name of the component.
//  * @returns {string} The display name of the component.
//  * @description This function retrieves the display name of a component based on its name.
//  */
// const getComponentName: (name: string) => string = (name: string): string => {
//   return componentDisplayMap[name] || name
// }

onMounted(() => {
  if (typeof window !== 'undefined') {
    components.value = localStorage.getItem('cmsComponents')
      ? JSON.parse(localStorage.getItem('cmsComponents') as string)
      : []
  }
})
</script>
