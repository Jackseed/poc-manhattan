interface Right {

}

/** Manage the control */
interface Ownership extends Right {
  territories;
}

/**  */
interface Exploitation extends Right {

}

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
    dealIds: string[],
    base: number,
    percentage: number
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
  price: Receipts;
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
  rights: Right[];
  cashedIn?: number;
  amount?: number;
  base: 'brut' | 'net';
  blocks: {
    percentage: number;
    from?: Event;
    to?: Event;
  }[];
};

interface Mandate extends Contract {
  licensee: {
    // Exploitation right
  }
  licensor: {
    fee: ReceiptRight[];
    mg: ReceiptRight[];
    expenses: ReceiptRight[];
    perks: Perk[];
  }
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
  }
  prod: Payment[]
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
interface Event {
  condition: 'union' | 'intersection';
  events: {
    ref: Recoupment;
    percentage: number;
  }[];
}

/** Condition on an event */
interface Condition {}


/** Terms of a right */
interface Right {
  territories: Excludable;
  channels: Excludable;
}

interface Excludable {
  included: string[];
  excluded: string[];
}


function getIncome(income) {

}
