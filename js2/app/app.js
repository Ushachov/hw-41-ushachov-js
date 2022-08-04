
import {View} from "./view.js"
import {Controller} from "./controller.js"
import {Model} from "./model.js"

const app = new Controller(new View(), new Model());

app.init();