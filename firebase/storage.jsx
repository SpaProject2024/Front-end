// firebase/storage.js
import { getStorage } from "firebase/storage";
import app from './firebaseConfig';

const storage = getStorage(app);

// Xuất storage để sử dụng trong ứng dụng
export default storage;
