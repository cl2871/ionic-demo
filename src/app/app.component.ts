import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase/app';
import 'firebase/auth';

import { TabsPage } from '../pages/tabs/tabs';
import { firebaseConfig } from './credentials';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage: any;
  authObserver: firebase.Unsubscribe;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      
      firebase.initializeApp(firebaseConfig);

      // Reroute user depending on auth state changes (login/logout events)
      this.authObserver = firebase.auth().onAuthStateChanged(
        user => {
          if (!user) {
            this.rootPage = 'LoginPage';
          } else {
            this.rootPage = TabsPage;
          }
        }
      )
    });
  }

  ngOnDestroy() {
    // Unsubscribe from firebase user's auth state changes
    this.authObserver();
  }
}
