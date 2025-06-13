<template>
  <section class="bg-white pb-20">
    <div class="flex flex-col-reverse items-center gap-10 md:flex-row">
      <!-- Left side -->
      <div class="w-full text-center md:w-1/2 md:text-left">
        <h1 class="text-4xl font-bold text-gray-900 md:text-5xl">
          {{ props.title }}
        </h1>
        <p class="text-lg mt-4 text-gray-600">
          {{ props.content }}
        </p>
        <div v-if="props.showButton" class="mt-6">
          <a
            :href="props.buttonLink"
            class="hover:bg-primary-600 inline-block rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white shadow transition"
          >
            {{ props.buttonLabel }}
          </a>
        </div>
      </div>

      <!-- Right side -->
      <div v-if="props.showImage" class="w-full md:w-1/2">
        <img :src="props.imageUrl" alt="Hero Image" class="w-full" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
/**
 * @description
 */
type FlapiHeroSectionProps = {
  title: string
  content: string
  imageUrl: string
  showImage: boolean
  showButton: boolean
  buttonLabel: string
  buttonLink: string
}

const props: FlapiHeroSectionProps = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  showImage: {
    type: Boolean,
    default: true,
  },
  showButton: {
    type: Boolean,
    default: true,
  },
  buttonLabel: {
    type: String,
    default: 'Learn More',
  },
  buttonLink: {
    type: String,
    default: '#',
  },
})
</script>
