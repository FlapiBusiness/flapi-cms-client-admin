<template>
  <label
    class="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-2 border-transparent bg-gray-400 text-white focus-within:border-primary-400 hover:border-light-300"
  >
    <input type="checkbox" class="peer sr-only" v-model="checked" @change="updateValue" />
    <div
      class="pointer-events-none scale-50 text-3xl opacity-0 transition-transform duration-200 peer-checked:scale-100 peer-checked:opacity-100"
    >
      ✓
    </div>
  </label>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

/* PROPS */
const props: {
  modelValue: boolean
} = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
/* EMITS */

/**
 * This is the model value for the select field.
 * @property {string} label - The label of the component.
 * @property {string} type - The type of the component.
 */
const emit: (event: 'update:modelValue', value: boolean) => void = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()
/* STATE */
const checked: Ref<boolean> = ref(props.modelValue)

/* METHODS */

/**
 * This method is called when the checkbox is checked or unchecked.
 * It emits the updated value to the parent component.
 * @returns {void}
 */
const updateValue: () => void = () => {
  emit('update:modelValue', checked.value)
}
/* SYNC PROP <-> LOCAL STATE */
watch(
  () => props.modelValue,
  (val: boolean) => {
    checked.value = val
  },
)
</script>
