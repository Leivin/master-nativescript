export interface Restaurant {
  id: string;
  address?: string;
  coordinates?: {
      latitude?: number,
      longitude?: number,
  };
  cuisine?: Array<string>;
  description?: string;
  gallery?: Array<string>;
  name?: string;
  score_amount?: number;
  score_sum?: number;
  tags?: Array<string>;
}
