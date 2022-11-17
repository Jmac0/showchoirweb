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
  email: string;
  go_cardless_id: string;
  first_name: string;
  last_name: string;
  address: string;
};
