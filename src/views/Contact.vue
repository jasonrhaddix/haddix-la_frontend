<template>
  <div class="contact-view">
    <div class="contact-view--inner">
      <div class="contact-view--content">
        <ContactForm />

        <div class="contact--map">
          <GoogleMap />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ContactForm from '@/components/Forms/Contact/Contact_Form.vue'
import GoogleMap from '@/components/_global/Google_Map.vue'
</script>
