<template>
	<div class="contact-form">
			<div class="contact--title">
					<h2>Drop Me a Line</h2>
			</div>
			<div class="contact--form">
					<v-row class="form-flield--name">
							<v-col class="py-0 col-12 col-sm-12 col-md-6">
								<v-text-field
										filled
										label="First Name"
										v-model="modelValue.first_name" />
							</v-col>
							<v-col class="py-0 col-12 col-sm-12 col-md-6">
								<v-text-field
										filled
										label="Last Name"
										v-model="modelValue.last_name" />
							</v-col>
					</v-row>
					<v-row>
							<v-col xs12 class="py-0">
								<v-text-field
									filled
									label="Email"
									v-model="modelValue.email" />
							</v-col>
					</v-row>
					<v-row>
							<v-col xs12 class="py-0">
								<v-textarea
									filled
									no-resize
									label="Message"
									v-model="modelValue.message" />

									<v-text-field
										v-model="modelValue.website"
										name="website"
										label="Leave this empty"
										style="position: absolute; left: -9999px; opacity: 0;"
										autocomplete="off"
										tabindex="-1" />
							</v-col>
					</v-row>
					<div class="form-submit--container">
							<div class="form-submit__inner">
									<AppButton
										variant="light"
										:disabled="!formValid"
										:loading="contactStore.saving"
										class="form-submit--btn"
										label="Submit"
										@click.native="sendEmail"/>
							</div>
					</div>
			</div>
	</div>
</template>


<script setup>
	import { reactive, computed } from 'vue'

	import stores from '@/stores/index.js'

	import AppButton from '@/components/_global/App_Button.vue'

	const contactStore = stores.contactStore()
	const toastStore = stores.ui.toastStore()

	const modelValue = reactive({
		first_name: null,
		last_name: null,
		email: null,
		message: null,
		website: null // Honeypot field (bot prevention)
	})


	const sendEmail = async() => {
		try {
			await contactStore.sendEmail(modelValue)

			toastStore.addToast({
				data: {
					message: 'Message sent successfully!',
					type: 'success'
				},
				component: '_global/Toast/Toast_Message.vue'
			})

			resetForm()
		} catch (error) {
			toastStore.addToast({
				data: {
					message: 'Error sending message. Please try again.', // <-------- add proper error message from error.response
					type: 'error'
				},
				// persist: true,
				component: '_global/Toast/Toast_Message.vue'
			})
		}
	}

	const formValid = computed(() => {
		// Add proper validation logic later
		return (modelValue.first_name || modelValue.last_name || modelValue.email || modelValue.message)
	})

	const resetForm = () => {
		Object.assign(modelValue, {
			first_name: null,
			last_name: null,
			email: null,
			message: null,
			website: null
		})
	}
</script>