<template>
    <div class="create-resource-picker">
        <v-row class="picker__inner">
            
					<v-col class="col-12 col-md-6 list options-list">
                <h3 class="body-1">Options</h3>
                <div class="list-content">
									<div
										:ripple="false"
										v-for="(item,i) in optionsList"
										:key="`list-item-${i}`"
										:id="i"
										class="list-item"
										@click="itemClick(item.value)">
										<p>{{ item.title }}</p>
									</div>
                </div>
            </v-col>
            
						<v-col class="col-12 col-md-6 list selected-list">
                <h3 class="body-1">Selected</h3>
                <div class="list-content">
									<div
										:ripple="false"
										v-for="(item,i) in selectedList"
										:key="`list-item-${i}`"
										:id="i"
										class="list-item"
										@click="itemClick(item.value)">
										<p>{{ item.title }}</p>
									</div>
                </div>
            </v-col>

        </v-row>
    </div>
</template>

<script setup>
	import { defineProps, ref, onMounted, computed, watch } from 'vue'

	import stores from '@/stores'

	const propsStore = stores.config.propsStore()

	const props = defineProps({
		/* itemsSelectedCallback: {
			type: [Function, Promise],
			required: false,
			default: null
		} */
	})

	const modelValue = defineModel()
	const optionItems = ref([])
	const selectedItems = ref([])

	const optionsList = computed(() => {
		return optionItems.value.filter(item => !selectedItems.value.includes(item.value)).sort((a, b) => a.value - b.value)
	})

	const selectedList = computed(() => {
		return optionItems.value.filter(item => selectedItems.value.includes(item.value)).sort((a, b) => a - b)
	})

	onMounted(() => {
		optionItems.value = JSON.parse(JSON.stringify(propsStore.projectResources))
	})

	const itemClick = (value) => {
		const index = selectedItems.value.indexOf(value)

		if (index === -1) {
			// Not in selectedItems: move it from optionsList to selectedList
			selectedItems.value.push(value)
		} else {
			// Already selected: remove it (moves it back to optionsList)
			selectedItems.value.splice(index, 1)
		}
	}

	watch(modelValue, (value) => {
		console.lo
		selectedItems.value = value
	})

	watch(selectedItems, (value) => {
		modelValue.value = value
	})

</script>