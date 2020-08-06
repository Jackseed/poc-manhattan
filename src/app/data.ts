export const ROYALTIES: ReceiptRight[] = [
  {
    id: "OriginTheatricalExpenses",
    rights: [
      "originTheatrical",
    ],
    blocks: [
      {
        percentage: 20,
      },
    ],
  },
  {
    id: "DistributionFees",
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

export const EVENTS: Event[] = [
  {
    id: "MG recouped",
    events: [
      {
        ref,
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
