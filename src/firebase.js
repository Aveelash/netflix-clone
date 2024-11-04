import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
    apiKey: "AIzaSyAMQFN-uRz8FNvdq7NYwRPLDGtlD7F1wVk",
    authDomain: "netflix-clone-b1872.firebaseapp.com",
    projectId: "netflix-clone-b1872",
    storageBucket: "netflix-clone-b1872.firebasestorage.app",
    messagingSenderId: "545955641441",
    appId: "1:545955641441:web:e240dfb9bda73899cfd220"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };