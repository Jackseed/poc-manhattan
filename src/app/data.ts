export const ROYALTIES: ReceiptRight[] = [
  {
    id: "originTheatricalDistributionFees",
    rights: ["originTheatrical"],
    blocks: [
      {
        percentage: 20,
        fromRight: "originTheatrical",
      },
    ],
  },
  {
    id: "originTvDistributionFees",
    rights: ["originTv"],
    blocks: [
      {
        percentage: 20,
        fromRight: "originTv",
      },
    ],
  },
  {
    id: "originVideoDistributionFees",
    rights: ["originVideo"],
    blocks: [
      {
        percentage: 20,
        fromRight: "originVideo",
      },
    ],
  },
  {
    id: "originVodDistributionFees",
    rights: ["originVod"],
    blocks: [
      {
        percentage: 20,
        fromRight: "originVod",
      },
    ],
  },
  {
    id: "rowAllRightsDistributionFees",
    rights: ["rowAllRights"],
    blocks: [
      {
        percentage: 20,
        fromRight: "rowAllRights",
      },
    ],
  },
  {
    id: "originTheatricalExpenses",
    rights: ["originTheatrical"],
    amount: 1150,
    blocks: [
      {
        percentage: 100,
        fromReceiptRight: "originTheatricalDistributionFees",
        to: "originTheatricalExpensesRecouped",
      },
    ],
  },
  {
    id: "originVideoExpenses",
    rights: ["originVideo"],
    amount: 137,
    blocks: [
      {
        percentage: 100,
        fromReceiptRight: "originVideoDistributionFees",
        to: "originVideoExpensesRecouped",
      },
    ],
  },
  {
    id: "rowExpenses",
    rights: ["rowAllRights"],
    amount: 56,
    blocks: [
      {
        percentage: 100,
        fromReceiptRight: "rowAllRightsDistributionFees",
        to: "rowExpensesRecouped",
      },
    ],
  },
  {
    id: "MG",
    rights: ["originTheatrical", "originVideo", "originVod", "rowAllRights"],
    blocks: [
      {
        percentage: 100,
        fromEvent: "originTheatricalExpensesRecouped",
        to: "MGRecouped",
      },
      {
        percentage: 100,
        fromEvent: "originVideoExpensesRecouped",
        to: "MGRecouped",
      },
      {
        percentage: 100,
        fromEvent: "rowExpensesRecouped",
        to: "MGRecouped",
      },
    ],
  },
  {
    id: "originTheatricalReceipt",
    rights: ["originTheatrical"],
    blocks: [
      {
        percentage: 38,
      },
    ],
  },
];

export const EVENTS: Events[] = [
  {
    id: "originTheatricalExpensesRecouped",
    events: [
      {
        ref: "originTheatricalExpenses",
        percentage: 100,
      },
    ],
  },
  {
    id: "originVideoExpensesRecouped",
    events: [
      {
        ref: "originVideoExpenses",
        percentage: 100,
      },
    ],
  },
  {
    id: "rowExpensesRecouped",
    events: [
      {
        ref: "rowExpenses",
        percentage: 100,
      },
    ],
  },
  {
    id: "MGRecouped",
    events: [
      {
        ref: "MG",
        percentage: 100,
      },
    ],
  },
];

export const RIGHTS: Right[] = [
  {
    id: "originTheatrical",
    territories: {
      included: ["France", "Switzerland", "Belgium"],
      excluded: [],
    },
    channels: {
      included: ["theatrical"],
      excluded: [],
    },
  },
  {
    id: "originTv",
    territories: {
      included: ["France", "Switzerland", "Belgium"],
      excluded: [],
    },
    channels: {
      included: ["pay-tv", "free-tv"],
      excluded: [],
    },
  },
  {
    id: "originVideo",
    territories: {
      included: ["France", "Switzerland", "Belgium"],
      excluded: [],
    },
    channels: {
      included: ["video"],
      excluded: [],
    },
  },
  {
    id: "originVod",
    territories: {
      included: ["France", "Switzerland", "Belgium"],
      excluded: [],
    },
    channels: {
      included: ["est", "pay-per-view", "n-vod", "a-vod", "f-vod", "s-vod"],
      excluded: [],
    },
  },
  {
    id: "rowAllRights",
    territories: {
      included: ["World"],
      excluded: ["France", "Switzerland", "Belgium"],
    },
    channels: {
      included: ["all-rights"],
      excluded: [],
    },
  },
];
