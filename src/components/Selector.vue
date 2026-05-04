<template>
<div class="selector">
  <div class="selector-option" v-for="option in options" :class="{selected: modelValue === option, 'with-icon': option.icon}" @click="$emit('update:model-value', option)">
    <span class="material-icons" v-if="option.icon">{{ option.icon }}</span>
    <div class="so-label">{{ option.label }}</div>
  </div>
</div>
</template>

<script>
export default {
  emits: ['update:model-value'],
  props: {
    modelValue: Object,
    options: Array
  }
}
</script>

<style>
.selector {
  display: flex;
  gap: 1dvh;
  color: #727272;
  justify-content: stretch;
  .selector-option {
    font-size: 1.5dvh;
    border-radius: 1dvh;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5dvh;
    &.selected {
      color: #dddddd;
      background: #6552d6;
    }
    &.with-icon {
      border: 1px solid #727272;
      &.selected {
        border-color: #6552d6;
      }
    }
  }
}
</style>