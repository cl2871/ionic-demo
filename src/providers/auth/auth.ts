import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class AuthProvider {

  constructor() {

  }

  login(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        // Add new user and set the user's email
        firebase.database()
          .ref(`/userProfile/${newUser.user.uid}/email`)
          .set(email);
      });
  }

  // Sends a password reset email to the provided email
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // Turn off database references then log out the user
  logout(): Promise<void> {
    const uid: string = firebase.auth().currentUser.uid;
    firebase
      .database().ref(`/userProfile/${uid}`).off();
    return firebase.auth().signOut();
  }

}
