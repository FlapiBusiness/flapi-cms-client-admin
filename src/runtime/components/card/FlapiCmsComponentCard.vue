<template>
  <div
    class="flex h-[170px] w-[170px] cursor-pointer flex-col items-start justify-center rounded-2xl border-[3px] border-transparent bg-gray-300 p-4 transition hover:border-primary-300"
    @click="emit('select', props)"
  >
    <div class="flex w-full flex-col items-center">
      <img v-if="props.imageUrl" :src="props.imageUrl" :alt="props.name" />
      <p class="mt-4 text-center text-base font-semibold text-light-400">
        {{ props.name }}
      </p>
    </div>

    <!--    <div-->
    <!--      class="pointer-events-none absolute -top-2 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100"-->
    <!--    >-->
    <!--      <div class="min-w-[200px] max-w-xs rounded-md bg-gray-800 p-3 text-sm text-white shadow-lg">-->
    <!--        <div class="space-y-2">-->
    <!--          <p v-if="props.category" class="font-medium"><span class="font-bold">Category:</span> {{ props.category }}</p>-->

    <!--          <p v-if="props.description" class="text-gray-300">-->
    <!--            {{ props.description }}-->
    <!--          </p>-->

    <!--          <div v-if="props.props?.length" class="pt-2">-->
    <!--            <p class="font-bold">Props ({{ props.props.length }}):</p>-->
    <!--            <ul class="list-inside list-disc pl-2">-->
    <!--              <li v-for="prop in props.props" :key="prop.name" class="text-gray-300">-->
    <!--                {{ prop.name }}-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->

    <!--          <div v-if="props.slots?.length" class="pt-2">-->
    <!--            <p class="font-bold">Slots ({{ props.slots.length }}):</p>-->
    <!--            <ul class="list-inside list-disc pl-2">-->
    <!--              <li v-for="slot in props.slots" :key="slot.name" class="text-gray-300">-->
    <!--                {{ slot.name }}-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->

    <!--          <div v-if="props.events?.length" class="pt-2">-->
    <!--            <p class="font-bold">Events ({{ props.events.length }}):</p>-->
    <!--            <ul class="list-inside list-disc pl-2">-->
    <!--              <li v-for="event in props.events" :key="props.name" class="text-gray-300">-->
    <!--                {{ event }}-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
import type { FlapiSlot, FlapiEvent } from '#cmsadmin/core/types/FlapiCmsComponent'
import type { PropType } from 'vue'
/**
 * @description
 * This is the model value for the Flapi CMS component card.
 * @property {string} name - The name of the component.
 * @property {string} description - The description of the component.
 * @property {Record<string, any>} [props] - The props of the component.
 * @property {string} category - The category of the component.
 * @property {FlapiSlot[]} [slots] - The slots of the component.
 * @property {FlapiEvent[]} [events] - The events of the component.
 */
export type FlapiCmsComponentCardProps = {
  name: string
  description: string
  props?: Record<string, any>
  category: string
  slots?: FlapiSlot[]
  events?: FlapiEvent[]
  imageUrl?: string
}

const props: FlapiCmsComponentCardProps = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  props: {
    type: Array as PropType<Record<string, any>>,
    /**
     * The default value for the props property.
     * @returns {Record<string, any>} Prop[]
     */
    default: (): Record<string, any> => [],
  },
  category: {
    type: String,
    required: true,
  },
  slots: {
    type: Array as PropType<FlapiSlot[]>,
    /**
     * The default value for the slots property.
     * @returns {FlapiSlot[]} Slot[]
     */
    default: (): FlapiSlot[] => [],
  },
  events: {
    type: Array as PropType<FlapiEvent[]>,
    /**
     * The default value for the events property.
     * @returns {FlapiEvent[]} Event[]
     */
    default: (): Event[] => [],
  },
  imageUrl: {
    type: String,
    default: null,
  },
})

const emit: (event: 'select', component: FlapiCmsComponentCardProps) => void = defineEmits<{
  (event: 'select', component: FlapiCmsComponentCardProps): void
}>()
</script>
