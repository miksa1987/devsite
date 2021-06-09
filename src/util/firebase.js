import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const COLLECTION_COMMENTS = "comments";

let firebaseInstance = null;

export const initFirebase = async (config) => {
  if (firebaseInstance) {
    return firebaseInstance;
  }

  firebaseInstance = firebase.initializeApp(config);
};

export const addComment = async (postId, userName, comment) => {
  const db = await firebase.firestore();

  const newComment = {
    postId,
    comment,
    created: new Date().toISOString(),
    by: userName,
  };

  try {
    await db.collection(COLLECTION_COMMENTS).doc().set(newComment);
  } catch (error) {
    console.error(error.message);
  }
};

export const getCommentsForPost = async (postId) => {
  const db = await firebase.firestore();

  try {
    // For some reason, map doesn't work on results.
    let returnableResults = [];

    const results = await db
      .collection(COLLECTION_COMMENTS)
      .where("postId", "==", postId)
      .get();

    results.forEach((result) => {
      returnableResults = [...returnableResults, result.data()];
    });

    return returnableResults;
  } catch (error) {
    console.error(error.message);
  }
};

export const signIn = async (provider) => {
  const auth = firebase.auth();

  switch (provider) {
    case "google":
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    default:
      return false;
  }
};

export const signOut = async () => {
  const auth = firebase.auth();
  await auth.signOut();
};

export const setAuthObserver = (fn) => {
  const auth = firebase.auth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      fn(user.displayName);
    } else {
      fn(null);
    }
  });
};
