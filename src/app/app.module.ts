import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReceiptCalculationComponent } from "./receipt-calculation/receipt-calculation.component";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [AppComponent, ReceiptCalculationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    NoopAnimationsModule,
    MatCardModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
