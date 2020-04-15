import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

//Create user with email and pass
export function createWithEmail(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        return error;
      });
}

export function signInWithEmail(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        return error;
      });
}

export function signOut() {
    firebase.auth().signOut().then(() => {
        return 'Sign Out Success';
      }).catch((error) => {
        return error;
      });
}

export function signInWithGoogle() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        return 'Signin Success'
    }).catch((error) => {
        return error;
    })
}

export function signInWithFacebook() {
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
        return 'Signin Success'
    }).catch((error) => {
        return error;
    })
}

export function signInWithTwitter() {
    firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(() => {
        return 'Signin Success'
    }).catch((error) => {
        return error;
    })
}