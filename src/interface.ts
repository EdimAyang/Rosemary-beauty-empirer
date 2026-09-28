export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
};

type ServiceCategory = "All" | "Hair" | "Nails" | "Lashes" | "Makeup";

export type Service2 = {
  id: string;
  category: Exclude<ServiceCategory, "All">;
  title: string;
  description: string;
  image: string;
  includes: string[];
  price?: string;
};
