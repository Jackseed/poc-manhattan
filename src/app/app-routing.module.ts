import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReceiptCalculationComponent } from "./receipt-calculation/receipt-calculation.component";

const routes: Routes = [
  {
    path: "home",
    component: ReceiptCalculationComponent,
  },
  {
    path: "**",
    redirectTo: "/home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
