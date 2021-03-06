import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAUcsZ5HX2SWTQu0CJtQonr-5sWSZxwiTU",
  authDomain: "e-commerce-f04bf.firebaseapp.com",
  projectId: "e-commerce-f04bf",
  storageBucket: "e-commerce-f04bf.appspot.com",
  messagingSenderId: "140876473457",
  appId: "1:140876473457:web:6e257901042d35a55ba7d0",
  measurementId: "G-JKHMFPY9MN",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData,
    });
    try {
    } catch (err) {
      console.log("Error creating user", err.message);
    }
  }
  return userRef;
};

export const addCollectionAndDoccuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
