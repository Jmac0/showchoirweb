export type MandateType = {
  id: string;
  created_at: string;
  resource_type: string;
  action: string;
  links: { mandate: string };
  details: {
    origin: string;
    cause: string;
    description: string;
  };
};
export type MemberType = {
  active: boolean;
  mandate?: string;
  memberOption: string;
  email: string;
  go_cardless_id: string;
  first_name: string;
  last_name: string;
  address: string;
  address_line2?: string;

};


export type PageItem = {
  slug: string;
  displayText: string;
  order: number;
};
