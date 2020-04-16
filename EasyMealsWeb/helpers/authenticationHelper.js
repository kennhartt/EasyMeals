import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

//Create user with email and pass
export function createWithEmail(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        return new Error(error);
      });
}

export function signInWithEmail(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        return new Error(error);
      });
}

export function signOut() {
    firebase.auth().signOut().then(() => {
        return 'Sign Out Success';
      }).catch((error) => {
        return new Error(error);
      });
}

export function signInWithGoogle() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        return 'Signin Success'
    }).catch((error) => {
        return new Error(error);
    })
}

export function signInWithFacebook() {
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
        return 'Signin Success'
    }).catch((error) => {
        return new Error(error);
    })
}

export function signInWithTwitter() {
    firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(() => {
        return 'Signin Success';
    }).catch((error) => {
        return new Error(error);
    })
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