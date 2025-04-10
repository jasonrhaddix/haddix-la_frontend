

<template>
	<div class="photo-viewer">
		<img :src="selectedImage"/>
	</div>
</template>

<script setup>
	import { defineProps, computed } from 'vue'

	import placeholderImg from '@/assets/app/images/project-placeholder-thumb-blur.jpg'

	const props = defineProps({
		image: {
			type: String,
			required: false,
			default: null
		}
	})

	const selectedImage = computed(() => {
		return props.image || placeholderImg
	})
</script>

<style lang="scss">
	.photo-viewer {
		display: flex;
		// border: 1px solid #FFF;
	}
</style>