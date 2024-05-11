import { Component } from '@angular/core';
import { Expert } from 'src/app/models/Expert';
import { Objective } from 'src/app/models/Objective';
import { TherapyService } from 'src/app/therapy.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-homeback',
  templateUrl: './homeback.component.html',
  styleUrls: ['./homeback.component.css'],
})
export class HomebackComponent {
  ngOnInit() {
    this.retrieveObjectives();
    this.retrieveExperts();
  }

  send() {
    emailjs.init('Y4iHrEyNGQA8F8aNl');
    emailjs.send('service_4o8i05r', 'template_2pk6hcj', {
      from_name: 'Maha Krimi CEO',
    });
    alert('Email sent successfully');
  }

  nbObjectives = localStorage.getItem('nbObjective') || ([] as any);
  SuccessObjective = JSON.parse(this.nbObjectives).length;
  constructor(private therapyService: TherapyService) {}
  createdObjectives: number = 0; // Initialize createdObjectives to 0
  selectedExpertId: number = 0;

  objectives: Objective[] = []; // Initialize objectives array
  experts: Expert[] = [];

  retrieveExperts() {
    this.therapyService.retrieveAllExperts().subscribe(
      (experts: Expert[]) => {
        this.experts = experts;
      },
      (error) => {
        console.error('Error fetching experts:', error);
      }
    );
  }
  retrieveObjectives() {
    this.therapyService.retrieveAllObjectives().subscribe(
      (objectives: Objective[]) => {
        this.objectives = objectives;
        this.createdObjectives = this.objectives.length; // Update createdObjectives after retrieving objectives
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  deleteExpert(idExpert: number) {
    this.therapyService.removeExpert(idExpert).subscribe(
      () => {
        // If the deletion is successful, remove the expert from the array
        this.experts = this.experts.filter(
          (expert) => expert.idExpert !== idExpert
        );
      },
      (error) => {
        console.error('Error deleting expert:', error);
      }
    );
  }
}
