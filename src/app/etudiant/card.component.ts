// Add this code to your etudiant.component.ts file
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { TherapyService } from '../therapy.service';
import { Mission } from '../models/Mission';
import { Objective } from '../models/Objective';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./etudiant.component.css'],
})
export class CardComponent implements AfterViewInit {
  constructor(private therapyService: TherapyService, private router: Router) {}
  ngAfterViewInit(): void {
    const missionModal = document.getElementById('missionModal');

    if (missionModal) {
      missionModal.style.display = 'block';
    }
  }

  refreshPage() {
    location.reload();
  }

  @Input()
  missionTitle: String = '';
  @Input()
  points: number = 0;
  @Input()
  idObjective: String = '';
  closeMissionModal() {
    // Close the mission modal
    const missionModal = document.getElementById('missionModal');
    if (missionModal) {
      missionModal.style.display = 'none';
    }
  }
  openMissionModal(mission: any) {
    // Display the mission modal
    this.missionTitle = mission.missionTitle;
    this.points = mission.missionValue;

    const missionModal = document.getElementById('missionModal');

    this.points = this.getPointsFromLocalStorage();
    if (missionModal) {
      missionModal.style.display = 'block';
    }
  }

  objectives: Objective[] = [];

  Categoryobjectives: Objective[] = [];
  getObjectivesOfCategory(): Objective[] {
    this.therapyService.getByCategory().subscribe(
      (Categoryobjectives: Objective[]) => {
        this.Categoryobjectives = Categoryobjectives;
        console.log(this.Categoryobjectives);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
    return this.Categoryobjectives;
  }

  getPointsFromLocalStorage(): number {
    const points = localStorage.getItem('points');
    return points ? parseInt(points, 10) : 0; // Parse points as integer, default to 0 if not found
  }

  savePointsToLocalStorage() {
    localStorage.setItem('points', this.points.toString());
  }
  saveMission() {
    let value = localStorage.getItem('result' + this.idObjective);
    localStorage.setItem(
      'result' + this.idObjective,
      (Number(value) + this.points).toString()
    );
    this.refreshPage();
  }
}
