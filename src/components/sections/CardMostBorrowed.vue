<template>
  <div
    class="flex flex-col sm:flex-row items-center bg-gray-200 rounded-lg shadow-md overflow-hidden"
  >
    <!-- Book Cover -->
    <img
      :src="image"
      alt="Book Cover"
      class="w-full sm:w-1/3 h-full object-cover"
    />

    <!-- Detail -->
    <div class="w-full sm:w-3/4 p-4 text-center sm:text-left">
      <h3 class="text-xl font-semibold md:mb-2  dark:text-black">{{ bookName }}</h3>
      <p class="text-sm text-gray-700">By: {{ `${author.first_name} ${author.last_name}` }}</p>

      <!-- Rating -->
      <div class="flex justify-center sm:justify-start">
        <span v-for="n in 5" :key="n" class="text-lg">
          <span v-if="n <= rating" class="text-yellow-500">★</span>
          <span v-else class="text-gray-400">☆</span>
        </span>
      </div>

      <button
        class="mt-3 bg-black text-white px-4 py-2 rounded-sm cursor-pointer" @click="detailBooks(books)"
      >
        Borrow
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: String,
  bookName: String,
  author: {},
  rating: Number,
});
import { useStore } from '@/stores/util'
import { computed } from 'vue';

const store = useStore()

const detailBooks = store.detailBooks

const books = computed (()=>({
  title : props.bookName,
  cover : props.image,
  author : props.author
}))

</script>
