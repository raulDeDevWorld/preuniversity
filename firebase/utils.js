import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get , set, update, onValue, child, } from "firebase/database";
import { firebaseConfig } from './config'


const app = initializeApp(firebaseConfig);

const auth = getAuth();

const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();


//----------------------------------Authentication------------------------------------------


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
const premiumCode = ref(db, '/premiumCode');
const ids = ref(db, '/ids')




function onAuth(setUserProfile, setUserData) {
      return onAuthStateChanged(auth, (user) => {
            if (user) {
                  setUserProfile(user)
                  getData(user, setUserData)
            } else {
                  setUserProfile(user)
            }
      });
}

  

function getData (user, setUserData){
      get(data).then((snapshot) => {
            var b = snapshot.child(user.uid).exists();               
            if (b == true) {
                  let obj = snapshot.val() 
                  setUserData(obj[user.uid])
            } else {
                  setUserData(null)
            }
          }).catch((error) => {
            console.error(error);
          });
}

function dataUser (aName, school, cell, avatar) {
      const name = auth.currentUser.displayName
      const uid = auth.currentUser.uid
     

      set(ref(db, `users/${uid}`), {
            name,
            aName,
            school,
            cell,
            avatar,
            premium: false,
            uid,
          })
          .then(() => {
            // Data saved successfully!
          })
          .catch((error) => {
            // The write failed...
          });
}

function userDataUpdate (object) {
      const uid = auth.currentUser.uid

      update(ref(db, `users/${uid}`), object)
}

function getFac (university, setUniversityData) {

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



function manageSimulacro (materia, university, setUserSimulacro) {
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
export { manageSimulacro, userDataUpdate, getFac,  onAuth, withFacebook, withGoogle, handleSignOut, dataUser }
