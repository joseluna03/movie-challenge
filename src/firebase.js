// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FBAPIKEY,
  authDomain: import.meta.env.VITE_FBAUTHDOMAIN,
  projectId: import.meta.env.VITE_FBPROJECTID,
  storageBucket: import.meta.env.VITE_FBSTORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FBMESSAGINGSENDERID,
  appId: import.meta.env.VITE_FBAPPID,
  measurementId: import.meta.env.VITE_FBMEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function userExists(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

export async function existUsername(username) {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("userName", "==", username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user) {
  const collectionRef = collection(db, "users");
  const docRef = doc(collectionRef, user.uid);
  await setDoc(docRef, user);
  try {
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
    console.log(res.data());
    return res.data();
  } catch (error) {
    console.log(error);
  }
}
