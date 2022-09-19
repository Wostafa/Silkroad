import Config from './Config'
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const app = initializeApp(Config);
const storage = getStorage(app);
const storageRef = ref(storage);