<template>
  <div class="tab-system">
    <div class="tab-header">
      <button 
        v-for="(tab, index) in tabs" 
        :key="tab.id"
        class="tab-button"
        :class="{ active: activeTab === index }"
        @click="selectTab(index)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-content">
      <slot name="tab-content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabSystem',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:activeTab'],
  setup(props, { emit }) {
    const selectTab = (index: number) => {
      emit('update:activeTab', index);
    };

    return {
      selectTab
    };
  }
});
</script>

<style scoped>
.tab-system {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tab-header {
  display: flex;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.tab-button {
  padding: 12px 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #6c757d;
  transition: all 0.2s ease;
}

.tab-button:hover {
  background-color: #e9ecef;
}

.tab-button.active {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
  background-color: white;
}

.tab-content {
  padding: 20px;
}
</style>
