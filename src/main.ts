import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "./assets/main.scss";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faDoorOpen, faMagnifyingGlass, faRecordVinyl, faChevronLeft, faChevronRight, faSortDown } from '@fortawesome/free-solid-svg-icons'
library.add(faDoorOpen,
    faMagnifyingGlass,
    faRecordVinyl,
    faChevronLeft,
    faChevronRight,
    faSortDown);
const app = createApp(App);

app.use(router, ElementPlus);
app.mount("#app");
