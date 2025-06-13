<template>
  <div v-for="(childComponent, index) in childComponents" :key="index">
    <component :is="getComponentName(childComponent.name)" v-bind="childComponent.props">
      <div v-if="childComponent.slots && childComponent.slots.length > 0">
        <div v-for="slot in childComponent.slots">
          <div
            v-if="!slot.components && edition && !slot.text"
            class="m-1 rounded border border-gray-300 p-2 text-gray-500"
          >
            Composent déposable ici
          </div>
          <div v-if="slot.text">
            {{ slot.text }}
          </div>
          <FlapiComponentRenderer :childComponents="slot?.components ?? []" :edition="edition">
          </FlapiComponentRenderer>
        </div>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
// import { defineAsyncComponent } from 'vue'
import { getComponentName } from '#cmsadmin/core/others/componentDisplayMap'
import type { FlapiCmsComponent } from '#cmsadmin/core'

/**
 * @description
 * FlapiComponentRendererProps represents the props for the FlapiComponentRenderer component.
 * @property {FlapiCmsComponent} component - The component to render.
 */
export type FlapiComponentRendererProps = {
  childComponents: FlapiCmsComponent[]
  edition?: boolean
}

defineProps({
  childComponents: {
    type: Object as () => FlapiCmsComponent[],
    required: true,
  },
  edition: {
    type: Boolean,
    default: false,
  },
})
</script>
