export const ROYALTIES: ReceiptRight[] = [
  {
    id: "originTheatricalDistributionFees",
    title: "Theatrical",
    type: "Distribution fees",
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
    title: "TV",
    type: "Distribution fees",
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
    title: "Video",
    type: "Distribution fees",
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
    title: "VOD",
    type: "Distribution fees",
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
    title: "Export",
    type: "Distribution fees",
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
    title: "Theatrical",
    type: "Expenses recouped",
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
    title: "Video",
    type: "Expenses recouped",
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
    title: "Export",
    type: "Expenses recouped",
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
  /*  {
    id: "MG",
    title: "MG",
    amount: 0,
    cashedIn: 0,
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
  }, */
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
    id: "RNPPAyd",
    title: "Right holders' share",
    type: "Net receipts repartition",
    amount: 0,
    cashedIn: 0,
    rights: ["originTheatrical", "originVideo", "originVod", "rowAllRights"],
    blocks: [
      {
        percentage: 62,
        from: "originTheatrical",
        after: "originTheatricalExpenses",
        if: "originTheatricalExpensesRecouped",
      },
      {
        percentage: 62,
        from: "originVideo",
        after: "originVideoExpenses",
        if: "originVideoExpensesRecouped",
      },
      {
        percentage: 62,
        from: "originVod",
        after: "originVodDistributionFees",
      },
      {
        percentage: 62,
        from: "rowAllRights",
        after: "rowExpenses",
        if: "rowExpensesRecouped",
      },
    ],
  },
  {
    id: "RNPPAydTv",
    title: "Right holders' share / TV",
    type: "Net receipts repartition",
    amount: 0,
    cashedIn: 0,
    rights: ["originTv"],
    blocks: [
      {
        percentage: 57,
        from: "originTv",
        after: "originTvDistributionFees",
      },
    ],
  },
  {
    id: "TVBroadcasterRNPP",
    title: "TV broadcaster's share / TV",
    type: "Net receipts repartition",
    amount: 0,
    cashedIn: 0,
    rights: ["originTv"],
    blocks: [
      {
        percentage: 8,
        from: "originTv",
        after: "originTvDistributionFees",
      },
    ],
  },
  {
    id: "RNPPPathe",
    title: "Pathé's share",
    type: "Net receipts repartition",
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
   {
    id: "TvBroadcasterSupport",
    title: "TV broadcaster's share",
    type: "CNC financial support",
    cashedIn: 0,
    amount: 0,
    blocks: [
      {
        percentage: 10,
        from: "theatricalSupport",
        after: "prodSupport100",
      },
      {
        percentage: 10,
        from: "videoSupport",
        after: "prodSupport100",
      },
      {
        percentage: 10,
        from: "tvSupport",
        after: "prodSupport100",
      },
    ],
  },
  {
    id: "equitySupport",
    title: "Equity fund's share",
    type: "CNC financial support",
    cashedIn: 0,
    amount: 0,
    blocks: [
      {
        percentage: 6.4,
        from: "theatricalSupport",
        after: "prodSupport100",
      },
      {
        percentage: 6.4,
        from: "videoSupport",
        after: "prodSupport100",
      },
      {
        percentage: 6.4,
        from: "tvSupport",
        after: "prodSupport100",
      },
    ],
  },
  {
    id: "prodSupport100",
    title: "Executive producer's share (100%)",
    type: "CNC financial support",
    cashedIn: 0,
    amount: 150,
    blocks: [
      {
        percentage: 100,
        from: "theatricalSupport",
        after: "theatricalSupport",
        until: "prodSupportRecouped",
      },
      {
        percentage: 100,
        from: "videoSupport",
        after: "videoSupport",
        until: "prodSupportRecouped",
      },
      {
        percentage: 100,
        from: "tvSupport",
        after: "tvSupport",
        until: "prodSupportRecouped",
      },
    ],
  },
  {
    id: "prodSupport50",
    title: "Executive producer's share (50%)",
    type: "CNC financial support",
    cashedIn: 0,
    amount: 0,
    blocks: [
      {
        percentage: 50,
        from: "theatricalSupport",
        after: "prodSupport100",
      },
      {
        percentage: 50,
        from: "videoSupport",
        after: "prodSupport100",
      },
      {
        percentage: 50,
        from: "tvSupport",
        after: "prodSupport100",
      },
    ],
  },
  {
    id: "PatheCNCSupport",
    title: "Pathé's share",
    type: "CNC financial support",
    cashedIn: 0,
    blocks: [
      {
        percentage: 33.6,
        from: "theatricalSupport",
        after: "prodSupport100",
      },
      {
        percentage: 33.6,
        from: "videoSupport",
        after: "prodSupport100",
      },
      {
        percentage: 33.6,
        from: "tvSupport",
        after: "prodSupport100",
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
  {
    id: "prodSupportRecouped",
    events: [
      {
        ref: "prodSupport100",
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
