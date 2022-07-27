import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, update, onValue, child, } from "firebase/database";
import { firebaseConfig } from './config'


const app = initializeApp(firebaseConfig);

const auth = getAuth();

const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();


//----------------------------------Authentication------------------------------------------

function onAuth(setUserProfile, setUserData) {
      return onAuthStateChanged(auth, (user) => {
            if (user) {
                  setUserProfile(user)
                  getData(user.uid, setUserData)
            } else {
                  setUserProfile(user)
            }
      });
}

function withFacebook() {
      signInWithPopup(auth, providerFacebook)
            .then((result) => {
                  // The signed-in user info.
                  const user = result.user;

                  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                  const credential = FacebookAuthProvider.credentialFromResult(result);
                  const accessToken = credential.accessToken;

                  // ...
            })
            .catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // The email of the user's account used.
                  const email = error.email;
                  // The AuthCredential type that was used.
                  const credential = FacebookAuthProvider.credentialFromError(error);

                  // ...
            });
}

function withGoogle() {
      signInWithPopup(auth, providerGoogle)
            .then((result) => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  const credential = GoogleAuthProvider.credentialFromResult(result);
                  const token = credential.accessToken;
                  // The signed-in user info.
                  const user = result.user;
                  // ...
            }).catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // The email of the user's account used.
                  const email = error.email;
                  // The AuthCredential type that was used.
                  const credential = GoogleAuthProvider.credentialFromError(error);
                  // ...
            });
}


function handleSignOut() {
      auth.signOut().then(function () {
            // Sign-out successful.
      }).catch(function (error) {
            // An error happened.
      });
}








//-----------------------------------Realtime database--------------------------------------




const db = getDatabase(app);
const data = ref(db, '/users');
// const premiumCode = ref(db, '/premiumCode');
// const ids = ref(db, '/ids')




//Traemos toda la DATA de un usuario autentificado
function getData(uid, setUserData) {
      get(ref(db, `/users/${uid}`)).then((snapshot) => {
            //Mandamos la data al CONTEXT "userDB"
            setUserData(snapshot.val())
      }).catch((error) => {
            console.error(error);
      });
}

//Registro de DATOS generales de un usuario
function userDataRegister(object, router, url) {
      const name = auth.currentUser.displayName
      const uid = auth.currentUser.uid

      set(ref(db, `users/${uid}`), object)
            .then(() => {
                  router.push(url)
            })
            .catch((error) => {
                  // The write failed...
            });
}


// function userDataRegister( aName, school, cell, avatar) {
//       const name = auth.currentUser.displayName
//       const uid = auth.currentUser.uid

//       set(ref(db, `users/${uid}`), {
//             name,
//             aName,
//             school,
//             cell,
//             avatar,
//             premium: false,
//             uid,
//       })
//             .then(() => {
//                   // Data saved successfully!
//             })
//             .catch((error) => {
//                   // The write failed...
//             });
// }

function userDataUpdate(object, setUserData, query) {
      const uid = auth.currentUser.uid

      if (query) {
            update(ref(db, `users/${uid}/subjects/${query.toLowerCase()}`), object)
            getData(uid, setUserData)
            return
      }
      update(ref(db, `users/${uid}`), object)
      getData(uid, setUserData)
}

function getFac(university, setUniversityData) {

      get(ref(db, `/${university.toLowerCase()}`)).then((snapshot) => {
            if (snapshot.exists()) {
                  let obj = snapshot.val()
                  console.log(obj)
                  setUniversityData(obj)
            } else {
                  setUniversityData(null)
            }
      }).catch((error) => {
            console.error(error);
      });
}



function manageSimulacro(materia, university, setUserSimulacro) {
      const uid = auth.currentUser.uid

      get(ref(db, `/${university.toLowerCase()}/Banco/${materia.toLowerCase()}`)).then((snapshot) => {
            if (snapshot.exists()) {
                  let object = snapshot.val()
                  // setUserData(obj[user.uid])
                  setUserSimulacro(object)
            } else {
                  setUserData(null)
            }
      }).catch((error) => {
            console.error(error);
      });
}

function getBank () {

}

function updateBank(university, materia, bank, setUserBank) {
      get(ref(db, `${university.toLowerCase()}/Banco/${materia.toLowerCase()}`)).then((snapshot) => {
            console.log('se esta ejecutando')
            let data = snapshot.val()
            const obj = {}
            obj[materia.toLowerCase()] = data
            setUserBank({ ...bank, ...obj })

      }).catch((error) => {
            console.error(error);
      });
}

function getDataForSimulacro(university, materia, cantidad, simulacro, setUserSimulacro, bank, setUserBank) {
//Consulta si banco existe
      if (bank) {
      //Consulta si la materia existe en el banco ? Se pasa todo el banco al context mas la cantidad de preguntas requeridas : Hacemos una peticion a la base de datos
            bank[materia.toLowerCase()] ? setUserSimulacro(bank[materia.toLowerCase()], cantidad) : UpdateBank(university, materia, bank, setUserBank)
      } else {
            updateBank(university, materia, cantidad, simulacro, setUserSimulacro, bank, setUserBank)
      }
}





function spam() {
      for (let index = 0; index < 1; index++) {
            update(ref(db, `usfx/Banco/lenguaje/`), {
                  0: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 1
                  },
                  1: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 2
                  },
                  2: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 3
                  },
                  3: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 4
                  },
                  4: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 5
                  },
                  5: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 6
                  },
                  6: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 7
                  },
                  7: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 8
                  },
                  8: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 9
                  },
                  9: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 10
                  },
                  10: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 11
                  },
                  11: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 12
                  },
                  12: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 13
                  },
                  13: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 14
                  },
                  14: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 15
                  },
                  15: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 16
                  },
                  16: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 17
                  },
                  17: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 18
                  },
                  18: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 19
                  },
                  19: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 20
                  },
                  20: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 21
                  },
                  21: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 22
                  },
                  22: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 23
                  },
                  23: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 24
                  },
                  24: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 25
                  },
                  25: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 26
                  },
                  26: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 27
                  },
                  27: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 28
                  },
                  28: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 29
                  },
                  29: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 30
                  },
                  30: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 31
                  },
                  31: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 32
                  },
                  32: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 33
                  },
                  33: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 34
                  },
                  34: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 35
                  },
                  35: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 36
                  },
                  36: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 37
                  },
                  37: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 38
                  },
                  38: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 39
                  },
                  39: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 40
                  },
                  40: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 41
                  },
                  41: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 42
                  },
                  42: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 43
                  },
                  43: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 44
                  },
                  44: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 45
                  },
                  45: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 46
                  },
                  46: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 47
                  },
                  47: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 48
                  },
                  48: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 49
                  },
                  49: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 50
                  },
                  50: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 51
                  },
                  51: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 22
                  },
                  52: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 53
                  },
                  53: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 54
                  },
                  54: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 55
                  },
                  55: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 56
                  },
                  56: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 57
                  },
                  57: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 58
                  },
                  58: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 59
                  },
                  59: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 60
                  },
                  60: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 61
                  },
                  61: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 62
                  },
                  62: {
                        pregunta: 'Cual de las siguientes opciones es un verbo? MATE',
                        respuesta: 'c',
                        a: 'niño',
                        b: 'ada',
                        c: 'correr',
                        d: 'hambre',
                        id: 63
                  },
                  63: {
                        pregunta: 'Cual de las siguientes opciones es un sustantivo MATE',
                        respuesta: 'b',
                        a: 'Feliz',
                        b: 'Hoja',
                        c: 'Ver',
                        d: 'Lejos',
                        id: 64
                  },
            })
      }
}



export { manageSimulacro, userDataUpdate, getFac, onAuth, withFacebook, withGoogle, handleSignOut, userDataRegister, getDataForSimulacro, updateBank, getBank }



//Consulta por un item dentro de un snapshot
// function getData(uid, setUserData) {
//       get(ref(db,`/users`)).then((snapshot) => {
//              console.log(snapshot.val())
//             var b = snapshot.child(uid).exists();
//             if (b == true) {
//                   let obj = snapshot.val()
//                   setUserData(obj[uid])
//             } else {
//                   setUserData(null)
//             }
//       }).catch((error) => {
//             console.error(error);
//       });
// }
// function query(id, setTeacherId, userUid, name, setUserSuccess, setAlert ){
//       ids.on('value', function(snapshot){  
//             var b = snapshot.child(id).exists(); 
//             if (b === true){
//                   const val = snapshot.child(`${id}`).child('uid').val()
//                   db.ref(`teachers/${val}`).once('value', function(userSnapshot){
//                         const reset = userSnapshot.child('reset').val()
//                         reset == true ? setAlert(true) : getIds(id, setTeacherId, userUid, name, setUserSuccess, true)
//                   })
//             } else {
//                   setTeacherId(false)
//                   setUserSuccess(false)

//             }
//       })
// }

// function getIds(id, setTeacherId, userUid, name, setUserSuccess, mode){
//       ids.on('value', function(snapshot){  
//             var b = snapshot.child(id).exists();     
//             if (b === true){
//                   const val = snapshot.child(`${id}`).child('uid').val()
//                   db.ref(`teachers/${val}`).once('value', function(userSnapshot){
//                         const sumaConfig= userSnapshot.child('sumaConfig').val()
//                         db.ref(`users/${userUid}`).update({ sumaConfig,})
//                   })
//                   db.ref(`teachers/${val}`).once('value', function(userSnapshot){
//                         const restaConfig= userSnapshot.child('restaConfig').val()
//                         db.ref(`users/${userUid}`).update({ restaConfig,})
//                   })
//                   db.ref(`teachers/${val}`).once('value', function(userSnapshot){
//                         const multiplicacionConfig= userSnapshot.child('multiplicacionConfig').val()
//                         db.ref(`users/${userUid}`).update({ multiplicacionConfig,})
//                   })
//                   db.ref(`teachers/${val}`).once('value', function(userSnapshot){
//                         const divisionConfig= userSnapshot.child('divisionConfig').val()
//                         db.ref(`users/${userUid}`).update({ divisionConfig,})
//                   })

//                   db.ref(`teachers/${val}`).once('value', function(userSnapshot){
//                         const reset = userSnapshot.child('reset').val()
//                         reset == true && mode == true 
//                         ? db.ref(`users/${userUid}`).update({ 
//                               s: 0,
//                               r: 0,
//                               m: 0,
//                               d: 0,
//                               es: 0,
//                               er: 0,
//                               em: 0,
//                               ed: 0,
//                        })
//                        :''
//                   })

//                   let uidTeacher = snapshot.child(id).child('uid').val()
//                   db.ref(`teachers/${uidTeacher}/students/${userUid}`).set({ 
//                          name,
//                   })
//                   db.ref(`users/${userUid}`).update({ 
//                         id,
//                         nw: true,
//                  })
//                   setTeacherId(uidTeacher)
//                   setUserSuccess(true)
            
//             } else {
//                   setTeacherId(false)
//                   setUserSuccess(false)

//             }
//       })
// }
// function getCode(code, uid, setUserSuccess, account){
//       premiumCode.once('value', function(snapshot){  
//             var b = snapshot.child(code).exists();                
//             if (b === true ){
//                   var val = snapshot.child(code).val();
//                   if(val == false) {
//                         const us = account == true ? 'teachers' : 'users' 
//                         db.ref(`/premiumCode/${code}`).set(true)
//                         db.ref(`/${us}/${uid}/premium`).set(code)
//                         setUserSuccess(true)
//                   }else{
//                         console.log('ya esta en uso')
//                         setUserSuccess(false)
//                   }
//             } else {
//                console.log('no exist')
//                setUserSuccess(false)
//             }
//       })
// }



// function getProgress (setStudentsProgress, uid ){
//       dataTeachers.on('value', function(snapshot){  
//             var b = snapshot.child(`${uid}/students`).exists(); 
//             if (b === true){
//                   const array = []
//                   snapshot.child(`${uid}/students`).forEach(function(childSnapshot) { 
//                         db.ref(`/users/${childSnapshot.key}`).once('value', function(userSnapshot){
//                               const valName = userSnapshot.child('aName').val()
//                               const s = userSnapshot.child('s').val()
//                               const r = userSnapshot.child('r').val()
//                               const m = userSnapshot.child('m').val()
//                               const d = userSnapshot.child('d').val()
//                               const es = userSnapshot.child('es').val()
//                               const er = userSnapshot.child('er').val()
//                               const em = userSnapshot.child('em').val()
//                               const ed = userSnapshot.child('ed').val()
//                               const nw = userSnapshot.child('nw').val()
//                               const userUid = userSnapshot.child('uid').val()
//                               const obj = {
//                                     name: valName,
//                                     s,
//                                     r,
//                                     m,
//                                     d,
//                                     es,
//                                     er,
//                                     em,
//                                     ed,
//                                     nw,
//                                     userUid
//                               }
//                              array.push(obj)
//                           }) 
//                    })
//                    console.log(array)
//                    setStudentsProgress(array)
              
//             } else {
//                   setStudentsProgress(null)
//             }
//       })
// }

    





// function setProgress (n, account, op) {
//       const us = account == true ? 'teachers' : 'users' 
//       const uid = auth.currentUser.uid
//       switch (op){
//             case 's':
//                   db.ref(`${us}/${uid}`).update({s: n,})
//                   break;
//             case 'r':
//                   db.ref(`${us}/${uid}`).update({r: n,})
//                   break;
//             case 'm':
//                   db.ref(`${us}/${uid}`).update({m: n,})
//                   break;
//             case 'd':
//                   db.ref(`${us}/${uid}`).update({d: n,})
//             default:
//                   break;

//       }
// }
// function setErrors (n, account, op) {
//       const us = account == true ? 'teachers' : 'users' 
//       const uid = auth.currentUser.uid
//       switch (op){
//             case 's':
//                   db.ref(`${us}/${uid}`).update({es: n,})
//                   break;
//             case 'r':
//                   db.ref(`${us}/${uid}`).update({er: n,})
//                   break;
//             case 'm':
//                   db.ref(`${us}/${uid}`).update({em: n,})
//                   break;
//             case 'd':
//                   db.ref(`${us}/${uid}`).update({ed: n,})
//             default:
//                   break;

//       }
// }

// function avatarUpdate (n, account) {
//       const us = account == true ? 'teachers' : 'users' 
//       const uid = auth.currentUser.uid
//       db.ref(`${us}/${uid}`).update({avatar: n,})
// }
// function progressReset (account, s, r, m, d, msg, acc) {
//       const us = account == true ? 'teachers' : 'users' 
//       const uid = auth.currentUser.uid
//       if (us == 'teachers') { 
//             db.ref(`${us}/${uid}/students`).once('value', function(snapshot){
//                   snapshot.forEach(function(childSnapshot) {
//                         if(s == true){ db.ref(`users/${childSnapshot.key}`).update({s: 0, es: 0,}) }
//                         if(r == true){ db.ref(`users/${childSnapshot.key}`).update({r: 0, er: 0,}) }
//                         if(m == true){ db.ref(`users/${childSnapshot.key}`).update({m: 0, em: 0,}) }
//                         if(d == true){ db.ref(`users/${childSnapshot.key}`).update({d: 0, ed: 0,}) }
//                   });
//             });
        
//       }
//       if (us == 'users') {
//             if(s == true){ db.ref(`${us}/${uid}`).update({s: 0, es: 0,}) }
//             if(r == true){ db.ref(`${us}/${uid}`).update({r: 0, er: 0,}) }
//             if(m == true){ db.ref(`${us}/${uid}`).update({m: 0, em: 0,}) }
//             if(d == true){ db.ref(`${us}/${uid}`).update({d: 0, ed: 0,}) }
//       }
//       if (us == 'teacher' && msg == 'unity') {
//             if(s == true){ db.ref(`users/${acc}`).update({s: 0, es: 0,}) }
//             if(r == true){ db.ref(`users/${acc}`).update({r: 0, er: 0,}) }
//             if(m == true){ db.ref(`users/${acc}`).update({m: 0, em: 0,}) }
//             if(d == true){ db.ref(`users/${acc}`).update({d: 0, ed: 0,}) }
//       }
     
// }

// function userDelete (userUid) {
    
//       const uid = auth.currentUser.uid
//       db.ref(`${'/teachers'}/${uid}/students/${userUid}`).remove()
//       db.ref(`${'/users'}/${userUid}`).update({id: 'Te ha eliminado'})

// }
// function playDificult (account, dificultObject) {
//       const us = account == true ? 'teachers' : 'users' 
//       const uid = auth.currentUser.uid
//       if (us == 'teachers') { 
//             db.ref(`${us}/${uid}/students`).once('value', function(snapshot){
//                   snapshot.forEach(function(childSnapshot) {
//                   db.ref(`${'/users'}/${childSnapshot.key}`).update(dificultObject)
//                   });
//             });
//             db.ref(`${us}/${uid}`).update(dificultObject)

//       }
//       if (us == 'users') { 
//             db.ref(`${us}/${uid}`).update(dificultObject)
//       }
// }

// function newStudent (uid) {
//       db.ref(`users/${uid}`).update({nw : false})
// }
// function progressResetTeacher (mode) {
//       console.log(mode)
//       const uid = auth.currentUser.uid
//       db.ref(`teachers/${uid}`).update({reset : mode})
// }
// export { manageSimulacro, userDataUpdate, getFac, query, progressResetTeacher, newStudent, playDificult, userDelete, auth, onAuth, withFacebook, withGoogle, handleSignOut, dataUser, getIds, getProgress, getCode, avatarUpdate, progressReset, setProgress, setErrors }
