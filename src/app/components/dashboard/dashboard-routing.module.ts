import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { CryptoComponent } from "./crypto/crypto.component";
import { DefaultComponent } from "./default/default.component";
// import { EcommerceComponent } from "./ecommerce/ecommerce.component";
import { CharityDashboardComponent } from "./charity-dashboard/charity-dashboard.component";
// import { OnlineCourseComponent } from "./online-course/online-course.component";
// import { SocialComponent } from "./social/social.component";

const routes: Routes = [
  {
    path: "",
    children: [
      // {
      //   path: "default",
      //   component: DefaultComponent,
      // },
      // {
      //   path: "ecommerce",
      //   component: EcommerceComponent,
      // },
      // {
      //   path: "online-course",
      //   component: OnlineCourseComponent,
      // },
      // {
      //   path: "crypto",
      //   component: CryptoComponent,
      // },
      // {
      //   path: "social",
      //   component: SocialComponent,
      // },
      {
        path: "",
        component: CharityDashboardComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
