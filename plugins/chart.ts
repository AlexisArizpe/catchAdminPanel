import { Chart, registerables } from 'chart.js'

export default defineNuxtPlugin((nuxtApp) => {
  Chart.register(...registerables)
  nuxtApp.provide('Chart', Chart)
})