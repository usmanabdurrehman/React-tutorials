export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: { baseStat: number; name: string }[];
}
