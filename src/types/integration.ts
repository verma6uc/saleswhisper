
export interface Integration {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  useCase: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  integration: string;
}
