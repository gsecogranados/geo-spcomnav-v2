import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBicMt52mBBa33I9bN_udpPgS5fYmWedIM",
  authDomain: "tfg2-geospcomnav.firebaseapp.com",
  databaseURL: "https://tfg2-geospcomnav-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tfg2-geospcomnav",
  storageBucket: "tfg2-geospcomnav.appspot.com",
  messagingSenderId: "719213246635",
  appId: "1:719213246635:web:4ddacf63c12a3b5735dfee",
  measurementId: "G-J658HKTEZ9"
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.database()
const dbF = firebase.firestore()

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    console.log(normalizedUser)
    onChange(normalizedUser)
  })
}

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

const addUserName = (user,username) => {
 user.updateProfile({
    displayName: username,
    photoURL: "https://www.w3schools.com/howto/img_avatar.png"
  })
  return firebase.auth().currentUser
  
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const loginWithEmail = (email, pass, username) => {
  return firebase.auth().createUserWithEmailAndPassword(email,pass).then((user)=>{
    return addUserName(user.user, username)
  })
}

export const signInWithEmail = (email,pass) => {
  return firebase.auth().signInWithEmailAndPassword(email,pass)
}

export const signOut = () => {
  return firebase.auth().signOut(); 
}

export const addDB = (fileKML, point1, point2, typeSPS) =>{
  const userId =  firebase.auth().currentUser.uid
  console.log(userId)
  return dbF.collection(userId).add({
    fileKML,
    point1,
    point2,
    typeGNSS: typeSPS,
    date: new Date()

  })
}

export const getFiles = () => {
  return new Promise ((res, rej)=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        res(dbF.collection(user.uid).get().then((snapshot)=>{
          return snapshot.docs.map((doc)=>{
            const data = doc.data()
            const id = doc.id
            const {date} = data
            const intl = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full', timeStyle: 'short' })
            const normalizedDate = intl.format(new Date(date.seconds*1000))
            return {
              ...data,
              id,
              date: normalizedDate
            }
          })
        }))
      } else {
        return null;
      }
    });
  })
}

export const getUser = () => {
  const user =  firebase.auth().currentUser
  return (mapUserFromFirebaseAuthToUser(user))
}

export const addToken = (token) => {
  return dbF.collection('token').doc('token').set({
    token
  })
}

export const getToken = () => {
  return dbF.collection('token').get().then((snapshot)=>{
    return snapshot.docs.map((doc)=>{
      const data = doc.data()
     return data
    })
  })
}