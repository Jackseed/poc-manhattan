export const ROYALTIES: ReceiptRight[] = [
  {
    id: "originTheatricalDistributionFees",
    title: "Theatrical distribution fees",
    rights: ["originTheatrical"],
    cashedIn: 0,
    blocks: [
      {
        percentage: 20,
        from: "originTheatrical",
        after: "originTheatrical",
      },
    ],
  },
  {
    id: "originTvDistributionFees",
    title: "TV distribution fees",
    rights: ["originTv"],
    cashedIn: 0,
    blocks: [
      {
        percentage: 20,
        from: "originTv",
        after: "originTv",
      },
    ],
  },
  {
    id: "originVideoDistributionFees",
    title: "Video distribution fees",
    rights: ["originVideo"],
    cashedIn: 0,
    blocks: [
      {
        percentage: 20,
        from: "originVideo",
        after: "originVideo",
      },
    ],
  },
  {
    id: "originVodDistributionFees",
    title: "VOD distribution fees",
    rights: ["originVod"],
    cashedIn: 0,
    blocks: [
      {
        percentage: 20,
        from: "originVod",
        after: "originVod",
      },
    ],
  },
  {
    id: "rowAllRightsDistributionFees",
    title: "Export distribution fees",
    rights: ["rowAllRights"],
    cashedIn: 0,
    blocks: [
      {
        percentage: 20,
        from: "rowAllRights",
        after: "rowAllRights",
      },
    ],
  },
  {
    id: "originTheatricalExpenses",
    title: "Theatrical expenses",
    rights: ["originTheatrical"],
    amount: 1150,
    cashedIn: 0,
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
    title: "Video expenses",
    rights: ["originVideo"],
    amount: 137,
    cashedIn: 0,
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
    title: "Export expenses",
    rights: ["rowAllRights"],
    amount: 56,
    cashedIn: 0,
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
    title: "MG",
    amount: 0,
    cashedIn: 0,
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
  /*   {
    id: "originTheatricalReceipt",
    rights: ["originTheatrical"],
    blocks: [
      {
        percentage: 38,
      },
    ],
  }, */
  {
    id: "RNPPPathe",
    title: "RNPP Pathé",
    amount: 0,
    cashedIn: 0,
    rights: [
      "originTheatrical",
      "originTv",
      "originVideo",
      "originVod",
      "rowAllRights",
    ],
    blocks: [
      {
        percentage: 38,
        from: "originTheatrical",
        after: "originTheatricalExpenses",
        if: "originTheatricalExpensesRecouped",
      },
      {
        percentage: 35,
        from: "originTv",
        after: "originTvDistributionFees",
      },
      {
        percentage: 38,
        from: "originVideo",
        after: "originVideoExpenses",
        if: "originVideoExpensesRecouped",
      },
      {
        percentage: 38,
        from: "originVod",
        after: "originVodDistributionFees",
      },
      {
        percentage: 38,
        from: "rowAllRights",
        after: "rowExpenses",
        if: "rowExpensesRecouped",
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
