import firebase from 'firebase/app'
import 'firebase/auth'
import fetch from 'node-fetch'

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

//To get csrf cookie, call it before login requests
export async function getCsrfToken() {
    try {
        await fetch("http://localhost:8000/api/user/csrfToken",{
            method: 'GET',
            credentials: 'include'
        })
        return true
    } catch (error) {
        return error
    }
}

//Login function for after getting user from firebase
async function login(user, username) {
    try {
        if(username === undefined) {
            username = user.displayName
        }
        const idToken = await user.getIdToken();
        await getCsrfToken();
        const body = JSON.stringify({
            username: username,
            email: user.email,
            uid: user.uid,
            idToken: idToken
            })
        const res = await fetch("http://localhost:8000/api/user/login", {
            method: "POST",
            body: body,
            headers: { "Content-Type": "application/json", "csrf-token": getCookie("csrf-token") },
            credentials: 'include'
            });
    
        if(res.status === 200) {
            return 'OK';
        } else {
            firebase.auth().signOut()
            return 'Login Failed';
        }
    } catch (error) {
        firebase.auth().signOut()
        return 'Login Failed';
    }
}

//Create user with email and pass, need to pass a username email and password from the form
export async function createWithEmail(username ,email, password) {
    try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return await login(user, username)
    } catch (error) {
        return error;
    }
}

export async function signInWithEmail(email, password) {
    try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
        return await login(user)
    } catch (error) {
        return error;
    }
}

export async function signOut() {
    try{
        const res = await fetch("http://localhost:8000/api/user/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json", "csrf-token": getCookie('csrf-token') },
            credentials: 'include'
        });
        
        if(res.status === 200) {
            firebase.auth().signOut();
        }
        
    } catch (error) {
        console.log(error)
    }
    
}


export async function signInWithGoogle() {
    try {
        const { user } = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
        return await login(user)
    } catch (error) {
        return error;
    }
}

export async function signInWithFacebook() {
    try {
        const { user } = await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
        return await login(user)
    } catch (error) {
        return error;
    }
}

export async function signInWithTwitter() {
    try {
        const { user } = await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider());
        return await login(user)
    } catch (error) {
        return error;
    }
}

export function changeEmail(user, password, newEmail) {
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);

    user.reauthenticateWithCredential(credential).then(() => {
        user.updateEmail(newEmail).then(() => {
            return 'Email changed successfully'
        }).catch(error => {
            return new Error(error);
        })
    }).catch(error => {
        return new Error(error);
    });
}

export function changePassword(user, oldPassword, newPassword) {
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);

    user.reauthenticateWithCredential(credential).then(() => {
        user.updatePassword(newPassword).then(() => {
            return 'Password changed successfully'
        }).catch(error => {
            return new Error(error);
        })
    }).catch(error => {
        return new Error(error);
    });
}