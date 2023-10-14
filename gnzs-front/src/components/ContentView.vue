<template>
    <div class="content">
      <ul class="tiles">
        <li v-for="content in reversedData" :key="content.id">
          <p><strong>Имя:</strong> {{ content.name }}</p>
          <p><strong>Идентификатор:</strong> {{ content.id }}</p>
        </li>
      </ul>
    </div>
  </template>

<script>
import { computed } from 'vue';
import useDataStore from '../store';

export default {
  setup() {
    const store = useDataStore();
    const recivedData = computed(() => store.recivedData);
    const reversedData = computed(() => [...recivedData.value].reverse());

    return {
      reversedData,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/ContentView.scss';
</style>
