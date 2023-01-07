import { Zone } from "../maps/zone";

export interface Pharmacie {
  id: number;
  name: string;
  lat: number;
  lon: number;
  etat: number;
  photo: string;
  zone: Zone;
}
