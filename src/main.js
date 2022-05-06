import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
//call bootstrap
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
//call font awesome
import {library} from "@fortawesome/fontawesome-svg-core"
import {far} from "@fortawesome/free-regular-svg-icons"
import {fas} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
library.add(fas, far);
const app=createApp(App);
app.use(router)
app.component("FAIHoussain", FontAwesomeIcon);
app.mount('#app');
