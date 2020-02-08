import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBOpOn3d149bDTX-A1gyIMtxcbBY70UOHk",
    authDomain: "crwn-db-98c51.firebaseapp.com",
    databaseURL: "https://crwn-db-98c51.firebaseio.com",
    projectId: "crwn-db-98c51",
    storageBucket: "crwn-db-98c51.appspot.com",
    messagingSenderId: "426821992059",
    appId: "1:426821992059:web:a2c34706f97d479313acde",
    measurementId: "G-CESPBWQ9DJ"
};

export const createUserProfileDocument = async ( userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date ();

        try{
            await userRef.ser({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }   catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;