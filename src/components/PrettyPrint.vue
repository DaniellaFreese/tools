<template>
  <div class="pretty-print">
    <div class="form-section">
      <h2>JSON Pretty Print</h2>
      <p>Paste your JSON below to format it nicely.</p>
      
      <div class="form-group">
        <label for="json-input">JSON Input</label>
        <textarea 
          id="json-input"
          v-model="jsonInput"
          placeholder="Paste your JSON here..."
          rows="10"
          @input="clearResults"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="spaces">Indentation Spaces</label>
        <select id="spaces" v-model="spaces">
          <option value="2">2 spaces</option>
          <option value="4">4 spaces</option>
          <option value="6">6 spaces</option>
          <option value="8">8 spaces</option>
        </select>
      </div>
      
      <button @click="formatJson" class="format-button" :disabled="isLoading">
        {{ isLoading ? 'Formatting...' : 'Format JSON' }}
      </button>
    </div>
    
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
    
    <div v-if="formattedJson" class="result-section">
      <div class="result-header">
        <h3>Formatted JSON</h3>
        <button @click="copyToClipboard" class="copy-button">
          {{ isCopied ? 'Copied!' : 'Copy to Clipboard' }}
        </button>
      </div>
      <pre class="json-output"><code>{{ formattedJson }}</code></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PrettyPrint',
  setup() {
    const jsonInput = ref('');
    const formattedJson = ref('');
    const errorMessage = ref('');
    const spaces = ref(2);
    const isLoading = ref(false);
    const isCopied = ref(false);
    
    const clearResults = () => {
      formattedJson.value = '';
      errorMessage.value = '';
    };
    
    const formatJson = async () => {
      if (!jsonInput.value.trim()) {
        errorMessage.value = 'Please enter some JSON to format';
        return;
      }
      
      isLoading.value = true;
      errorMessage.value = '';
      formattedJson.value = '';
      
      try {
        // Use absolute URL to make sure we're hitting the correct endpoint
        const apiUrl = 'https://workers-playground-odd-tree-ae8d.daniella-freese.workers.dev/api/format-json';
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            json: jsonInput.value,
            spaces: parseInt(spaces.value.toString())
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          formattedJson.value = data.result;
        } else {
          errorMessage.value = data.message || data.error || 'An error occurred';
        }
      } catch (error) {
        errorMessage.value = 'Failed to connect to the server';
        console.error('Error formatting JSON:', error);
      } finally {
        isLoading.value = false;
      }
    };
    
    const copyToClipboard = () => {
      if (!formattedJson.value) return;
      
      navigator.clipboard.writeText(formattedJson.value)
        .then(() => {
          isCopied.value = true;
          setTimeout(() => {
            isCopied.value = false;
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    };
    
    return {
      jsonInput,
      formattedJson,
      errorMessage,
      spaces,
      isLoading,
      isCopied,
      clearResults,
      formatJson,
      copyToClipboard
    };
  }
});
</script>

<style scoped>
.pretty-print {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section, .result-section {
  background-color: white;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  resize: vertical;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.format-button {
  padding: 10px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.format-button:hover {
  background-color: #1e2a36;
}

.format-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px 15px;
  border-radius: 4px;
  border-left: 4px solid #f5c6cb;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.copy-button {
  padding: 6px 12px;
  background-color: #e9ecef;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover {
  background-color: #dee2e6;
}

.json-output {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 15px;
  white-space: pre-wrap;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  max-height: 500px;
  overflow-y: auto;
}
</style>