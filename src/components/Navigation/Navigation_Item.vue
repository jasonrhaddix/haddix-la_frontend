<template>
    <div class="navigation-item">
        <div class="nav-item nav-item__left">
            <h1 :style="styles">{{itemLabel}}</h1>
        </div>
				
        <div class="nav-item nav-item__right">
					<h1 :style="styles">{{itemLabel}}</h1>
        </div>

        <div class="nav-item nav-item__hidden">
					<h1 :style="styles">{{itemLabel}}</h1>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed, watch } from 'vue'
import i18next from 'i18next'

	const props = defineProps({
		text: {
			type: [String, null],
			default: null
		},
		styles: {
			type: Object,
			required: false,
			default: () => {}
		}
	})


	const itemLabel = computed(() => {
		return i18next.t(`common:SITE_NAV.ROUTES.${props.text.toUpperCase()}`) || props.text
	})

</script>
