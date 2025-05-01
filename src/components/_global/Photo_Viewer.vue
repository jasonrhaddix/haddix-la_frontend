

<template>
	<div
		class="photo-viewer"
		@click="$emit('close')">
		<video
			v-if="video" autoplay controls loop :src="video" />
		<img v-if="image" :src="selectedImage"/>
	</div>
</template>

<script setup>
	import { computed } from 'vue'

	import placeholderImg from '@/assets/app/images/project-placeholder-thumb-blur.jpg'

	const emit = defineEmits(['close'])	

	const props = defineProps({
		image: {
			type: String,
			required: false,
			default: null
		},

		video: {
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
		max-width: 1600px;
		display: flex;
		border: 1px solid #EFEFEF;

		video {
			outline: 0;
			width: 100%;
		}
	}
</style>