import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// MASONRY
import { VueMasonryPlugin } from 'vue-masonry'

//TOASTS
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//vuetify Icon
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
        components,
        directives,
    })

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.use(vuetify)
// app.use(ToastPlugin)

// app.mount('#app')

/// FIREBASE
import { AUTH } from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth'

let app;

onAuthStateChanged(AUTH,()=>{
  if(!app){
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(vuetify)
    app.use(ToastPlugin);
    app.use(VueMasonryPlugin);
    app.mount('#app')
  }  
})
