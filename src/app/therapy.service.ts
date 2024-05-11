import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './models/Category';
import { Objective } from './models/Objective';
import { Etudiant } from './models/Etudiant';
import { Expert } from './models/Expert';
import { Experience } from './models/Experience';
import { Mission } from './models/Mission';

@Injectable({
  providedIn: 'root',
})
export class TherapyService {
  private apiServerUrl = 'http://localhost:8085/minds'; // Assuming the base URL for your backend

  constructor(private http: HttpClient) {}

  // Category endpoints
  retrieveCategory(idCategorie: number): Observable<Category> {
    return this.http.get<Category>(
      `${this.apiServerUrl}/categories-etudiant/retrieve/${idCategorie}`
    );
  }
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `${this.apiServerUrl}/categories-etudiant/add`,
      category
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.apiServerUrl}/categories-etudiant/update`,
      category
    );
  }

  removeCategory(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/categories-etudiant/delete/${id}`
    );
  }

  retrieveAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiServerUrl}/categories-etudiant/retrieve-all`
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(
      `${this.apiServerUrl}/categories-etudiant/${id}`
    );
  }

  assignObjectiveToCategory(
    idCategory: number,
    idObjective: number
  ): Observable<string> {
    return this.http.post<string>(
      `${this.apiServerUrl}/categories-etudiant/${idCategory}/assign-objective-to-Category/${idObjective}`,
      null
    );
  }

  // Objective endpoints

  addObjective(objective: Objective): Observable<Objective> {
    return this.http.post<Objective>(
      `${this.apiServerUrl}/objectives/addObjective`,
      objective
    );
  }

  updateObjective(objective: Objective | undefined): Observable<Objective> {
    return this.http.put<Objective>(
      `${this.apiServerUrl}/objectives/update/${objective?.idObjective}`,
      objective
    );
  }

  removeObjective(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/objectives/delete/${id}`
    );
  }

  retrieveAllObjectives(): Observable<Objective[]> {
    return this.http.get<Objective[]>(
      `${this.apiServerUrl}/objectives/retrieve-all`
    );
  }

  retrieveObjective(idObjective: number): Observable<Objective> {
    return this.http.get<Objective>(
      `${this.apiServerUrl}/objectives/retrieve/${idObjective}`
    );
  }
  addMissionToObjective(
    idMission: number,
    idObjective: number
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiServerUrl}/objectives/addMissionToObjective/${idMission}/${idObjective}`,
      null
    );
  }
  retrieveAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(
      `${this.apiServerUrl}/missions/retrieve-all`
    );
  }
  getByCategory(): Observable<Objective[]> {
    return this.http.get<Objective[]>(
      `${this.apiServerUrl}/objectives/getByCategory/1`
    );
  }
  // Student Endpoint
  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(
      `${this.apiServerUrl}/etudiants/add`,
      etudiant
    );
  }

  updateEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(
      `${this.apiServerUrl}/etudiants/update`,
      etudiant
    );
  }

  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/etudiants/delete/${id}`
    );
  }

  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(
      `${this.apiServerUrl}/etudiants/retrieve-all`
    );
  }

  getEtudiantById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiServerUrl}/etudiants/${id}`);
  }

  assignEtudiantToClasse(
    idEtudiant: number,
    idClasse: number
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiServerUrl}/${idEtudiant}/etudiants/assign-classe/${idClasse}`,
      {}
    );
  }

  assignEtudiantToCategory(
    idEtudiant: number,
    idCategoryEtudiant: number
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiServerUrl}/etudiants/${idEtudiant}/assign-category/${idCategoryEtudiant}`,
      {}
    );
  }

  addEtudiantWithFiles(
    etudiant: Etudiant,
    dossierFile: File,
    picture: File
  ): Observable<Etudiant> {
    const formData = new FormData();
    formData.append('etudiant', JSON.stringify(etudiant));
    if (dossierFile) {
      formData.append('dossierFile', dossierFile, dossierFile.name);
    }
    if (picture) {
      formData.append('picture', picture, picture.name);
    }

    return this.http.post<Etudiant>(
      `${this.apiServerUrl}/etudiants/ajouter`,
      formData
    );
  }

  //  Expert Endpoint
  addExpert(expert: Expert, dossierFile?: FormData): Observable<Expert> {
    return this.http.post<Expert>(`${this.apiServerUrl}/experts/addExpert`, {
      expert: expert,
    });
  }

  updateExpert(expert: Expert): Observable<Expert> {
    return this.http.put<Expert>(`${this.apiServerUrl}/experts/update`, expert);
  }

  removeExpert(idExpert: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/experts/delete/${idExpert}`
    );
  }

  retrieveAllExperts(): Observable<Expert[]> {
    return this.http.get<Expert[]>(`${this.apiServerUrl}/experts/retrieve-all`);
  }

  assignExperienceToExpert(
    idExpert: number,
    idExperience: number
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiServerUrl}/${idExpert}/experts/assign-experience/${idExperience}`,
      {}
    );
  }

  // Experience Endpoint
  addExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(
      `${this.apiServerUrl}/experiences/add`,
      experience
    );
  }

  updateExperience(experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(
      `${this.apiServerUrl}/experiences/update`,
      experience
    );
  }

  deleteExperience(idExperience: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/experiences/delete/${idExperience}`
    );
  }

  retrieveAllExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(
      `${this.apiServerUrl}/experiences/retrieve-all`
    );
  }

  getExperienceById(idExperience: number): Observable<Experience> {
    return this.http.get<Experience>(
      `${this.apiServerUrl}/experiences/${idExperience}`
    );
  }

  // Inside TherapyService class
  getMissionsByObjective(objectiveId: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(
      `${this.apiServerUrl}/missions/getAllByObjective/${objectiveId}`
    );
  }

  // Mission Endpoint
  addMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(
      `${this.apiServerUrl}/missions/addMission`,
      mission
    );
  }

  updateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(
      `${this.apiServerUrl}/missions/update/${mission.idMission}`,
      mission
    );
  }
  deleteMission(mission: Mission): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/missions/delete/${mission.idMission}`
    );
  }
}
