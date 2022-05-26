import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {

  dataSourceProjet !:any;
  dataSourceEtudiant !:any;
  dataSourceEncadreur !:any;
  panelOpenState = false;
  dataSourceEtape !: any;
  dataSourceAllEtape !: any;
  currentDate = new Date();
  latest_date = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd hh:mm:ss');
  firstStep!: any;
  lastStep!: any;  id_projet!:number;

  constructor(private _activatedRoute: ActivatedRoute,private apiService : DataService,private router: Router,private datepipe: DatePipe) { 
    this._activatedRoute.queryParams.subscribe(params => {
      this.id_projet = params['id'];
  });
  }

  ngOnInit(): void {
    this.getProjetById();
    this.showEncadreur();
    this.showEtudiant();
    this.showEtape();
    this.getAllEtapes();
    this.getFirstStep();
    this.getLastStep();
  }

  getProjetById(){
    this.id_projet = this._activatedRoute.snapshot.params['id'];
    this.apiService.getProjetById(this.id_projet).subscribe({
      next:(res)=>{
        this.dataSourceProjet = res;
        console.log(this.dataSourceProjet);
      },
      error:()=>{
        alert("Impossible d'avoir les informations sur le projet");
      }
    })
  }
  showEncadreur() {
    this.id_projet = this._activatedRoute.snapshot.params['id'];
    this.apiService.getEncadreur(this.id_projet).subscribe({
      next: (re) => {
        this.dataSourceEncadreur = re[0];
      },
      error: () => {
        alert("Impossible de recuperer les données de l'encadreur");
      }
    });
  }

  showEtudiant() {
    this.id_projet = this._activatedRoute.snapshot.params['id'];

    this.apiService.getEtudiantById(this.id_projet).subscribe({
      next: (re) => {
        this.dataSourceEtudiant = re;
        // console.log(this.dataSourceEtudiant)

      },
      error: () => {
        alert("Impossible de recuperer les données de l'encadreur");
      }
    });
  }

  showEtape() {
    this.apiService.getStepsOfProject(this.id_projet)
      .subscribe({
        next: (res) => {
          this.dataSourceEtape = res;
        },
        error: () => {
          alert("Etape introuvable pour ce projet !");
        }
      })
  }

  getAllEtapes() {
    this.apiService.getSteps()
      .subscribe({
        next: (res) => {
          this.dataSourceAllEtape = res
        },
        error: () => {
          alert("Etape introuvable");
        }
      })
  }

  getFirstStep() {
    this.apiService.firstStep().subscribe({
      next: (res) => {
        this.firstStep = res;
      },
      error: () => {
        alert("Premiere étape introuvable !");
      }
    })
  }

  getLastStep() {
    this.apiService.lastStep().subscribe({
      next: (res) => {
        this.lastStep = res;
      },
      error: () => {
        alert("Derniere étape introuvable !");
      }
    })
  }

  back(){
    this.router.navigateByUrl('liste_projet');
  }
}
