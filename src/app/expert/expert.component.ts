import { Component, OnInit } from '@angular/core';
import { TherapyService } from '../therapy.service';
import { Category } from '../models/Category';
import { Objective } from '../models/Objective';
import { Observable, lastValueFrom, switchMap } from 'rxjs';
import { Mission } from '../models/Mission';
import { Etudiant } from '../models/Etudiant';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css'],
})
export class ExpertComponent implements OnInit {
  missionDTO: any = null;
  mission_Object_Id: any = null;
  missionList: Mission[] = [];
  selectedMission: Mission | null = null;

  etudiant_category: any;
  etudiant_description: string = '';

  constructor(private therapyService: TherapyService) {}
  ngOnInit(): void {
    this.toggleSection('objectives');
    this.retrieveCategories();
    this.retrieveStudents();
    this.retrieveObjectives();
    this.retrieveMissions();
  }
  defultCategorie: Category = {
    idCategorie: 0,
    etudiants: [],
    nomCategory: '',
    objectives: [],
  };

  selectedDifficulty: string = 'FACILE';

  showEtudiants: boolean = false;
  showCategorieEtudiant: boolean = false;
  showObjectives: boolean = false;
  showMissions: boolean = false;

  objectives: Objective[] = []; // Initialize objectives array
  newObjective: Objective = {
    idObjective: 0,
    objectiveTitle: '',
    objectiveDescription: '',
    missions: [],
    categoryEtudiant: this.defultCategorie, // Initialize categoryEtudiant property
    goal: 0,
  };
  students: Etudiant[] = [];
  categories: Category[] = [];
  // Modal variables
  titreMission: string = '';
  valeurMission: number = 0;
  descriptionMission: string = '';
  mission: string = '';
  idCategory: number = 0;
  numberofMission: number = 0;

  addNewForm() {
    this.objectives.push({
      idObjective: 0,
      objectiveTitle: '',
      objectiveDescription: '',
      categoryEtudiant: this.defultCategorie,
      missions: [],
      goal: 0,
    });
  }
  selectMission(mission: Mission) {
    this.selectedMission = mission;
    this.mission_Object_Id = mission.objective?.idObjective;
    this.titreMission = (mission?.titreMission as string) ?? '';
    this.valeurMission = (mission?.valeurMission as number) ?? 0;
    this.descriptionMission = (mission?.descriptionMission as string) ?? '';
    this.mission = (mission?.titreMission as string) ?? '';
    this.idCategory = (mission?.idMission as number) ?? 0;
    this.toggleAddMissions();
  }
  retrieveStudents() {
    this.therapyService.getAllEtudiants().subscribe(
      (students: any[]) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  openeditModal() {
    const editModal = document.getElementById('editModal');
    if (editModal) {
      editModal.style.display = 'block';
    }
  }
  selectedCategoryTitle: string = 'Please select your category';

  *closeeditModal() {
    // Close the mission modal
    this.selectedCategoryTitle = '';
    const editModal = document.getElementById('editModal');
    if (editModal) {
      editModal.style.display = 'none';
    }
  }
  onCategoryChange(event: any) {
    this.etudiant_category = event.target.value;
  }
  onInput(event: any) {
    // Handle the input event here
    this.etudiant_description = event.target.value;
    // You can perform any other logic here, such as updating other variables
  }

  updateEtudiant(student: Etudiant) {
    this.therapyService
      .updateEtudiant({
        idEtudiant: student?.idEtudiant,
        description: this.etudiant_description,
        categoryEtudiant: {
          idCategorie: parseInt(
            this.etudiant_category.substring(3, this.etudiant_category.length)
          ),
        },
      } as Etudiant)
      .subscribe(
        (updatedEtudiant: any) => {
          // Optionally, you can perform any additional actions upon successful update
        },
        (error) => {
          console.error('Error updating etudiant:', error);
          // Handle error if needed
        }
      );
    this.therapyService
      .assignEtudiantToCategory(
        student.idEtudiant,
        parseInt(
          this.etudiant_category.substring(3, this.etudiant_category.length)
        )
      )
      .subscribe(() => {
        this.closeeditModal();
      });
  }
  openCategorieModal(categoryTitle: string) {
    // Set the title of the selected category
    this.selectedCategoryTitle = categoryTitle;

    // Display the category modal
    const categorieModal = document.getElementById('categorieModal');
    if (categorieModal) {
      categorieModal.style.display = 'block';
    }
  }
  openMissionModal() {
    const modalElement = document.getElementById('missionModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }
  closeCategorieModal() {
    // Close the mission modal
    const categorieModal = document.getElementById('categorieModal');
    if (categorieModal) {
      categorieModal.style.display = 'none';
    }
  }

  closeMissionModal() {
    const modalElement = document.getElementById('missionModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }

  submitMission() {
    const newMission: Mission = {
      idMission: 0, // This will be assigned by the backend
      titreMission: this.titreMission, // Set the title to the value of newCategoryTitle
      descriptionMission: this.descriptionMission,
      difficulte: this.selectedDifficulty,
      valeurMission: this.valeurMission,
      objective: this.mission_Object_Id ?? 0,
    };
    if (!this.selectedMission) {
      this.therapyService
        .addMission({
          ...newMission,
          objective: {
            idObjective: this.mission_Object_Id,
          },
        })
        .subscribe(
          (addedMission: Mission) => {
            this.missionDTO = addedMission;
            localStorage.setItem('mission', addedMission.idMission.toString());
            this.numberofMission = this.numberofMission + 1;
            this.newObjective.missions.push(addedMission);
            this.titreMission = ''; // Clear input field
            this.valeurMission = 0;
            this.descriptionMission = '';
            this.closeMissionModal();
            this.incrementSubmittedMissions();
            this.toggleAllMission();
            this.toggleShowMissions();
            this.selectedMission = null;
          },
          (error) => {
            console.error('Error adding mission:', error);
          }
        );
    } else {
      this.therapyService
        .updateMission({
          ...newMission,
          idMission: this.selectedMission.idMission,
          objective: {
            idObjective: this.mission_Object_Id,
          },
        })
        .subscribe(
          (addedMission: Mission) => {
            this.missionDTO = addedMission;
            localStorage.setItem('mission', addedMission.idMission.toString());
            this.numberofMission = this.numberofMission + 1;
            this.newObjective.missions.push(addedMission);
            this.titreMission = ''; // Clear input field
            this.valeurMission = 0;
            this.descriptionMission = '';
            this.closeMissionModal();
            this.incrementSubmittedMissions();
            this.toggleAllMission();
            this.toggleShowMissions();
            this.selectedMission = null;
          },
          (error) => {
            console.error('Error adding mission:', error);
          }
        );
    }
  }

  toggleSection(section: string) {
    this.showEtudiants = section === 'etudiants';
    this.showCategorieEtudiant = section === 'categorieEtudiant';
    this.showObjectives = section === 'objectives';
    this.showMissions = section === 'missions';
  }

  saveObjective() {
    // Provide a default value
    const newObjective: Objective = {
      idObjective: 0,
      objectiveTitle: this.newObjective.objectiveTitle,
      objectiveDescription: this.newObjective.objectiveDescription,
      categoryEtudiant: this.newObjective.categoryEtudiant,
      missions: [],
      goal: this.newObjective.goal,
    };

    this.therapyService.addObjective(newObjective).subscribe(
      async (addedObjective: Objective) => {
        let response = await lastValueFrom(
          this.therapyService.assignObjectiveToCategory(
            newObjective.categoryEtudiant.idCategorie,
            addedObjective.idObjective
          )
        );

        // Clear the form for the next entry
        this.newObjective = {
          idObjective: 0,
          objectiveTitle: '',
          objectiveDescription: '',
          categoryEtudiant: this.defultCategorie,
          missions: [],
          goal: 0,
        };
      },

      (error) => {
        console.error('Error adding objective:', error);
      }
    );
  }

  deleteObjective(index: number) {
    this.objectives.splice(index, 1);
  }
  // In your component.ts file
  isDropdownOpen: boolean = false;
  newCategoryTitle: string = ''; // To store the title of the new category

  retrieveCategories() {
    this.therapyService.retrieveAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addCategory() {
    const newCategory: Category = {
      idCategorie: 0, // This will be assigned by the backend
      nomCategory: this.newCategoryTitle, // Set the title to the value of newCategoryTitle
      etudiants: [],
      objectives: [],
    };

    this.therapyService.addCategory(newCategory).subscribe(
      (addedCategory: Category) => {
        this.categories.push(addedCategory);
        this.newCategoryTitle = ''; // Clear input field
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
    this.retrieveCategories();
  }

  deleteCategory(id: number) {
    this.therapyService.removeCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter(
          (category) => category.idCategorie !== id
        );
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }
  submittedMissions: number = 0; // Initialize the counter for submitted missions

  retrieveObjectives() {
    this.therapyService.retrieveAllObjectives().subscribe(
      (objectives: Objective[]) => {
        this.objectives = objectives;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  retrieveMissions() {
    this.therapyService.retrieveAllMissions().subscribe(
      (list: Mission[]) => {
        this.missionList = list;
      },
      (error) => {
        console.error('Error fetching list:', error);
      }
    );
  }
  selectedObjective: Objective | null = null;
  selectedCategory: Category | null = null;
  retrieveObjectiveById(idObjective: number) {
    this.therapyService.retrieveObjective(idObjective).subscribe(
      (objective: Objective) => {
        this.selectedObjective = { ...objective }; // Copy the retrieved objective to preserve its ID
        console.log('Retrieved objective:', this.selectedObjective);
        // Assign the retrieved objective to a variable or use it as needed in your component
      },
      (error) => {
        console.error('Error fetching objective:', error);
        // Handle error if needed
      }
    );
  }
  updateObjective() {
    if (!this.selectedObjective) {
      console.error('No objective selected.');
      return;
    }

    this.therapyService.updateObjective(this.selectedObjective).subscribe(
      (updatedObjective: Objective) => {
        console.log('Objective updated successfully:', updatedObjective);
        // Optionally, you can perform any additional actions upon successful update
      },
      (error) => {
        console.error('Error updating objective:', error);
        // Handle error if needed
      }
    );
  }

  missionCount: number = 0;

  incrementSubmittedMissions() {
    this.submittedMissions++;
    this.missionCount++; // Increment the mission count
  }
  //Objective Etudiant :diviser l'affichage
  showAffichageObjective: any;
  showAddObjective: any;
  toggleAddObjectives() {
    this.showAddObjective = true;
    this.showAffichageObjective = false;
  }
  toggleShowObjectives() {
    this.showAffichageObjective = true;
    this.showAddObjective = false;
  }

  showAllObjectives: boolean = true;
  showOneObjective: boolean = false;
  toggleAllObjectives() {
    this.showAllObjectives = true;
    this.showOneObjective = false;
  }
  toggleOneObjective() {
    this.showOneObjective = true;
    this.showAllObjectives = false;
  }
  //category etudiant :  diviser l'affichage
  showAffichageCategory: any;
  showAddCategory: any;
  toggleShowCategories() {
    this.showAffichageCategory = true;
    this.showAddCategory = false;
  }
  toggleAddCategories() {
    this.showAddCategory = true;
    this.showAffichageCategory = false;
  }
  showAllCategories: boolean = true;
  showOneCategories: boolean = false;
  toggleAllCategory() {
    this.showAllCategories = true;
    this.showOneCategories = false;
  }
  toggleOneCategory() {
    this.showOneCategories = true;
    this.showAllCategories = false;
  }

  //Missions diviser l'affichage
  showAffichageMission: any;
  showAddMission: any;
  toggleShowMissions() {
    this.showAffichageMission = true;
    this.showAddMission = false;
  }
  toggleAddMissions() {
    this.showAddMission = true;
    this.showAffichageMission = false;
  }
  showAllMissions: boolean = true;
  showOneMissions: boolean = false;
  toggleAllMission() {
    this.showAllMissions = true;
    this.showOneMissions = false;
  }
  toggleOneMission() {
    this.showOneMissions = true;
    this.showAllMissions = false;
  }

  retrieveCategoryById(idCategory: number) {
    this.therapyService.retrieveCategory(idCategory).subscribe(
      (category: Category) => {
        this.selectedCategory = { ...category }; // Copy the retrieved objective to preserve its ID
        console.log('Retrieved objective:', this.selectedCategory);
        // Assign the retrieved objective to a variable or use it as needed in your component
      },
      (error) => {
        console.error('Error fetching objective:', error);
        // Handle error if needed
      }
    );
  }
  updateCategory() {
    if (!this.selectedCategory) {
      console.error('No objective selected.');
      return;
    }

    this.therapyService.updateCategory(this.selectedCategory).subscribe(
      (updatedCategory: Category) => {
        console.log('Objective updated successfully:', updatedCategory);
        // Optionally, you can perform any additional actions upon successful update
      },
      (error) => {
        console.error('Error updating objective:', error);
        // Handle error if needed
      }
    );
  }
}
