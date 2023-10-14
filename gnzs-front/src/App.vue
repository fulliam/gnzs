<template>
  <img src="./assets/logo.svg" alt="logo">
  <div class="tool-bar">
    <DropdownMenu
      :options="Object.keys(entityOptions)"
      placeholder="Не выбрано"
      @select="selectEntity"
    />
    <ButtonPOST
      :menuData="entityOptions[selectedEntity]"
      @responseReceived="handleResponse"
    />
  </div>
  <ContentView />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import useDataStore from './store';
import DropdownMenu from './components/DropdownMenu.vue';
import ButtonPOST from './components/ButtonPOST.vue';
import ContentView from './components/ContentView.vue';

@Options({
  components: {
    DropdownMenu,
    ButtonPOST,
    ContentView,
  },
  data() {
    return {
      entityOptions: {
        'Не выбрано': 'none',
        Сделка: 'leads',
        Контакт: 'contacts',
        Компания: 'companies',
      },
      selectedEntity: 'Не выбрано',
    };
  },
  methods: {
    selectEntity(option: string) {
      this.selectedEntity = option;
    },
    handleResponse(responseData: any) {
      const entity = this.entityOptions[this.selectedEntity];
      const content = responseData[entity];

      const store = useDataStore();
      const data = content.map((item: any) => ({ ...item, name: this.selectedEntity }));
      store.setRecivedData([...store.recivedData, ...data]);
    },
    loadData() {
      const store = useDataStore();
      store.loadReceivedData();
    },
  },
  mounted() {
    this.loadData();
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './assets/styles/App.scss';
</style>
