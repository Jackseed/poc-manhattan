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

  // Financing variables
  patheInvestment = 1500;
  partnerRatio = 0.5;
  partnerInvestment = this.patheInvestment * this.partnerRatio;

  // CNC Support
  theatricalCNCSupport = 0;
  videoCNCSupport = 0;
  tvCNCSupport = 0;
  increaseSupport = 0;
  increaseRate = 0.15;
  totalCNCSupport = 0;

  // Receipt & expenses
  theatricalReceipts = 2600;
  theatricalExpenses = 1150;
  // TODO: calculate this
  distributionTheatricalSupport = 354.45;
  netTheatricalMargin =
    this.theatricalReceipts +
    this.distributionTheatricalSupport -
    this.theatricalExpenses;
  tvReceipts = 600;
  videoReceipts = 312.32;
  distributionVideoSupport = 14.06;
  videoExpenses = 137;
  netVideoMargin =
    this.videoReceipts + this.distributionVideoSupport - this.videoExpenses;
  vodReceipts = 299;
  exportReceipts = 816;
  exportExpenses = 56;
  netExportMargin = this.exportReceipts - this.exportExpenses;
  totalMargin =
    this.netTheatricalMargin +
    this.netVideoMargin +
    this.vodReceipts +
    this.tvReceipts +
    this.netExportMargin;

  // partner shares
  partnerMarginShare = 0;
  partnerSupportShare = 0;
  partnerAydShare = 0;
  partnerMargin = 0;

  // sum up variables
  totalAydShare = 0;
  patheTotalSupport = 0;
  aydAndPartnerShare = 0;
  patheTotalMargin = 0;

  receiptTypes = [
    "Distribution fees",
    "Expenses recouped",
    "Net receipts repartition",
    "CNC financial support",
  ];

  constructor() {}

  ngOnInit() {
    this.receiptRights = ROYALTIES;
    this.events = EVENTS;
    this.rights = RIGHTS;
  }

  public getRNPP() {
    this.getIncome(
      "originTheatrical",
      this.theatricalReceipts,
      "originTheatrical"
    );
    this.getIncome("originTv", this.tvReceipts, "originTv");
    this.getIncome("originVideo", this.videoReceipts, "originVideo");
    this.getIncome("originVod", this.vodReceipts, "originVod");
    this.getIncome("rowAllRights", this.exportReceipts, "rowAllRights");
    this.getCNCSupport();
    this.getTotalAydShareReceipts();
    this.getPatheSupport();
    this.getPartnerShares();
    this.getAydAndPartnerShares();
    this.getTotalPatheMargin();
  }
  private getCNCSupport() {
    this.getCNCFinancialSupport("originTheatrical", 1000);
    this.getCNCFinancialSupport("originTv", 600);
    this.getCNCFinancialSupport("originVideo", 312.32);
    this.splitCNCFinancialSupport();
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
      console.log("launching cashin with ", activatedReceiptRights);
      remainingReceipt = this.cashIn(
        rightId,
        after,
        activatedReceiptRights,
        receipt
      );
    }
    // if there is still receipts, the function is called again with current receiptRightId as after
    if (remainingReceipt > 0) {
      this.getIncome(rightId, remainingReceipt, activatedReceiptRights[0].id);
    }
  }

  private cashIn(
    from: string,
    after: string,
    cashingInRights: ReceiptRight[],
    receipts: number
  ): number {
    let cashIn: number;
    let remainingReceipts: number;

    cashingInRights.forEach((cashingInRight) => {
      cashingInRight.blocks.forEach((block) => {
        // verify if the block is concerned by the cash in & if there is still money to split
        if (block.from === from && block.after === after) {
          // calculates the money that should be cashed in
          const potentialCashIn = receipts * (block.percentage / 100);
          cashIn = potentialCashIn;

          // check if there are conditions
          if (block.if) {
            // find the corresponding event
            const ifEvent = this.events.find((event) => event.id === block.if);
            // if the condition is invalid, return
            if (!this.isIfValid(ifEvent)) {
              return;
            }
          } else if (block.until) {
            // find the corresponding event
            const untilEvent = this.events.find(
              (event) => event.id === block.until
            );
            // check event impact
            cashIn = this.getUntilCashIn(
              cashingInRight,
              untilEvent,
              potentialCashIn
            );
          }

          // cash in the according amount
          cashingInRight.cashedIn = cashingInRight.cashedIn + cashIn;

          // reduce the remaining receipts
          receipts - cashIn > 0
            ? (remainingReceipts = receipts - cashIn)
            : (remainingReceipts = 0);

          console.log(
            "cashing in: ",
            receipts,
            "cashed in rights: ",
            cashingInRight,
            "from: ",
            from,
            "after",
            after,
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
      // verify that the event is a "closed" one
      if (e.ref === receiptRight.id) {
        authorizedCashIn = (e.percentage * receiptRight.amount) / 100;
        // verify if the max has already been reached
        if (receiptRight.cashedIn >= authorizedCashIn) {
          cashIn = 0;
          // otherwise cash in the minimum between authorized and potential
        } else {
          receiptRight.cashedIn + potentialCashIn > authorizedCashIn
            ? (cashIn = authorizedCashIn - receiptRight.cashedIn)
            : (cashIn = potentialCashIn);
        }
      }
    });
    return cashIn;
  }

  // Check if the if condition is valid or not
  // TODO: use condition intersection / union
  public isIfValid(event: Events): boolean {
    let isValid: boolean;
    event.events.forEach((e) => {
      // get the corresponding receipt right
      const receiptRight = this.getReceiptRightById(e.ref);
      receiptRight.cashedIn / receiptRight.amount >= e.percentage / 100
        ? (isValid = true)
        : (isValid = false);
    });
    return isValid;
  }

  private getCNCFinancialSupport(rightsId: string, receipt: number) {
    const ticketPrice = 6.01;
    const TSA = 0.1072;
    const firstStep = 1500;
    const firstRate = 1.25;
    const secondStep = 5000;
    const secondRate = 0.95;
    const thirdRate = 0.1;
    const videoRate = 0.045;

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
      this.theatricalCNCSupport = this.theatricalCNCSupport * 0.93;
      console.log("Theatrical support: ", this.theatricalCNCSupport);
    } else if (rightsId === "originVideo") {
      this.videoCNCSupport = receipt * videoRate;
      console.log("Video support: ", this.videoCNCSupport);
    } else if (rightsId === "originTv") {
      this.tvCNCSupport = 90;
      console.log("TV support: ", this.tvCNCSupport);
    }
    this.totalCNCSupport =
      this.theatricalCNCSupport + this.videoCNCSupport + this.tvCNCSupport;
  }

  private splitCNCFinancialSupport() {
    this.getIncome(
      "theatricalSupport",
      this.theatricalCNCSupport,
      "theatricalSupport"
    );
    this.getIncome("videoSupport", this.videoCNCSupport, "videoSupport");
    this.getIncome("tvSupport", this.tvCNCSupport, "tvSupport");
    this.getIncreasedFinancialSupport();
  }

  private getIncreasedFinancialSupport() {
    const patheSupportReceiptRight = this.receiptRights.find(
      (receiptRight) => receiptRight.id === "PatheCNCSupport"
    );
    this.increaseSupport =
      patheSupportReceiptRight.cashedIn * this.increaseRate;
  }

  private getTotalAydShareReceipts() {
    const ayd = this.getReceiptRightById("RNPPAyd").cashedIn;
    const aydTv = this.getReceiptRightById("RNPPAydTv").cashedIn;
    const aydTvBrodcaster = this.getReceiptRightById("TVBroadcasterRNPP")
      .cashedIn;
    this.totalAydShare = ayd + aydTv + aydTvBrodcaster + this.partnerMargin;
  }

  private getPatheSupport() {
    this.patheTotalSupport = this.getReceiptRightById(
      "PatheCNCSupport"
    ).cashedIn;
  }

  private getPartnerShares() {
    this.partnerMarginShare = this.totalMargin / 2;
    this.partnerSupportShare = this.patheTotalSupport / 2;
    this.partnerAydShare = this.totalAydShare / 2;
    this.partnerMargin =
      this.partnerMarginShare +
      this.partnerSupportShare -
      this.partnerAydShare -
      this.partnerInvestment;
  }

  private getAydAndPartnerShares() {
    this.aydAndPartnerShare = this.totalAydShare + this.partnerMargin;
  }

  private getTotalPatheMargin() {
    this.patheTotalMargin =
      this.totalMargin +
      this.patheTotalSupport +
      this.increaseSupport -
      this.aydAndPartnerShare -
      this.patheInvestment;
  }

  private getReceiptRightById(receiptRightId: string): ReceiptRight {
    const receiptRight = this.receiptRights.find(
      (rr) => rr.id === receiptRightId
    );
    return receiptRight;
  }
}
