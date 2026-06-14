import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {

    getFirestore,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    getDoc,
    addDoc,
    deleteDoc,
    onSnapshot

}

from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";



const firebaseConfig = {

    apiKey: "AIzaSyDDtnJ-MNto-7JmwphX17mE2d6RZ0NpSVA",

    authDomain: "lab-log-tracker-system.firebaseapp.com",

    projectId: "lab-log-tracker-system",

    storageBucket: "lab-log-tracker-system.firebasestorage.app",

    messagingSenderId: "728532789371",

    appId: "1:728532789371:web:7aee47c1707dc82013dade"

};



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



window.db = db;

window.collection = collection;

window.query = query;

window.where = where;

window.getDocs = getDocs;

window.updateDoc = updateDoc;

window.doc = doc;

window.getDoc = getDoc;

window.addDoc = addDoc;

window.deleteDoc = deleteDoc;

window.onSnapshot = onSnapshot;



console.log("Firebase Connected");

