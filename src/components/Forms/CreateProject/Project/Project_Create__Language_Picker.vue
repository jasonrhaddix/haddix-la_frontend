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
        v-for="(item, i) in model"
        :key="`language-item-${item.id}-${i})`"
        v-bind="item"
        @value-changed="updateLanguage"
        @remove="removeLanguage"
      />
    </div>

  </div>
</template>

<script setup>
  import shortid from 'shortid'

  import CreateLanguageItem from './Project_Create__Language_Item.vue';

  import { computed, ref, watch } from 'vue'

  const emit = defineEmits(['update:modelValue'])

  const model = ref([])

  const addLanguage = () => {
    model.value.push({
      id: shortid.generate(),
      value: '0',
      language: ''
    })
  }
  
  const updateLanguage = (data) => {
    const index = model.value.findIndex(item => item.id === data.id)
    
    if (index !== -1) {
      model.value[index] = data
    }
  }

  const removeLanguage = (id) => {
    const index = model.value.findIndex(item => item.id === id)
    
    if (index !== -1) {
      model.value.splice(index, 1)
    }
  }

  watch(model, (value) => {
    emit('update:modelValue', value)
  }, { deep: true })

</script>