import axios from "axios";


export default defineNuxtPlugin((nuxtApp) => {
  
  
  // create axios instance as api
  let api = axios.create({
    baseURL: "https://api.catchapp.mx/dev/api/v1/sp/",
    headers: {
      common: {},
    },
  });

  // interceptor to listen to expired tokens
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.data.code === 401 || error.response.data.code === 403) {
        // editor might mark it as wrong but its not
        // it doesn't read nuxtapp as an accesible enviroment
        // element
        nuxtApp.$store.user.setLogout()
        nuxtApp.$router.push('/login');
        // nuxtApp.$store.logout();
        // nuxtApp.$store.toggleAlert({
        //   sAlertType: 'error',
        //   sText: 'Sesión terminada.'
        // });
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api: api,
    },
  };

});