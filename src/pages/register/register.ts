import { Component, OnInit } from "@angular/core";
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;
  public loading: Loading;

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  register(): void {
    if (!this.registerForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.registerForm.value}`
      );
    } else {
      const email: string = this.registerForm.value.email;
      const password: string = this.registerForm.value.password;
  
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.authProvider.register(email, password).then(
        userCredentials => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(TabsPage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const registerErrorAlert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            registerErrorAlert.present();
          });
        }
      );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
}