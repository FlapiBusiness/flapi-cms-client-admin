<template>
  <div>
    <component
      v-for="(component, index) in components"
      :key="index"
      :is="getComponentName(component.name)"
      v-bind="component.data.props"
    >
      <div v-for="slot in component.data.slots" :component="slot">
        <FlapiComponentRenderer :childComponents="slot.components ?? []" />
      </div>
    </component>
  </div>
</template>

<script lang="ts" setup>
import type { CmsComponentStore } from '#cmsadmin/stores/cmsComponentStore'
import { getComponentName } from '#cmsadmin/core/others/componentDisplayMap'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const components: Ref<CmsComponentStore[]> = ref([])

onMounted(() => {
  if (typeof window !== 'undefined') {
    components.value = localStorage.getItem('cmsComponents')
      ? JSON.parse(localStorage.getItem('cmsComponents') as string)
      : []
  }
})
</script>
