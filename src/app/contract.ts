interface Right {}

/** Manage the control */
interface Ownership extends Right {
  territories;
}

/**  */
interface Exploitation extends Right {}

// /** Rights given against an Exploitation/Ownership right */
// interface Receipts extends Right {
//   percentage;
//   from;
//   until;
//   base;
// }

/**  */
interface Financing extends Right {}

//////////////////////////////////

/** Relation between n parties to transfer rights */
interface Deal {
  duration;
  channels: string[];
  territories: string[];
  languages: string[];
  buyerRights: Right;
  sellerRights: Right;
}

interface Recoupment {
  amount: number;
  recouped: number;
  // terms: { dealId: string, base: number, percentage: number }[];
  terms: {
    dealIds: string[];
    base: number;
    percentage: number;
  }[];
}

interface Expense extends Recoupment {
  min: number;
  max: number;
  accountable: boolean;
}

interface MG extends Recoupment {}

/** Option to get Receipt or Ownership after trigger */
interface Security extends Deal {
  trigger;
}

interface Bonus {
  amount: number;
  trigger;
}

///////////////////////////////////
/** Option on an right with a flat fee */
interface Option {
  duration;
  // price: Receipts;
  compensation;
  whoCanTransformIntoContract; // who can raise the option
}

/** Document to be signed to triggre transfert */
interface Contract {
  deals: Deal[];
  option: Option;
  parties: any[];
}

/** Small version of a contract on an Exploitation Right */
interface DealMemo extends Contract {}

/** Long version of a contract */
interface LongFormAgreement extends Contract {}

interface ReceiptRight {
  id: string;
  title?: string;
  type?: string; // used only for presentation matter
  rights?: string[]; // rightIds / vc: looks redundant with from
  cashedIn?: number;
  amount?: number;
  min?: number; // vc: added because of expenses
  max?: number; // vc: added because of expenses
  // vc: base has been removed for from, if and after into blocks
  blocks: {
    percentage: number;
    if?: string; // eventId
    from?: string; // rightsId (brut)
    after?: string; // receiptRightId (net)
    until?: string; // eventId
  }[];
}

interface Mandate extends Contract {
  licensee: {
    // Exploitation right
  };
  licensor: {
    fee: ReceiptRight[];
    mg: ReceiptRight[];
    expenses: ReceiptRight[];
    perks: Perk[];
  };
  bonuses: Bonus[];
}

interface CoproContract extends Contract {
  parties: {
    properties;
    distribution;
    perks: Perk[];
  }[];
}

interface FinancingContract {
  roles: {
    financers: string[];
    prod: string[];
  };
  investment: number;
  financers: {
    /** Percentage of the investment */
    premium: number;
    backends: ReceiptRight[];
    recoupments: ReceiptRight[];
    expenses: ReceiptRight[];
    perks: Perk[];
    security: Security;
  };
  prod: Payment[];
}

interface Payment {
  trigger: Trigger;
  amount: number;
}

interface Perk {
  trigger;
  description: string;
}

/** Oracle */
interface Trigger {}

/** Etape dans le waterfall */
// vc: name changed because of reserved word Event
interface Events {
  id: string;
  condition?: "union" | "intersection";
  events: {
    ref: string; // vc: receiptRightId
    percentage: number; // => percentage of money cashed in / amount invested
  }[];
}

/** Condition on an event */
interface Condition {}

/** Terms of a right */
interface Right {
  id: string;
  territories: Excludable;
  channels: Excludable;
}

interface Excludable {
  included: string[];
  excluded: string[];
}

function getIncome(income) {}
