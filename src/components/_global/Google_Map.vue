<template>
  <div>
    <GoogleMap
      api-key="AIzaSyDtY7XcAta9D76108tUv_JIOOfCFvvx-uQ"
      map-id="45e52e36227206c0"
      style="width: 100%; height: 500px"
      :map-type-control="false"
      :scale-control="false"
      :zoom-control="false"
      :fullscreen-control="false"
      :street-view-control="false"
      :center="mapCenter"
      :zoom="13">
        <CustomMarker
          :options="{ position: mapCenter }">
          <img :src="mapMarker" />
        </CustomMarker>
      </GoogleMap>
  </div>
</template>

<script setup>
import { GoogleMap, CustomMarker } from 'vue3-google-map'

import mapMarker from '@/assets/app/images/map-marker.svg'

const mapCenter = { lat: 33.7714398, lng: -118.1503778 }
</script>
