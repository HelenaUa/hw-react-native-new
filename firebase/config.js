// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZJY0lg5bYXS0rV0bdxtUMqJtRBErE6ls",
  authDomain: "my-native-8ba7d.firebaseapp.com",
  projectId: "my-native-8ba7d",
  storageBucket: "my-native-8ba7d.appspot.com",
  messagingSenderId: "734979221852",
  appId: "1:734979221852:web:011263fa954e757faaf999",
  measurementId: "G-11P0L8GFMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

