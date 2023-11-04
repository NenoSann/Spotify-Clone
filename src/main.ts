import { createApp } from "vue";
import { pinia } from "./store/index";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus';
// using compiled tailwindcss file
import './style.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */

/* import specific icons */

import {
    faDoorOpen,
    faMagnifyingGlass,
    faRecordVinyl,
    faChevronLeft,
    faChevronRight,
    faSortDown,
    faCirclePlay,
} from '@fortawesome/free-solid-svg-icons'

library.add(faDoorOpen,
    faMagnifyingGlass,
    faRecordVinyl,
    faChevronLeft,
    faChevronRight,
    faSortDown,
    faCirclePlay,
);
const app = createApp(App);

app.use(pinia).use(ElementPlus).use(router);
app.mount("#app");
