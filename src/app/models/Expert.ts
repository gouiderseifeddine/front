import { Experience } from "./Experience";

export interface Expert {
    idExpert: number;
    experiences: Experience[];
    dossier: string;
    dossierContent?: File;
  }
  
