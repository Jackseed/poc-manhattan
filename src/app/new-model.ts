/////////////
// SUMMARY //
/////////////
export interface Summary {
  id: string;
  previous?: string;
  next?: string;
  title: {
    total: number;
    [termsId: string]: number;
  };
  orgs: {
    [orgId: string]: {
      total: number;
      [termsId: string]: number;
    }
  };
  rights: {
    [rightId: string]: number;
  }
}

export function createSummary(params: Partial<Summary> = {}): Summary {
  return {
    id: '',
    title: {
      total: 0
    },
    orgs: {},
    rights: {},
    ...params
  }
}

///////////
// RIGHT //
///////////

export interface Right {
  id: string;
  percentage: number;
  parentIds: string[];
  orgId: string;
  termsIds: string[];
  conditions?:  Condition[];
}

export function createRight(params: Partial<Right> = {}): Right {
  return {
    id: '',
    percentage: 0,
    orgId: '',
    termsIds: [],
    parentIds: [],
    ...params
  };
}

///////////
// TERMS //
///////////

export interface Excludable {
  included: string[];
  excluded: string[];
}

/** Terms of a right */
export interface Terms {
  id: string;
  territories: Excludable;
  channels: Excludable;
}

///////////////
// CONDITION //
///////////////

export interface Condition {
  kind: 'titleTotal' | 'titleTerms' | 'orgTotal' | 'orgTerms' | 'right';
  min?: number;
  max?: number;
}
export interface TitleCondition extends Condition {
  kind: 'titleTotal';
}
export interface TitleTermsCondition extends Condition {
  kind: 'titleTerms';
  termsId: string;
}
export interface RightCondition extends Condition {
  kind: 'right';
  rightId: string;
}
export interface OrgCondition extends Condition {
  kind: 'orgTotal';
  orgId: string;
}
export interface OrgTermsCondition extends Condition {
  kind: 'orgTerms';
  termsId: string;
  orgId: string;
}
