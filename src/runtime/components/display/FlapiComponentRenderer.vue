<template>
  <div v-for="(childComponent, index) in childComponents" :key="index">
    <component :is="getComponentName(childComponent.name)" v-bind="childComponent.props">
      <div v-if="childComponent.slots && childComponent.slots.length > 0">
        <div v-for="slot in childComponent.slots">
          {{ slot.name }} <br />
          <FlapiComponentRenderer :childComponents="slot?.components ?? []"> </FlapiComponentRenderer>
        </div>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
// import { defineAsyncComponent } from 'vue'
import { getComponentName } from '#cmsadmin/core/others/componentDisplayMap'
import type { FlapiCmsComponent } from '#cmsadmin/core'
import { onMounted } from 'vue'

/**
 * @description
 * FlapiComponentRendererProps represents the props for the FlapiComponentRenderer component.
 * @property {FlapiCmsComponent} component - The component to render.
 */
export type FlapiComponentRendererProps = {
  childComponents: FlapiCmsComponent[]
}

const props: FlapiComponentRendererProps = defineProps({
  childComponents: {
    type: Object as () => FlapiCmsComponent[],
    required: true,
  },
})

onMounted(() => {
  // This is where you can perform any setup or initialization for the component
  console.log('FlapiComponentRenderer mounted with component:', JSON.stringify(props.childComponents, null, 2))
})
</script>
