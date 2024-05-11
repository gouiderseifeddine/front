// Add this code to your etudiant.component.ts file
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Category } from '../models/Category';
import { TherapyService } from '../therapy.service';
import { Mission } from '../models/Mission';
import { Objective } from '../models/Objective';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css'],
})
export class EtudiantComponent implements OnInit {
  progressValue: number = 0;

  constructor(
    private therapyService: TherapyService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef
  ) {}
  showCards: boolean = true;
  TitreObjective: string = '';
  missionTitle: String = '';
  objectif: any;
  omissions: Mission[] = [];

  categories: Category[] = [];
  category: any;
  mymission: any;
  openMission = false;
  result: Number = 0;
  idObjective: String = '';
  @ViewChild('childContainer', { read: ViewContainerRef })
  cardComponent: ViewContainerRef | undefined;
  loadChildComponent() {
    const childComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(CardComponent);
    (this.cardComponent as ViewContainerRef).clear();
    const childComponentRef = (
      this.cardComponent as ViewContainerRef
    ).createComponent(childComponentFactory);
    // Set input value for the child component
    childComponentRef.instance.missionTitle = this.missionTitle;
    childComponentRef.instance.points = this.points;
    childComponentRef.instance.idObjective = this.idObjective;
  }
  ngOnInit(): void {
    this.retrieveCategories();
    this.getObjectivesOfCategory();
  }
  getMissionColor(difficulty: String): String {
    switch (difficulty) {
      case 'FACILE':
        return 'green';
      case 'MOYEN':
        return 'orange';
      case 'SEVERE':
        return 'red';
      default:
        return 'black'; // Default color if difficulty is not recognized
    }
  }

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
  objectiveTitle: String = '';

  showMissions(objective: Objective) {
    this.idObjective = objective.idObjective.toString();
    let value = localStorage.getItem('result' + objective.idObjective);
    if (!value) {
      localStorage.setItem('result' + objective.idObjective, '0');
      value = localStorage.getItem('result' + objective.idObjective);
    }
    this.result = parseInt(value as string);
    this.progressValue = objective.goal;
    this.showCards = false;
    this.therapyService.getMissionsByObjective(objective.idObjective).subscribe(
      (missions: Mission[]) => {
        this.omissions = missions;
        this.TitreObjective = objective.objectiveTitle;
        setTimeout(() => {
          const element =
            this.elementRef.nativeElement.querySelector('#stylecard');
          if (element) {
            if ((this.result as number) >= this.progressValue) {
              element.style.backgroundColor = 'green';
              const nbObjective = (localStorage.getItem('nbObjective') ??
                []) as string;
              console.log(
                '🚀 ~ EtudiantComponent ~ setTimeout ~ nbObjective:',
                nbObjective
              );

              if (!nbObjective.length) {
                localStorage.setItem(
                  'nbObjective',
                  JSON.stringify([objective.idObjective.toString()])
                );
                return;
              }
              const parsedArray = JSON.parse(nbObjective);
              if (parsedArray.includes(objective.idObjective.toString())) {
                return;
              } else {
                parsedArray.push(objective.idObjective.toString());
                localStorage.setItem(
                  'nbObjective',
                  JSON.stringify(parsedArray)
                );
              }
            } else if ((this.result as number) == 0) {
              element.style.backgroundColor = 'white';
            } else {
              element.style.backgroundColor = 'orange';
            }
          }
        }, 1000);
      },
      (error) => {
        console.error('Error fetching missions for the objective:', error);
      }
    );
  }
  returntoObjectives() {
    this.showCards = true;
    this.omissions = [];
  }
  closeMissionModal() {
    // Close the mission modal
    const missionModal = document.getElementById('missionModal');
    if (missionModal) {
      missionModal.style.display = 'none';
    }
  }
  openMissionModal(mission: any) {
    // Display the mission modal

    this.missionTitle = mission.titreMission;
    this.points = mission.valeurMission;
    this.openMission = true;
    this.loadChildComponent();
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
  points: number = this.getPointsFromLocalStorage();
  savePointsToLocalStorage() {
    localStorage.setItem('points', this.points.toString());
  }
  saveMission() {
    // Add points of the current mission to the total points
    this.savePointsToLocalStorage();
    // Optionally, update the displayed points in the modal
    this.points = this.getPointsFromLocalStorage();
  }
}
