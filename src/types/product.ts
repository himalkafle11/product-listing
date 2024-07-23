export interface Product {
  id(id: any, arg1: number): void;
  _id: string;
  slug: string;
  title: string;
  price: number;
  strikePrice: number;
  offPercent: number;
  images: any;
  variantType?: string;
  ratings?: number;
  totalRatings?: number;
  ratedBy?: number;
  description:string;
  ingredient:string;
  howToUse:string;
  brand:any;
  isBestSeller:boolean;
  status:boolean
}
