import firebase from "firebase/app"
import "firebase/storage"
import { upload } from "./upload.js"



const firebaseConfig = {
    apiKey: "AIzaSyAG9O8vrrEZU1ltG6H-9oLkt-haHSLgz-k",
    authDomain: "fe-uploader-71aaf.firebaseapp.com",
    projectId: "fe-uploader-71aaf",
    storageBucket: "fe-uploader-71aaf.appspot.com",
    messagingSenderId: "1099194483331",
    appId: "1:1099194483331:web:1940dfcc3dfbee553751b6"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

console.log(storage)

upload("#file", {
    multiple: true,
    accept: [".png", ".jpg", ".jpeg", ".gif"],
    onUpload(files) {
        files.forEach(file => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(percentage);
            }, error => {
                console.log(error);
            }, () => {
                console.log("Complete");
            })
        });
    }
})