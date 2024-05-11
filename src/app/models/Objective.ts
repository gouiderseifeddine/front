import { Category } from "./Category";
import { Mission } from "./Mission";

export interface Objective {
  idObjective: number; // Rename idObjective to id
  objectiveTitle: string;
  objectiveDescription: string;
  missions: Mission[]; // Assuming Mission is another model/interface
  categoryEtudiant: Category; // Assuming CategoryEtudiant is another model/interface
  goal: number;
}