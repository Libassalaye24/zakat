import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public newUser = false;
  // public user: firebase.User;
  public loginForm: FormGroup;
  public show: boolean = false
  public errorMessage: any;

  // constructor(private fb: FormBuilder, public router: Router) {
  //   this.loginForm = this.fb.group({
  //     email: ["Test@gmail.com", [Validators.required]],
  //     password: ["test123", Validators.required],
  //   });
  // }



  // login() {
  //   if (this.loginForm.value["email"] == "Test@gmail.com" && this.loginForm.value["password"] == "test123") {
  //     let user = {
  //       email: "Test@gmail.com",
  //       password: "test123",
  //       name: "test user",
  //     };
  //     localStorage.setItem("user", JSON.stringify(user));
  //     this.router.navigate(["/dashboard/default"]);
  //   }
  // }
  phone: string;
  password: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router , private toastr : ToastrService) {
        this.loginForm = this.fb.group({
          phone: [this.phone, [Validators.required]],
          password: [this.password, Validators.required],
        });
   }
  ngOnInit() {}
  login() {
    this.authService.login(`221${this.phone}`, this.password)
      
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log("error "+error);
        this.toastr.error("Incorrect number phone or password.");
        console.error(error);
      });
  }
  logOut(){
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }
  showPassword(){
    this.show = !this.show
  }
}
