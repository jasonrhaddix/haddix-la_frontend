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
      :zoom="13"
      >
        <CustomMarker
          :options="{ position: mapCenter }">
          <img :src="mapMarker" />
        </CustomMarker>
      </GoogleMap>
    <!-- <GmapMap ref="mapRef"
      :center="{ lat: mapOptions.lat, lng: mapOptions.lng }"
      :zoom="12"
      style="width: 100%; height: 500px"
      :options="{
        styles: mapStyles,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      }">
      <GmapMarker
        :position="{ lat: mapOptions.lat, lng: mapOptions.lng }"
        :icon="markerOptions"
      />
    </GmapMap> -->
  </div>
</template>

<script setup>
import { GoogleMap, CustomMarker } from 'vue3-google-map'

// import mapStyles from '@/config/mapstyles.json'
import mapMarker from '@/assets/app/images/map-marker.svg'

const mapCenter = { lat: 33.7714398, lng: -118.1503778 }

/* export default {
	name: 'google-map',

	data: () => ({
		mapOptions: {
			lat: 33.7714398,
			lng: -118.1503778
		},
		markerOptions: {
			url: mapMarker,
			// size: {width: 60, height: 90, f: 'px', b: 'px',},
			scaledSize: { width: 60, height: 75, f: 'px', b: 'px' }
		},
		mapStyles
	})
} */
</script>
