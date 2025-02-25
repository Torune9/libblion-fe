import { defineStore } from 'pinia';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue3-toastify';

export const useBookCrudStore = defineStore('bookCrud', {
  state: () => ({
    books: null,
    isLoading: false,
    error: null,
    detailBook: {},
  }),

  actions: {
    async fetchBooks() {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      try {
        const response = await api.get('/books', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        const { data } = response.data;

        this.books = {
          data: data.map((book) => ({
            ...book,
            author: book.author
              ? `${book.author.first_name} ${book.author.last_name}`
              : 'Unknown Author',
            category: book.category ? book.category.name : 'Unknown Category',
          })),
        };

        return response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch books';
        toast.error(this.error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async addBook(payload) {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      try {
        const response = await api.post('/books', payload, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data) {
          if (!Array.isArray(this.books?.data)) {
            this.books = { data: [] };
          }

          this.books.data.push({
            ...response.data,
            author: response.data.author
              ? `${response.data.author.first_name} ${response.data.author.last_name}`
              : 'Unknown Author',
            category: response.data.category
              ? response.data.category.name
              : 'Unknown Category',
          });

          toast.success(response.data?.message || 'Book added successfully!');
        }
        return response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Failed to add book';
        toast.error(this.error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateBook(id, payload) {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      try {
        const response = await api.put(`/books/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (Array.isArray(this.books?.data)) {
          const index = this.books.data.findIndex((book) => book.id === id);
          if (index !== -1) {
            this.books.data[index] = response.data;
          }
        } else {
          this.books = { data: [response.data] };
        }

        const message = response.data?.message || 'Book updated successfully!';
        toast.success(message);
        return response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Failed to update book';
        toast.error(this.error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteBook(id) {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      try {
        const response = await api.delete(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        if (Array.isArray(this.books?.data)) {
          this.books.data = this.books.data.filter((book) => book.id !== id);
          const message =
            response.data?.message || 'Book deleted successfully!';
          toast.success(message);
        }
        return response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Failed to delete book';
        toast.error(this.error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async getDetailBook(id) {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();

      try {
        const response = await api.get(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        this.detailBook = response.data;
        return response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch book details';
        toast.error(this.error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },

  getters: {
    getAllBooks: (state) => state.books?.data || [],
    getBookDetail: (state) => state.detailBook,
  },

  persist: {
    paths: ['books', 'detailBook'],
  },
});
