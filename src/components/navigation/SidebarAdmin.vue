<template>
  <div class="px-4 h-full text-white flex flex-col gap-y-20">
    <header class="mt-[60px]">
      <div
        class="w-full h-12 rounded-full bg-whit flex flex-row bg-white items-center gap-x-2 justify-between"
      >
        <figure class="w-12 h-full rounded-full overflow-hidden">
          <img :src="profileImg" alt="profile-image" />
        </figure>
        <p class="text-black">
          {{ user.currentUser.username.length > 11 ? `${user.currentUser.username}...` : user.currentUser.username }}
        </p>
        <button
          class="text-black w-12 h-full rounded-full cursor-pointer hover:bg-slate-50 -rotate-45"
        >
          <font-awesome-icon icon="fa-solid fa-sort-down" />
        </button>
      </div>
    </header>
    <main class="w-full flex flex-col justify-between h-full">
      <ul class="w-full flex flex-col gap-y-2 border-l px-2 border-white/30">
        <RouterLink
          v-for="menu in menus"
          :to="menu.route"
          activeClass="before:border-l before:absolute before:w-10 before:h-full before:-left-[9px] before:border-white text-white before:top-0 text-white"
          class="hover:text-white/50 transition-colors duration-200 p-1 relative"
        >
          <li class="w-full flex flex-row items-center gap-x-2 pl-2">
            <font-awesome-icon :icon="menu.icon" />
            <p>{{ menu.name }}</p>
          </li>
        </RouterLink>
      </ul>
      <RouterLink to="/" class="border-b cursor-pointer mb-4 hover:text-white/50 transition-colors duration-200 text-center p-2">
        <font-awesome-icon icon="fa-solid fa-house"/> <span>Home</span>
      </RouterLink>
    </main>
  </div>
</template>

<script setup>
  import profileImg from '@/assets/images/profile/laravel.jpg';
import { useAuthStore } from '@/stores/auth';
  const user = useAuthStore()
  const menus = [
    {
      name: 'Dashboard',
      icon: 'fa-solid fa-chart-column',
      route: '/admin/dashboard',
    },

    {
      name: 'Borrow List',
      icon: 'fa-solid fa-table-list',
      route: '/admin/borrowing-list',
    },

    {
      name: 'Book',
      icon: 'fa-solid fa-book',
      route: '/admin/book-list',
    },

    {
      name: 'Author',
      icon: 'fa-solid fa-user',
      route: '/admin/author-list',
    },

    {
      name: 'Category',
      icon: 'fa-solid fa-tags',
      route: '/admin/category',
    },
  ];
</script>
