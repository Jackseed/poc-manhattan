export const RECEIPTS = {
  origin: {
    theatrical: 1000,
    video: 312,
    vod: 299,
    tv: 716,
  },
  row: 700,
};

export const ROYALTIES: ReceiptRight[] = [
  {
    id: "originTheatricalDistributionFees",
    rights: ["originTheatrical"],
    blocks: [
      {
        percentage: 20,
        from: "originTheatrical",
      },
    ],
  },
  {
    id: "originTvDistributionFees",
    rights: ["originTv"],
    blocks: [
      {
        percentage: 20,
        from: "originTv",
      },
    ],
  },
  {
    id: "originVideoDistributionFees",
    rights: ["originVideo"],
    blocks: [
      {
        percentage: 20,
        from: "originVideo",
      },
    ],
  },
  {
    id: "originVodDistributionFees",
    rights: ["originVod"],
    blocks: [
      {
        percentage: 20,
        from: "originVod",
      },
    ],
  },
  {
    id: "rowAllRightsDistributionFees",
    rights: ["rowAllRights"],
    blocks: [
      {
        percentage: 20,
        from: "rowAllRights",
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
        from: "originTheatrical",
        after: "originTheatricalDistributionFees",
        until: "originTheatricalExpensesRecouped",
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
        from: "originVideo",
        after: "originVideoDistributionFees",
        until: "originVideoExpensesRecouped",
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
        from: "rowAllRights",
        after: "rowAllRightsDistributionFees",
        until: "rowExpensesRecouped",
      },
    ],
  },
  {
    id: "MG",
    amount: 1500,
    rights: ["originTheatrical", "originVideo", "originVod", "rowAllRights"],
    blocks: [
      {
        percentage: 100,
        from: "originTheatrical",
        after: "originTheatricalExpenses",
        if: "originTheatricalExpensesRecouped",
        until: "MGRecouped",
      },
      {
        percentage: 100,
        from: "originVideo",
        after: "originVideoExpenses",
        if: "originVideoExpensesRecouped",
        until: "MGRecouped",
      },
      {
        percentage: 100,
        from: "originVod",
        after: "originVodDistributionFees",
        until: "MGRecouped",
      },
      {
        percentage: 100,
        from: "rowAllRights",
        after: "rowExpenses",
        if: "rowExpensesRecouped",
        until: "MGRecouped",
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
