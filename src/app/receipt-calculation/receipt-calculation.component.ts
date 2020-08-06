import { Component, OnInit } from "@angular/core";
import { ROYALTIES, EVENTS, RIGHTS, RECEIPTS } from "../data";

@Component({
  selector: "app-receipt-calculation",
  templateUrl: "./receipt-calculation.component.html",
  styleUrls: ["./receipt-calculation.component.scss"],
})
export class ReceiptCalculationComponent implements OnInit {
  receiptRight: ReceiptRight[];
  events: Events[];
  rights: Right[];
  receipts;

  constructor() {}

  ngOnInit() {
    this.receiptRight = ROYALTIES;
    this.events = EVENTS;
    this.rights = RIGHTS;
    this.receipts = RECEIPTS;
  }

  public calculateRNPP(rightId: string, receipt: number) {
    const right = this.rights.find((r) => r.id === rightId);
    // get all the receipt rights concerned by this right
    const receiptRights = this.receiptRight.filter((rr) =>
      rr.blocks.find((block) => block.from === rightId)
    );
    console.log(receiptRights);

    // first, need to find receipts rights based on brut receipts
    // (i.e they come after nothing)
    const firstStepReceiptRights = receiptRights.filter((rr) =>
      rr.blocks.find((block) => !!!block.after)
    );
    console.log(firstStepReceiptRights);

    // cashed in
    firstStepReceiptRights.forEach((receiptRight) => {
      receiptRight.blocks.forEach((block) => {
        // same verification as before
        if (block.from === rightId && !!!block.after) {
          const cashingRight = this.receiptRight.find(
            (rr) => rr.id === receiptRight.id
          );
          cashingRight.cashedIn =
            cashingRight.cashedIn + receipt * (block.percentage / 100);
          console.log(cashingRight);
        }
      });
    });
  }
}
