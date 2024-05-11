import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TherapyService } from '../therapy.service';
import { Etudiant } from '../models/Etudiant';
import { Experience } from '../models/Experience';
import { Expert } from '../models/Expert';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-your-component',
  templateUrl: './fillform.component.html',
  styleUrls: ['./fillform.component.css']
})
export class FillformComponent implements OnInit {

  showEtudiantForm: boolean = false;
  showExpertForm: boolean = false;
  expertForms: any[] = [{ fromDate: '', toDate: '', where: '', jobTitle: '', jobDescription: '' }];
  students: Etudiant[] = [];
  experiences: Experience[] = [];
  experts: any;
  newExpert: Expert = {
    idExpert: 0,
    dossier: "",
    experiences: [],
    dossierContent: undefined
  };

  constructor(private router: Router, private therapyService: TherapyService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  toggleEtudiantForm() {
    this.showEtudiantForm = true;
    this.showExpertForm = false;
  }

  toggleExpertForm() {
    this.showExpertForm = true;
    this.showEtudiantForm = false;
  }

  addExpertForm() {
    this.expertForms.push({ fromDate: '', toDate: '', where: '', jobTitle: '', jobDescription: '' });
  }
  addNewExpertForm() {
    this.addExpertForm(); // Add a new form in the UI
  }
  deleteExpertForm(index: number) {
    this.expertForms.splice(index, 1);
  }

  submitEtudiantForm() {
    // Get form values
    const poidsInput = document.querySelector<HTMLInputElement>('input[name="poids"]');
    const tailleInput = document.querySelector<HTMLInputElement>('input[name="taille"]');
    const dossierInput = document.querySelector<HTMLInputElement>('input[name="dossier"]');

    // Check if form elements exist
    if (!poidsInput || !tailleInput || !dossierInput) {
      console.error('Form elements not found.');
      return;
    }

    // Create new Etudiant object with form values
    const newStudent: Etudiant = {
      idEtudiant: 0, // This will be assigned by the backend
      taille: parseFloat(tailleInput.value), // Convert taille to float
      point: parseFloat(poidsInput.value), // Convert point to float
      description: '', // Description is not available in the form, set it as empty
      dossier: dossierInput.value, // Set dossier to the file name
      dossierContent: '', // Set dossierContent as empty initially
      picture: '', // Picture is not available in the form, set it as empty
    };

    // Call the addEtudiant method in the service
    this.therapyService.addEtudiant(newStudent).subscribe(
      (addedStudent: Etudiant) => {
        // Push the added student to the students array
        this.students.push(addedStudent);
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }
  submitExperienceForm(index: number) {
    // Get form values
    const fromDateInput = document.querySelector<HTMLInputElement>('input[name="fromDate"]');
    const toDateInput = document.querySelector<HTMLInputElement>('input[name="toDate"]');
    const whereInput = document.querySelector<HTMLInputElement>('input[name="where"]');
    const jobTitleInput = document.querySelector<HTMLInputElement>('input[name="jobTitle"]');
    const jobDescriptionInput = document.querySelector<HTMLInputElement>('textarea[name="jobDescription"]');

    // Check if form elements exist
    if (!fromDateInput || !toDateInput || !whereInput || !jobTitleInput || !jobDescriptionInput) {
      console.error('Form elements not found.');
      return;
    }

    // Convert string dates to Date objects
    const fromDate = new Date(fromDateInput.value);
    const toDate = new Date(toDateInput.value);

    // Create a new Experience object with form values
    const newExperience: Experience = {
      idExperience: 0, // This will be assigned by the backend
      startDate: fromDate,
      endDate: toDate,
      experiencePlace: whereInput.value,
      experienceTitle: jobTitleInput.value,
      experienceDescription: jobDescriptionInput.value
    };

    // Call the addExperience method in the service
    this.therapyService.addExperience(newExperience).subscribe(
      (addedExperience: Experience) => {
        this.experiences.push(addedExperience);
        if (index === this.expertForms.length - 1) {
          this.addExpertForm(); // Add a new expert form after saving the current one only if it's the last one
        }
      },
      (error) => {
        console.error('Error adding experience:', error);
      }
    );
  }
  addedfile?: File=undefined;
  submitExpertForm(newExpert: Expert) {
    // Create a FormData object
    const formData = new FormData();

    // Append the file to the FormData object if it exists
    if (this.addedfile) {
        formData.append('addedfile', this.addedfile, this.addedfile.name);
    }

    // Send the FormData object along with the newExpert object to your backend API
    this.therapyService.addExpert(newExpert, formData)
        .subscribe(
            async (addedExpert: Expert) => {
                // Clear the form for the next entry
                this.newExpert = {
                    idExpert: 0,
                    dossier: "",
                    experiences: [],
                    dossierContent: undefined
                };
                console.log('Expert added successfully:', addedExpert);
            },
            (error) => {
                console.error('Error adding expert:', error);
            }
        );
}


onFileSelected(event: any) {
// Update the addedfile property with the selected file
const file: File = event.target.files[0];
this.addedfile = file;
}

}
