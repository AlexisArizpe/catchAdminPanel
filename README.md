
# Catch | Panel de Administración

## Descripción

**Catch** es una aplicación web robusta y dinámica desarrollada con **Nuxt 3**, diseñada para optimizar la gestión de establecimientos. Facilita la administración de múltiples aspectos del negocio a través de diversos módulos, cada uno enfocado en funciones clave:

- **Módulo de Dashboard:** 
    Presenta gráficos y contadores de ventas, canjes de beneficios, tops de beneficios y comparativas. Este módulo proporciona una visión clara del rendimiento del establecimiento, permitiendo a los administradores tomar decisiones basadas en datos.

- **Módulo de Pagos:** 
    Muestra los pagos realizados en el panel de establecimientos, brindando un seguimiento preciso de las transacciones.

- **Módulo de Restaurantes:** 
    Contiene un listado de los restaurantes asociados, con acceso detallado a los beneficios que ofrece cada establecimiento.

- **Módulo de Admisiones:** 
    Permite gestionar las solicitudes de admisión. Los administradores pueden aprobar, modificar, rechazar solicitudes y cargar archivos relacionados.

- **Módulo de Empleados:** 
    Muestra un listado de empleados con acceso al panel administrativo, facilitando la gestión del personal autorizado.

- **Módulo de Consumidores:** 
    Presenta un listado de los consumidores que han canjeado beneficios, ayudando a monitorizar el comportamiento de los usuarios.

---

## Tecnologías Usadas

Este proyecto utiliza las siguientes herramientas y versiones:

- **Node.js** (v16+): Plataforma para ejecutar JavaScript en el servidor.
- **Nuxt 3**: Framework de Vue.js para aplicaciones web modernas.
- **Vuetify 3**: Framework de componentes UI basados en Material Design.
- **Stripe**: Servicio para el procesamiento de pagos en línea.
- **@date-io/date-fns** (v^2.17.0): Manejo avanzado de fechas.
- **@fawmi/vue-google-maps** (v^0.9.79): Integración con Google Maps.
- **@googlemaps/js-api-loader** (v^1.16.6): Cargador de la API de Google Maps.
- **@mdi/font** (v^7.4.47): Conjunto de iconos de Material Design.
- **@nuxt/kit** (v^3.11.2): Herramientas de desarrollo para Nuxt.
- **@nuxtjs/google-fonts** (v^3.1.0): Integración de Google Fonts.
- **@pinia/nuxt** (v^0.5.1): Gestión de estado global con Pinia.
- **@stripe/stripe-js** (v^4.1.0): Biblioteca para la integración de pagos con Stripe.
- **@vue-stripe/vue-stripe** (v^4.5.0): Componentes de Vue para Stripe.
- **@vuepic/vue-datepicker** (v^5.4.0): Selector de fechas.
- **@vueuse/core** (v^10.1.2): Composables útiles para Vue.
- **axios** (v^1.4.0): Cliente HTTP.
- **chart.js** (v^4.4.3): Gráficos interactivos y personalizables.
- **express** (v^4.19.2): Framework para desarrollar APIs en Node.js.
- **lodash.debounce** (v^4.0.8): Utilidad para limitar la frecuencia de ejecución de funciones.
- **luxon** (v^3.5.0): Librería avanzada para el manejo de fechas.
- **moment** (v^2.30.1): Manejo de fechas (se recomienda usar Luxon).
- **moment-timezone** (v^0.5.45): Soporte para zonas horarias con Moment.js.
- **pinia** (v^2.0.35): Sistema de gestión de estado en Vue.js.
- **qr-scanner** (v^1.4.2): Escaneo de códigos QR.
- **sass** (v^1.62.1): Preprocesador CSS para estilos avanzados.
- **stripe** (v^16.2.0): SDK de Stripe para Node.js.
- **sweetalert2** (v^11.10.5): Alertas personalizadas.
- **v-calendar** (v^3.0.3): Componente de calendario.
- **vue** (v^3.4.15): Framework para interfaces de usuario.
- **vue-advanced-cropper** (v^2.8.8): Herramienta para recortar imágenes.
- **vue-router** (v^4.2.5): Sistema de enrutamiento para Vue.js.
- **vue3-google-map** (v^0.20.0): Integración con Google Maps en Vue 3.
- **vue3-toastify** (v^0.2.1): Notificaciones tipo "toast" para Vue 3.
- **@iconify/vue** (v^4.1.2): Iconos SVG en Vue.
- **vite-plugin-vuetify** (v^1.0.2): Plugin para integrar Vuetify con Vite.
- **vuetify** (v^3.4.3): Biblioteca de componentes UI de Material Design.

---

## Instalación

Sigue los siguientes pasos para instalar las dependencias del proyecto:

```bash
# Instalar dependencias
npm install
```

---

## Configuración

Antes de ejecutar la aplicación, es necesario configurar las variables de entorno:

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
# Clave secreta de Stripe para producción
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Clave pública de Stripe para producción
STRIPE_PUBLIC_KEY=your_stripe_public_key_here

# URL base para las API de Catchapp
BASE_URL=https://api.catchapp.mx/api/v1/sp/
```

---

## Deploy

Para desplegar el proyecto, sigue estos pasos:

1. Genera la carpeta `dist` del proyecto:
   ```bash
   npm run generate
   ```

---

## Estructura de Carpetas

La estructura de carpetas del proyecto es la siguiente:

```bash
/nuxt-app
├── /assets
├── /components
├── /layouts
├── /middleware
├── /pages
├── /plugins
├── /public
├── /server
├── /store
├── /types
├── app.vue
├── nuxt.config.js
└── package.json
```

---

Con esta estructura y los módulos detallados, **Catch** permite gestionar establecimientos de forma eficiente y centralizada, optimizando la administración de usuarios, pagos, beneficios y más.
