
export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  isRedeemed: boolean;
  icon: string;
}

export interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export enum AppSection {
  HOME = 'home',
  LETTERS = 'letters',
  COUPONS = 'coupons',
  MEMORIES = 'memories'
}
