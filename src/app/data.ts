export const ROYALTIES: ReceiptRight[] = [
  {
    id: "originTheatricalExpenses",
    rights: ["originTheatrical"],
    amount: 1150,
    blocks: [
      {
        percentage: 100,
        from: "distributionFeeEvent",
        to: "originTheatricalExpensesRecouped"
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
        from: "distributionFeeEvent",
        to: "originVideoExpensesRecouped"
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
        from: "distributionFeeEvent",
        to: "rowExpensesRecouped"
      },
    ],
  },
  {
    id: "distributionFees",
    rights: [
      "originTheatrical",
      "originTv",
      "originVideo",
      "originVod",
      "rowAllRights",
    ],
    blocks: [
      {
        percentage: 20,
        from: "brut",
      },
    ],
  },
  {
    id: "MG",
    rights: ["originTheatrical", "originVideo", "originVod", "rowAllRights"],
    blocks: [
      {
        percentage: 100,
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
    id: "distributionFeeEvent",
    events: [
      {
        ref: "distributionFees",
      },
    ],
  },
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
