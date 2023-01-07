import { Gard } from "../user-profile/gard";
import { Pharmacie } from "./pharmacie";

export interface PhaGard {
  id: number;
  date_debut: Date;
  date_fin: Date;
  pharmacie: Pharmacie[];
  gards: Gard[];
}
