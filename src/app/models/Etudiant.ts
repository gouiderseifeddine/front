import { Category } from './Category';

export interface Etudiant {
  idEtudiant: number;
  taille: number;
  point: number;
  description: string;
  dossier: string;
  dossierContent: string;
  picture: string;
  categoryEtudiant?: Category | null;
}
