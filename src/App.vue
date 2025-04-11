<template>
  <div class="app">
    <header>
      <h1>JSON Tools</h1>
    </header>
    <main>
      <TabSystem :tabs="tabs" v-model:activeTab="activeTab">
        <template v-slot:tab-content>
          <component :is="tabs[activeTab].component" />
        </template>
      </TabSystem>
    </main>
    <footer>
      <p>&copy; {{ new Date().getFullYear() }} - JSON Tools</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TabSystem from './components/TabSystem.vue';
import PrettyPrint from './components/PrettyPrint.vue';

interface Tab {
  id: string;
  label: string;
  component: any;
}

export default defineComponent({
  name: 'App',
  components: {
    TabSystem,
    PrettyPrint
  },
  setup() {
    const tabs = ref<Tab[]>([
      {
        id: 'pretty-print',
        label: 'Pretty Print',
        component: PrettyPrint
      }
      // Additional tabs can be added here in the future
    ]);
    
    const activeTab = ref(0);
    
    return {
      tabs,
      activeTab
    };
  }
});
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  color: #333;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}
</style>
