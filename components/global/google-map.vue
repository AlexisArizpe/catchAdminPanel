<template>
  <div class="content-google-map-all">

    <div ref="mapElement" class="content-maps"></div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  props: {
    oLocaltion: {
      type: Object,
      default: () => ({
        dLat: 0,
        dLng: 0,
      }),
    },
    bEdit: Boolean,
  },
  data() {
    return {
      map: null,
      marker: null,
      infowindow: null,
      autocomplete: null,
      apiKey: "AIzaSyBRDxB67vNls8sVYKRdLU-8XPFhCRhzX6s",
    };
  },
  mounted() {
    this.getInit();
  },
  emits: ["setLocation", "setLocationSpecific"],
  methods: {
    getInit() {
      const loader = new Loader({
        apiKey: this.apiKey,
        libraries: ["places"],
      });

      loader.load().then(() => {
        const mapOptions = {
          center: {
            lat: this.bEdit ? this.oLocaltion?.dLat ?? 0 : 25.6524255,
            lng: this.bEdit ? this.oLocaltion?.dLng ?? 0 : -100.3525628,
          },
          zoom: 15,
        };

        this.map = new google.maps.Map(this.$refs.mapElement, mapOptions);

        const input = document.getElementById("pac-input");
        this.autocomplete = new google.maps.places.Autocomplete(input, {
          componentRestrictions: { country: "mx" },
        });
        this.autocomplete.bindTo("bounds", this.map);

        this.infowindow = new google.maps.InfoWindow();
        this.marker = new google.maps.Marker({
          map: this.map,
          anchorPoint: new google.maps.Point(0, -29),
        });

        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
      });
    },
    handlePlaceChanged() {
      this.infowindow.close();
      this.marker.setVisible(false);
      const place = this.autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      }
      this.marker.setPosition(place.geometry.location);
      this.marker.setVisible(true);

      const contentString = `
        <div>
          <strong>${place.name}</strong><br>
          ${place.formatted_address}
        </div>
      `;
      this.infowindow.setContent(contentString);
      this.infowindow.open(this.map, this.marker);

      this.getLocations(place);

      this.$emit("setLocation", {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    },
    getLocations(oPlace) {
      let sState = "",
        sStreet = "",
        sNumber = "",
        sCity = "",
        sPostalCode = "";

      oPlace.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("street_number")) {
          sNumber = component.long_name;
        } else if (types.includes("route")) {
          sStreet = component.long_name;
        } else if (types.includes("locality")) {
          sCity = component.long_name;
        } else if (types.includes("postal_code")) {
          sPostalCode = component.long_name;
        } else if (types.includes("administrative_area_level_1")) {
          sState = component.long_name;
        }
      });

      this.$emit("setLocationSpecific", {
        sState,
        sStreet,
        sNumber,
        sCity,
        sPostalCode,
        sFormattedAddress: oPlace.formatted_address,
      });
    },
    updateMapCenter(oLocation) {
      if (this.map) {
        this.map.setCenter({ lat: oLocation.dLat, lng: oLocation.dLng });
        this.marker.setPosition({ lat: oLocation.dLat, lng: oLocation.dLng });
      }
    },
  },
  watch: {
    oLocaltion: {
      handler(newVal) {
        this.updateMapCenter(newVal);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.content-google-map-all {
  position: relative;
}
.content-maps {
  height: 230px;
  width: 100%;
}
.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  width: calc(100% - 20px);
  z-index: 5;
  border: 1px solid transparent;
  background-color: var(--global-color-white);
  border-radius: 2px;
  box-sizing: border-box;
  height: 32px;
  padding: 0 11px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  outline: none;
  text-overflow: ellipsis;
}
.pac-container {
  position: absolute !important;
  z-index: 9999 !important;
}
</style>
