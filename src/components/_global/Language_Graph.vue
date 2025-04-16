<template>
    <div class="language-graph">
        <canvas class="language-graph__canvas" ref="languageGraphCanvas" height="130" width="130"></canvas>
        <div class="language-graph__text">
            <p class="value">{{ languageValue }}<span>%</span></p>
            <p class="language">{{ language }}</p>
        </div>
    </div>
</template>

<script setup>
	import { ref, computed, onMounted, onUpdated } from 'vue'

	const props = defineProps({
		value: {
			type: [String, Number],
			required: true,
			default: 0
		},
		
		language: {
			type: String,
			required: true,
			default: null
		}
	})

	const languageGraphCanvas = ref(null)
	const canvas_context = ref(null)

	const languageValue = computed(() => {
		let value = parseInt(props.value)

		if (!value) return 0
		if (value >= 100) return value.toFixed(0)
		return (value.toFixed(1) % 1 !== 0) ? value.toFixed(1) : parseInt(value.toFixed(1).toString().substring(0, value.toFixed(1).length - 1))
	})

	const createGraph = () => {
  if (!languageGraphCanvas.value) return

  const percent = props.value
  const canvas = languageGraphCanvas.value
  const ctx = canvas.getContext('2d')
  canvas_context.value = ctx

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const percentToRadian = (360 * (Math.PI / 180) / 100)
  const x = canvas.width / 2
  const y = canvas.height / 2
  const startAngle = 0 * Math.PI
  const counterClockwise = false

  let endAngle = 100 * percentToRadian
  let radius = 47
  ctx.beginPath()
  ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise)
  ctx.lineWidth = 3
  ctx.strokeStyle = '#3100BD'
  ctx.stroke()

  endAngle = 100 * percentToRadian
  radius = 40
  ctx.beginPath()
  ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise)
  ctx.lineWidth = 3
  ctx.strokeStyle = 'rgba(255,0,133,0.2)'
  ctx.stroke()

  endAngle = percent * percentToRadian
  radius = 40
  ctx.beginPath()
  ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise)
  ctx.lineWidth = 3
  ctx.strokeStyle = '#FF0099'
  ctx.stroke()
}


	onMounted(() => {
		createGraph()
	})

	onUpdated(() => {
		createGraph()
	})
</script>
