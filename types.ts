export type Mandate = {
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
