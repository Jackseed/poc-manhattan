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
    const firstStepReceiptRights = receiptRights.filter((receiptRight) =>
      receiptRight.blocks.find((block) => !!!block.after)
    );
    console.log("first step: ", firstStepReceiptRights);
    // cashed in
    receipt = this.cashIn(1, rightId, false, firstStepReceiptRights, receipt);

    // then need to find those after
    const secondStepReceiptRights = receiptRights.filter((receiptRight) =>
      receiptRight.blocks.find(
        (block) => block.after === firstStepReceiptRights[0].id
      )
    );
    console.log("second step rights: ", secondStepReceiptRights);

    // and cash in again
    receipt = this.cashIn(
      2,
      rightId,
      firstStepReceiptRights[0].id,
      secondStepReceiptRights,
      receipt
    );
  }

  private cashIn(
    step: number,
    from: string,
    after: string | boolean,
    receiptRights: ReceiptRight[],
    receipt: number
  ): number {
    receiptRights.forEach((receiptRight) => {
      receiptRight.blocks.forEach((block) => {
        // same verification as before
        if (this.checkCorrectStep(step, block, from, after) && receipt > 0) {
          const cashingRight = this.receiptRight.find(
            (rr) => rr.id === receiptRight.id
          );
          cashingRight.cashedIn =
            cashingRight.cashedIn + receipt * (block.percentage / 100);
          receipt = receipt - (receipt * block.percentage) / 100;
          console.log(
            "cashed in rights: ",
            cashingRight,
            "remaining receipts: ",
            receipt
          );
        }
      });
    });
    return receipt;
  }

  private checkCorrectStep(
    step: number,
    block: {
      percentage: number;
      if?: string;
      from?: string;
      after?: string;
      until?: string;
    },
    from: string,
    after: string | boolean
  ): boolean {
    let isCorrect: boolean;
    if (step === 1) {
      block.from === from && !!block.after === after
        ? (isCorrect = true)
        : (isCorrect = false);
    } else if (step === 2) {
      block.from === from && block.after === after
        ? (isCorrect = true)
        : (isCorrect = false);
    }
    return isCorrect;
  }
}
