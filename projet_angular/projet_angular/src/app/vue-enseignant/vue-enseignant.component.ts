import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-vue-enseignant',
  templateUrl: './vue-enseignant.component.html',
  styleUrls: ['./vue-enseignant.component.css']
})

export class VueEnseignantComponent implements OnInit {

  dataSourceProjet !: any;
  dataSourceEncadreur !: any;
  dataSourceEtudiant !: any;
  dataSourceEtape !: any;
  dataSourceAllEtape !: any;
  panelOpenState = false;
  currentDate = new Date();
  latest_date = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd hh:mm:ss');
  firstStep!: any;
  lastStep!: any;
  idProjet !: number;

  constructor(private _activatedRoute: ActivatedRoute, private apiService: DataService, private datepipe: DatePipe,private router: Router) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.idProjet = params['id'];
    });
  }

  ngOnInit(): void {
    this.showDetailProjet();
    this.showEncadreur();
    this.showEtudiant();
    this.showEtape();
    this.getAllEtapes();
    this.getFirstStep();
    this.getLastStep();
  }

  showDetailProjet() {
    this.idProjet = this._activatedRoute.snapshot.params['id'];

    this.apiService.getProjetById(this.idProjet).subscribe({
      next: (r) => {
        this.dataSourceProjet = r;
      },
      error: () => {
        alert("Impossible de recuperer les données du projet");
      }
    });
  }

  showEncadreur() {
    this.idProjet = this._activatedRoute.snapshot.params['id'];
    this.apiService.getEncadreur(this.idProjet).subscribe({
      next: (re) => {
        this.dataSourceEncadreur = re[0];
      },
      error: () => {
        alert("Impossible de recuperer les données de l'encadreur");
      }
    });
  }

  showEtudiant() {
    this.idProjet = this._activatedRoute.snapshot.params['id'];

    this.apiService.allEtudiantOneProjectfggh(this.idProjet).subscribe({
      next: (re) => {
        this.dataSourceEtudiant = re;
        console.log(this.dataSourceEtudiant)
      },
      error: () => {
        alert("Impossible de recuperer les données de l'encadreur");
      }
    });
  }

  showEtape() {
    this.apiService.getStepsOfProject(this.idProjet)
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

  nextStep() {
    this.apiService.advanceProjet(this.idProjet, this.dataSourceProjet.id_etapes).subscribe({
      next: (res) => {
        alert("Le projet est désormais à l'étape suivante")
        this.showDetailProjet();
        this.showEtape();
        this.getAllEtapes();
        // window.location.reload();
      },
      error: () => {
        alert("Impossible d'aller à cette étape")
      }
    })
  }

  backStep() {
    this.apiService.retrogradeProjet(this.idProjet, this.dataSourceProjet.id_etapes).subscribe({
      next: (res) => {
        alert("Le projet est désormais à l'étape précédente !")
        this.showDetailProjet();
        this.showEtape();
        this.getAllEtapes();
        // window.location.reload();
      },
      error: () => {
        alert("Impossible d'aller à cette étape !")
      }
    })
  } 
  
  edit_projet_theme(id:number) {
    this.router.navigateByUrl('/creer-projet/'+id);
  }

  back(){
    this.idProjet = this._activatedRoute.snapshot.params['id'];
    this.router.navigateByUrl('/acceuil-enseignant/'+this.dataSourceEncadreur.id);
  }

}
