<template>
  <footer class="bg-gray-800 py-8 text-white">
    <div class="flex flex-col justify-around px-4 sm:flex-row">
      <div class="mb-4 flex items-center gap-2 sm:mb-0">
        <div class="mb-4 text-center sm:mb-0 sm:text-left">
          <h2 class="text-xl font-semibold">Flapi CMS</h2>
          <p class="text-sm text-gray-400">© {{ currentYear }} Tous droits réservés</p>
        </div>
      </div>

      <div v-for="(item, index) in props.items" :key="index" class="flex flex-col gap-4">
        <FlapiLabel :id="item.title.toLowerCase().replace(/\s+/g, '-') + '-label'">
          {{ item.title }}
        </FlapiLabel>
        <NuxtLink
          v-for="(subItem, subIndex) in item['sub-items']"
          :key="subIndex"
          :to="subItem.link"
          class="text-sm text-gray-300 hover:text-white"
        >
          {{ subItem['sub-title'] }}
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

/**
 * @param items - Array of footer items
 */
export type FlapiFooterProps = {
  title: string
  items: FooterItem[]
}
/**
 * @description
 * FooterItem represents a sub-item in the footer with a link and title.
 */
export type FooterItem = {
  title: string
  'sub-items': { link: string; 'sub-title': string }[]
}

const props: FlapiFooterProps = defineProps({
  items: {
    type: Array as () => FooterItem[],
    required: true,
  },
  title: {
    type: String,
    default: 'Flapi CMS',
  },
})

const currentYear: number = new Date().getFullYear()
</script>
