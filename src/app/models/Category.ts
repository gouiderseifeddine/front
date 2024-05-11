import { Objective } from "./Objective";

export interface Category {
  idCategorie: number;
    nomCategory: string;
    etudiants:String[];
    objectives: Objective[];
  }