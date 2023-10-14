<template>
  <div class="dropdown" ref="dropdown">
    <button class="toggle" @click="isOpen = !isOpen">
      {{ selectedOption || placeholder }}
    </button>

    <ul v-show="isOpen" class="options">
      <li
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
        @keydown.e="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Не выбрано',
    },
  },
})
export default class DropdownMenu extends Vue {
  isOpen = false;

  selectedOption = '';

  selectOption(option: string): void {
    this.selectedOption = option;
    this.isOpen = false;
    this.$emit('select', option);
  }

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  }

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = this.$refs.dropdown as HTMLElement;

    if (!dropdown.contains(target)) {
      this.isOpen = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/DropdownMenu.scss';
</style>
