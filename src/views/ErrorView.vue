<template>
  <div class="alert alert-danger">
    <h1>Oops!</h1>
    An unexpected error occurred. please try again later.
    <template v-if="isError">
      <p class="mb-0 mt-3">
        Error Message:<br />
        <i><strong>{{ isError }}</strong></i>
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { storeToRefs } from 'pinia'

const errorStore = useErrorStore()
const { isError } = storeToRefs(errorStore)
</script>

<style></style>
