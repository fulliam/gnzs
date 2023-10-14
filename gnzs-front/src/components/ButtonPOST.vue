<template>
    <button
      class="send-button"
      :disabled="menuData === 'none'"
      @click="sendDataToServer"
    >
      <span v-if="loading">
        <i id=loader ></i>
      </span>
      <span v-if="!loading">
        Сохранить
      </span>
    </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';

type CallbackFunction = (data: any) => void;

@Options({
  props: {
    menuData: {
      type: String,
      default: 'Не выбрано',
    },
  },
})

export default class ButtonPOST extends Vue {
    menuData!: string;

    loading = false;

    async sendDataToServer(): Promise<void> {
      const url = 'http://localhost:3000';

      try {
        this.loading = true;
        const response = await axios.post(url, { data: this.menuData });
        this.$emit('responseReceived', response.data);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/ButtonPOST.scss';
@import '../assets/styles/Loader.scss';
</style>
