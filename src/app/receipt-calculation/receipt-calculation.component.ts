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
    this.getIncome("originTheatrical", 2600);
    this.getIncome("originTv", 600);
    this.getIncome("originVideo", 312.32);
    this.getIncome("originVod", 299);
    this.getIncome("rowAllRights", 816);
    this.getCNCSupport();
  }
  private getCNCSupport() {
    this.CNCFinancialSupport("originTheatrical", 1000);
    this.CNCFinancialSupport("originTv", 600);
    this.CNCFinancialSupport("originVideo", 312.32);
  }

  private getIncome(rightId: string, receipt: number) {
    const right = this.rights.find((r) => r.id === rightId);
    // get all the receipt rights concerned by this right
    const receiptRights = this.receiptRights.filter((rr) =>
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
    receipt = this.cashIn(true, rightId, false, firstStepReceiptRights, receipt);

    // then need to find those after
    const secondStepReceiptRights = receiptRights.filter((receiptRight) =>
      receiptRight.blocks.find(
        (block) => block.after === firstStepReceiptRights[0].id
      )
    );
    console.log("second step rights: ", secondStepReceiptRights);

    // and cash in again
    receipt = this.cashIn(
      false,
      rightId,
      firstStepReceiptRights[0].id,
      secondStepReceiptRights,
      receipt
    );

    // same for 3rd step
    if (secondStepReceiptRights.length > 0) {
      const thirdStepReceiptRights = receiptRights.filter((receiptRight) =>
        receiptRight.blocks.find(
          (block) => block.after === secondStepReceiptRights[0].id
        )
      );
      console.log("third step rights: ", thirdStepReceiptRights);

      // and cash in again
      receipt = this.cashIn(
        2,
        rightId,
        secondStepReceiptRights[0].id,
        thirdStepReceiptRights,
        receipt
      );
    }
  }

  private cashIn(
    isFirst: boolean,
    from: string,
    after: string | boolean,
    receiptRights: ReceiptRight[],
    receipt: number
  ): number {
    receiptRights.forEach((receiptRight) => {
      receiptRight.blocks.forEach((block) => {
        // same verification as before
        if (this.checkCorrectStep(isFirst, block, from, after) && receipt > 0) {
          const cashingRight = this.receiptRights.find(
            (rr) => rr.id === receiptRight.id
          );
          const potentialCashIn =
            cashingRight.cashedIn + receipt * (block.percentage / 100);
          let cashIn: number;
          if (block.until) {
            const untilEvent = this.events.find(
              (event) => event.id === block.until
            );
            cashIn = Math.round(
              this.getUntilCashIn(cashingRight, untilEvent, potentialCashIn)
            );
          } else {
            cashIn = Math.round(potentialCashIn);
          }
          cashingRight.cashedIn = cashIn;
          receipt - cashIn > 0
            ? (receipt = Math.round(receipt - cashIn))
            : (receipt = 0);
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
    isFirst: boolean,
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
    if (isFirst) {
      block.from === from && !!block.after === after
        ? (isCorrect = true)
        : (isCorrect = false);
    } else {
      block.from === from && block.after === after
        ? (isCorrect = true)
        : (isCorrect = false);
    }
    return isCorrect;
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
        console.log(
          "authorized cash in: ",
          authorizedCashIn,
          "potential cash in: ",
          potentialCashIn
        );
        potentialCashIn > authorizedCashIn
          ? (cashIn = authorizedCashIn)
          : (cashIn = potentialCashIn);
      }
    });
    console.log(cashIn);
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
