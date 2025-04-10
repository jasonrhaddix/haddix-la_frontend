<template>
    <div class="create-language-item">
        <div class="language__graph">
          <language-graph
            :value="localValue"
            :language="langName"/>
        </div>
        <div class="language__content">
          <div class="content__inner">
            <div class="content__type">
              <v-select
                filled dense
                label="Language"
                item-text="name"
                :items="propsStore.projectLanguages"
                v-model="localLang"/>
            </div>
            <div class="content__percentage">
              <v-text-field
                filled dense
                label="Percentage"
                min="0"
                max="100"
                type="number"
                v-model="localValue"
                />
            </div>
            <div class="content__actions">
              <v-btn
                icon small
                color="primary"
                @click="remove">
                <v-icon>remove</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  
  import stores from '@/stores/index.js'

  import LanguageGraph from '@/components/_global/Language_Graph.vue'

  const propsStore = stores.config.propsStore()

  const emit = defineEmits(['valueChanged', 'remove'])

  const props = defineProps({
    id: {
      type: String,
      required: true
    },

    value: {
      type: [String, null],
      required: false
    },

    language: {
      type: [String, null],
      required: false
    }
  })

  let localLang = ref('')
  let localValue = ref('0')

  const langName = computed(() => {
    if (!localLang.value) return ''
    return propsStore.getPropertyByKey('projectLanguages', localLang.value, 'value', 'title')
  })

  const emitData = () => {
    emit('valueChanged', {
      id: props.id,
      language: localLang.value,
      value: localValue.value
    })
  }

  const remove = () =>{
    emit('remove', props.id)
  }

  // Watch and emit
  watch(localLang, (value) => {
    emitData()
  })

  watch(localValue, (value) => {
    emitData()
  })
</script>
