<template>
  <v-text-field
    v-model="sTextAddress"
    id="pac-input"
    class="input-global controls"
    variant="solo"
    flat
    density="comfortable"
    color="primary"
    :bg-color="BgColor"
    type="text"
    placeholder="Buscar localización"
  >
    <template #label>
      <span class="txt-labels-form-initial-global"
        >Buscar localización
        <span class="color-red-global"></span>
      </span>
    </template>
  </v-text-field>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    BgColor: {
      type: String,
      default: "grey",
    },
  },
  data: () => ({
    sTextAddress: null,
  }),
  emits: ["update:modelValue", "setCity", "setStreet", "setZIP"],
  methods: {
    getInit() {
      const loader = new Loader({
        apiKey: "AIzaSyBRDxB67vNls8sVYKRdLU-8XPFhCRhzX6s", // Reemplaza con tu API Key
        libraries: ["places"],
      });

      loader.load().then(() => {
        const mapOptions = {
          center: {
            lat: 25.6524255,
            lng: -100.3525628,
          },
          zoom: 15,
        };

        this.map = new google.maps.Map(this.$refs.mapElement, mapOptions);

        const input = document.getElementById("pac-input");
        this.autocomplete = new google.maps.places.Autocomplete(input, {
          componentRestrictions: { country: "mx" }, // "mx" es el código ISO 3166-1 de México
        }); // Almacena la instancia de Autocomplete
        this.autocomplete.bindTo("bounds", this.map);

        this.infowindow = new google.maps.InfoWindow();
        this.marker = new google.maps.Marker({
          map: this.map,
          anchorPoint: new google.maps.Point(0, -29),
        });

        this.autocomplete.addListener("place_changed", this.handlePlaceChanged); // Utiliza this.autocomplete
      });
    },
    handlePlaceChanged() {
      this.infowindow.close();
      this.marker.setVisible(false);
      const place = this.autocomplete.getPlace(); // Utiliza this.autocomplete
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17); // Zoom for close-up view
      }
      this.marker.setPosition(place.geometry.location);
      this.marker.setVisible(true);

      this.infowindow.open(this.map, this.marker);

      // Emit the new location
      this.$emit("setLocation", {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    },
  },
  watch: {
    sTextAddress() {
      this.$emit("update:modelValue", this.sTextAddress);
    },
  },
};
</script>
<style>
.pac-container {
  position: absolute !important;
  z-index: 9999 !important;
}
</style>
