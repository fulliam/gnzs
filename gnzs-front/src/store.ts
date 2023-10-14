import { defineStore } from 'pinia';

const useDataStore = defineStore('data', {
  state: () => ({
    recivedData: [],
  }),
  actions: {
    setRecivedData(data: any) {
      this.recivedData = data;
      localStorage.setItem('recivedData', JSON.stringify(data));
    },
    loadReceivedData() {
      const storedData = localStorage.getItem('recivedData');
      if (storedData) {
        this.recivedData = JSON.parse(storedData);
      }
    },
  },
});

export default useDataStore;
