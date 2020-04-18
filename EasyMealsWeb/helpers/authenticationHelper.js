import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import fetch from 'node-fetch'

async function mongoUserCheck(user, username) {
    if(typeof username === undefined) {
        username = user.displayName;
    }
    let body = JSON.stringify({
        username: username,
        email: user.email,
        uid: user.uid
        });
    const res = await fetch("http://localhost:8000/api/user/userCheck", {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    });
    return res;
}

//Create user with email and pass
export async function createWithEmail(username ,email, password) {
    try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const result = await mongoUserCheck(user.user, username);
    
        if(result.status === 200) {
            return 'OK';
        } else {
            signOut();
            return 'Cancel';
        }
    } catch (error) {
        return error;
    }
    // firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        
    // })
    // .catch(function(error) {
    //     return new Error(error);
    //   });
}

export async function signInWithEmail(email, password) {
    try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        const result = await mongoUserCheck(user.user);
    
        if(result.status === 200) {
            return 'OK';
        } else {
            signOut();
            return 'Cancel';
        }
    } catch (error) {
        return error;
    }
}

export function signOut() {
    firebase.auth().signOut();
}

export async function coke() {
    try {
        const res = await fetch("http://localhost:8000/api/user/cookee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
        });

    console.log(res)
    } catch (error) {
    console.log(error)
    }
}

export async function signInWithGoogle() {
    try {
        const { user } = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
        const idToken = await user.getIdToken();
        const body = JSON.stringify({
            username: user.displayName,
            email: user.email,
            uid: user.uid,
            idToken: idToken
        })
        const res = await fetch("http://localhost:8000/api/user/login", {
            method: "POST",
            body: body,
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
            });
        console.log(res)
        if(res.status === 200) {
            return 'OK';
        } else {
            signOut();
            return 'Cancel';
        }
    } catch (error) {
        return error;
    }

    // firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
    //     const result = await mongoUserCheck(user);
    //     if(!result) {
    //         return signOut();
    //     } else {
    //         return 'User sign in successfull';
    //     }
    // }).catch((error) => {
    //     return new Error(error);
    // })
}

export async function signInWithFacebook() {
    try {
        const user = await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
        const result = await mongoUserCheck(user.user);
    
        if(result.status === 200) {
            return 'OK';
        } else {
            signOut();
            return 'Cancel';
        }
    } catch (error) {
        return error;
    }
}

export async function signInWithTwitter() {
    try {
        const user = await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider());
        const result = await mongoUserCheck(user.user);
    
        if(result.status === 200) {
            return 'OK';
        } else {
            signOut();
            return 'Cancel';
        }
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