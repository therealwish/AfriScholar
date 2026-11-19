export type Scholarship = {
  id: string;
  title: string;
  institution: string;
  location: string;
  level: string;
  deadline: string;
  url: string;
  is_featured?: boolean;
};

export type Grant = {
  id: string;
  title: string;
  funder: string;
  amount: string;
  deadline: string;
  url: string;
  is_featured?: boolean;
};