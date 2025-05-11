export interface ClientDataInt {
  id: string;
  name: string;
  phone: string;
  email: string;
  budget: number;
  exactTime: Date;
  services: {
    web?: {
      pages: number;
      languages: number;
    };
    seo?: boolean;
    ads?: boolean;
  };
}
