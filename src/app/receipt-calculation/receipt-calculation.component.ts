import { Component, OnInit } from "@angular/core";
import { ROYALTIES, EVENTS, RIGHTS } from "../data";

@Component({
  selector: "app-receipt-calculation",
  templateUrl: "./receipt-calculation.component.html",
  styleUrls: ["./receipt-calculation.component.scss"],
})
export class ReceiptCalculationComponent implements OnInit {
  receiptRights: ReceiptRight[];
  events: Events[];
  rights: Right[];
  theatricalCNCSupport: number;
  videoCNCSupport: number;
  tvCNCSupport: number;
  increaseSupport: number;
  totalCNCSupport: number;

  constructor() {}

  ngOnInit() {
    this.receiptRights = ROYALTIES;
    this.events = EVENTS;
    this.rights = RIGHTS;
  }

  public getRNPP() {
    this.getIncome("originTheatrical", 2600, "originTheatrical");
    this.getIncome("originTv", 600, "originTv");
    this.getIncome("originVideo", 312.32, "originVideo");
    this.getIncome("originVod", 299, "originVod");
    this.getIncome("rowAllRights", 816, "rowAllRights");
    this.getCNCSupport();
  }
  private getCNCSupport() {
    this.CNCFinancialSupport("originTheatrical", 1000);
    this.CNCFinancialSupport("originTv", 600);
    this.CNCFinancialSupport("originVideo", 312.32);
  }

  // after is a receiptRightId, it enables this function to be recursive
  private getIncome(rightId: string, receipt: number, after: string) {
    let remainingReceipt: number;

    // get all the receipt rights concerned by this right
    const receiptRights = this.receiptRights.filter((rr) =>
      rr.blocks.find((block) => block.from === rightId)
    );

    // then find receipt rights that activates with this "after"
    const activatedReceiptRights = receiptRights.filter((receiptRight) =>
      receiptRight.blocks.find((block) => block.after === after)
    );

    if (activatedReceiptRights.length > 0) {
      // activate these rights by cashing in the incoming receipts
      remainingReceipt = this.cashIn(
        rightId,
        after,
        activatedReceiptRights,
        receipt
      );
    }
    // if there is still receipts, the function is called again with current receipt right id as after
    if (remainingReceipt > 0) {
      this.getIncome(rightId, remainingReceipt, activatedReceiptRights[0].id);
    }
  }

  private cashIn(
    from: string,
    after: string,
    cashingInRights: ReceiptRight[],
    receipt: number
  ): number {
    let cashIn: number;
    let remainingReceipts: number;

    cashingInRights.forEach((cashingInRight) => {
      cashingInRight.blocks.forEach((block) => {
        // verify if the block is concerned by the cash in
        if (block.from === from && block.after === after) {
          // calculates the money that should be cashed in
          const potentialCashIn =
            cashingInRight.cashedIn + receipt * (block.percentage / 100);

          // check if there is a condition
          if (block.until) {
            // find the corresponding event
            const untilEvent = this.events.find(
              (event) => event.id === block.until
            );
            // check event impact
            cashIn = Math.round(
              this.getUntilCashIn(cashingInRight, untilEvent, potentialCashIn)
            );
          } else {
            cashIn = Math.round(potentialCashIn);
          }

          // cash in the according amount
          cashingInRight.cashedIn = cashIn;

          // reduce the remaining receipts
          receipt - cashIn > 0
            ? (remainingReceipts = Math.round(receipt - cashIn))
            : (remainingReceipts = 0);

          console.log(
            "cashed in rights: ",
            cashingInRight,
            "remaining receipts: ",
            remainingReceipts
          );
        }
      });
    });
    return remainingReceipts;
  }

  // this function works only for "closed" events (related to themselves)
  // TODO: generalize it
  private getUntilCashIn(
    receiptRight: ReceiptRight,
    event: Events,
    potentialCashIn: number
  ): number {
    let authorizedCashIn: number;
    let cashIn: number;

    event.events.forEach((e) => {
      // verifies that the event is a "closed" one
      if (e.ref === receiptRight.id) {
        authorizedCashIn = (e.percentage * receiptRight.amount) / 100;

        potentialCashIn > authorizedCashIn
          ? (cashIn = authorizedCashIn)
          : (cashIn = potentialCashIn);
      }
    });
    return cashIn;
  }

  private CNCFinancialSupport(rightsId: string, receipt: number) {
    const ticketPrice = 6.01;
    const TSA = 0.1072;
    const firstStep = 1500;
    const firstRate = 1.25;
    const secondStep = 5000;
    const secondRate = 0.95;
    const thirdRate = 0.1;
    const videoRate = 0.045;
    const increaseRate = 0.015;

    if (rightsId === "originTheatrical") {
      if (receipt > secondStep) {
        const firstStepSupport = firstStep * firstRate * ticketPrice * TSA;
        const secondStepSupport =
          (secondStep - firstStep) * secondRate * ticketPrice * TSA;
        const thirdStepSupport =
          (receipt - secondStep) * thirdRate * ticketPrice * TSA;
        this.theatricalCNCSupport =
          firstStepSupport + secondStepSupport + thirdStepSupport;
      } else if (receipt > firstStep) {
        const firstStepSupport = firstStep * firstRate * ticketPrice * TSA;
        const secondStepSupport =
          (receipt - firstStep) * secondRate * ticketPrice * TSA;
        this.theatricalCNCSupport = firstStepSupport + secondStepSupport;
      } else {
        this.theatricalCNCSupport = receipt * firstRate * ticketPrice * TSA;
      }
      this.theatricalCNCSupport = Math.round(this.theatricalCNCSupport * 0.93);
      console.log("Theatrical support: ", this.theatricalCNCSupport);
    } else if (rightsId === "originVideo") {
      this.videoCNCSupport = Math.round(receipt * videoRate);
      console.log("Video support: ", this.videoCNCSupport);
    } else if (rightsId === "originTv") {
      this.tvCNCSupport = 90;
      console.log("TV support: ", this.tvCNCSupport);
    }
    this.totalCNCSupport =
      this.theatricalCNCSupport + this.videoCNCSupport + this.tvCNCSupport;
    console.log("Total CNC support: ", this.totalCNCSupport);
    /*     this.increaseSupport = this.totalCNCSupport * increaseRate;
    console.log("increase support: ", this.increaseSupport); */
  }
}
