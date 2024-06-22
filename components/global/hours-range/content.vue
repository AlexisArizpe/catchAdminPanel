<template>
  <div class="content-hours-range-all">
    <p class="txt-title-content-global mb-6">De</p>
    <!-- #region Desde -->
    <div class="content-field-hours">
      <v-text-field
        variant="solo"
        flat
        density="compact"
        color="primary"
        bg-color="grey"
        placeholder="00"
      >
      </v-text-field>
    </div>
    <p class="txt-title-content-global mb-6">:</p>
    <div class="content-field-hours">
      <v-text-field
        variant="solo"
        flat
        density="compact"
        color="primary"
        bg-color="grey"
        placeholder="00"
        rounded="lg"
        
      >
      </v-text-field>
    </div>
    <div class="content-am-pm-all">
      <v-btn
        height="34px"
        @click="setChangeTypeAMPM(oItem, aTypeHourStart)"
        v-for="(oItem, i) in aTypeHourStart"
        :key="i"
        :class="oItem.bSelected ? 'font-weight-bold' : ''"
        :variant="oItem.bSelected ? 'elevated' : 'text'"
      >
        {{ oItem.sName }}
      </v-btn>
    </div>
    <!-- #endregion Desde -->
    <p class="txt-title-content-global mb-6">a</p>

    <!-- #region Hasta -->
    <div class="content-field-hours">
      <v-text-field
        variant="solo"
        flat
        density="compact"
        color="primary"
        bg-color="grey"
        placeholder="00"
        rounded="lg"
      >
      </v-text-field>
    </div>
    <p class="txt-title-content-global mb-6">:</p>
    <div class="content-field-hours">
      <v-text-field
        variant="solo"
        flat
        density="compact"
        color="primary"
        bg-color="grey"
        placeholder="00"
        rounded="lg"
      >
      </v-text-field>
    </div>
    <div class="content-am-pm-all">
      <v-btn
        height="34px"
        @click="setChangeTypeAMPM(oItem, aTypeHourEnd)"
        v-for="(oItem, i) in aTypeHourEnd"
        :key="i"
        :class="oItem.bSelected ? 'font-weight-bold' : ''"
        :variant="oItem.bSelected ? 'elevated' : 'text'"
      >
        {{ oItem.sName }}
      </v-btn>
    </div>
    <!-- #endregion Hasta -->
  </div>
</template>
<script>
export default {
  data: () => ({
    iFromHour: null,
    iFromMinute: null,
    aTypeHourStart: [
      {
        sName: "AM",
        bSelected: false,
      },
      {
        sName: "PM",
        bSelected: true,
      },
    ],

    iToHour: null,
    iToMinute: null,
    aTypeHourEnd: [
      {
        sName: "AM",
        bSelected: false,
      },
      {
        sName: "PM",
        bSelected: true,
      },
    ],
  }),
  emits: ["setFromHour", "setFromMinute", "setToHour", "setToMinute"],
  methods: {
    setChangeTypeAMPM(oItem, aItem) {
      if (oItem.sName === "AM") {
        oItem.bSelected = true;
        aItem.find((e) => e.sName === "PM").bSelected = false;
      } else {
        oItem.bSelected = true;
        aItem.find((e) => e.sName === "AM").bSelected = false;
      }
    },
  },
  watch: {
    iFromHour() {
      this.$emit("setFromHour", this.iFromHour);
    },
    iFromMinute() {
      this.$emit("setFromMinute", this.iFromMinute);
    },
    iToHour() {
      this.$emit("setToHour", this.iToHour);
    },
    iToMinute() {
      this.$emit("setToMinute", this.iToMinute);
    },
  },
};
</script>
<style scoped>
.content-hours-range-all {
  display: flex;
  align-items: center;
  gap: 10px;
}
.content-field-hours {
  width: 50px;
}
.content-am-pm-all {
  display: flex;
  gap: 5px;
  padding: 3px;
  background-color: var(--global-color-grey-border);
  margin-bottom: 22px;
  border-radius: 4px;
}
</style>
