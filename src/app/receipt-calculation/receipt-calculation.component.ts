import { Component, OnInit } from "@angular/core";
import { ROYALTIES, EVENTS, RIGHTS } from "../data";

@Component({
  selector: "app-receipt-calculation",
  templateUrl: "./receipt-calculation.component.html",
  styleUrls: ["./receipt-calculation.component.scss"],
})
export class ReceiptCalculationComponent implements OnInit {
  receiptRight: ReceiptRight[];
  events: Events[];
  rights: Right[];
  

  constructor() {}

  ngOnInit() {
    this.receiptRight = ROYALTIES;
    this.events = EVENTS;
    this.rights = RIGHTS;
  }
}
