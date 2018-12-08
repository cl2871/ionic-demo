import { Component } from '@angular/core';
import { 
  Alert, 
  AlertController,
  Loading, 
  LoadingController,
  NavController
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public loading: Loading;

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) { }

  logout() {

    // toggle loading on
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    // perform logout
    this.authProvider.logout().then(
      res => {
        this.loading.dismiss().then(() => {
          // TODO: update the auth routing
          this.navCtrl.setRoot(LoginPage);
        });
      },
      err => {
        this.loading.dismiss().then(() => {
          const logoutErrorAlert: Alert = this.alertCtrl.create({
            message: err.message,
            buttons: [{ text: 'Ok', role: 'cancel'}]
          });
          logoutErrorAlert.present();
        })
      }
    );
  }

}
