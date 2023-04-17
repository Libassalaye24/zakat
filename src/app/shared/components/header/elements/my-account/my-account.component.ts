import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";

  constructor(public router: Router , private authService: AuthService) {
    if (JSON.parse(localStorage.getItem("user"))) {
    } else {
    }
  }

  ngOnInit() {}

  logoutFunc() {
    this.authService.logOut();
    this.router.navigateByUrl('auth/login');
  }
}
