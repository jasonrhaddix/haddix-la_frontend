<template>
  <div class="language__picker">
    
    <div :ripple="false" class="language__add-button" @click="addLanguage">
      <div class="button__content">
        <p class="subheading">Add Language</p>
        <v-icon color="grey darken-1">add</v-icon>
      </div>
    </div>
    
    <div class="language__list">
      <CreateLanguageItem
        v-for="(item, i) in selectedLanguages"
        :key="`language-item-${item.id}-${i})`"
        v-bind="item"
        @value-changed="updateLanguage"
        @remove="removeLanguage"
      />
    </div>

  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import shortid from 'shortid'

  import CreateLanguageItem from './Project_Create__Language_Item.vue';

	const modelValue = defineModel()
  const selectedLanguages = ref([])

  const addLanguage = () => {
    selectedLanguages.value.push({
      id: shortid.generate(),
      value: '0',
      language: ''
    })
  }
  
  const updateLanguage = (data) => {
    const index = selectedLanguages.value.findIndex(item => item.id === data.id)
    
    if (index !== -1) {
      selectedLanguages.value[index] = data
    }
  }

  const removeLanguage = (id) => {
    const index = selectedLanguages.value.findIndex(item => item.id === id)
    
    if (index !== -1) {
      selectedLanguages.value.splice(index, 1)
    }
  }

  watch(modelValue, (value) => {
		selectedLanguages.value = value
	})

  watch(selectedLanguages, (value) => {
    modelValue.value = value
  }, { deep: true })

</script>