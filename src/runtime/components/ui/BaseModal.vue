<template>
  <Transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative w-fit rounded-2xl bg-gray-700 p-6 shadow-xl" @click.stop>
        <button
          @click="$emit('update:modelValue', false)"
          class="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <span class="sr-only">Close modal</span>
          ✕
        </button>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

/**
 * BaseModalProps represents the props for the BaseModal component.
 * @property {boolean} modelValue - The visibility state of the modal.
 */
export type BaseModalProps = {
  modelValue: boolean
}

const props: BaseModalProps = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit: (event: 'update:modelValue', value: boolean) => void = defineEmits(['update:modelValue'])

/**
 * @param {KeyboardEvent} e - The keyboard event.
 */
const handleKeyDown: (e: KeyboardEvent) => void = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('update:modelValue', false)
  }
}

watch(
  () => props.modelValue,
  (isOpen: boolean) => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
