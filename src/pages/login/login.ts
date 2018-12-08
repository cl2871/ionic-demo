import { Component, OnInit } from '@angular/core';
import { 
  Alert,
  AlertController,
  IonicPage, 
  Loading,
  LoadingController,
  NavController, 
  NavParams 
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  login(): void {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`
      );
    }
    else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // toggle loading on
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      // perform login
      this.authProvider.login(email, password).then(
        userCredentials => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(TabsPage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const loginErrorAlert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel'}]
            });
            loginErrorAlert.present();
          })
        }
      );
    }
  }

  goToRegister(): void {
    this.navCtrl.push('RegisterPage');
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
