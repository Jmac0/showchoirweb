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
  active_mandate: boolean;
  mandate?: string;
  membership_type?: string | null;
  go_cardless_id: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  post_code: any;
  street_address: string;
  town_city: string;
  county: string;
  email: string;
  age_confirm: boolean;
  home_choir: any;
  consent: boolean;
};

export type PageItem = {
  slug: string;
  displayText: string;
  order: number;
};
