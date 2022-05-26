import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-vue-etudiant',
  templateUrl: './vue-etudiant.component.html',
  styleUrls: ['./vue-etudiant.component.css']
})
export class VueEtudiantComponent implements OnInit {

  dataSourceProjet !: any;
  dataSourceEtudiant !: any;
  dataSourceEncadreur !: any;
  panelOpenState = false;
  dataSourceEtape !: any;
  dataSourceAllEtape !: any;
  currentDate = new Date();
  latest_date = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd hh:mm:ss');
  firstStep!: any;
  lastStep!: any;
  id_projet!: number;
  fichierAEnvoyer!: File;
  document!: Blob;
  imageSrc!: string;
  selectedFile!: File;
  id_etudiant!: number;


  constructor(private _activatedRoute: ActivatedRoute, private apiService: DataService, private router: Router, private datepipe: DatePipe) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.id_etudiant = params['id'];
    });
  }

  ngOnInit(): void {
    this.getProjetByEtudiant();
    this.showEncadreur();
    // this.showEtudiant();
    // this.showEtape();
    this.getAllEtapes();
    this.getFirstStep();
    this.getLastStep();
  }

  getProjetByEtudiant() {
    this.id_etudiant = this._activatedRoute.snapshot.params['id'];
    this.apiService.projet_for_etudiant(this.id_etudiant).subscribe({
      next: (res) => {
        this.dataSourceProjet = res[0];

        //get members
        this.apiService.getEtudiantById(this.dataSourceProjet.id).subscribe({
          next: (re) => {
            this.dataSourceEtudiant = re;
            // console.log(this.dataSourceEtudiant)
          },
          error: () => {
            alert("Impossible de recuperer les données de l'étudiant");
          }
        });


        //get steps
        this.apiService.getStepsOfProject(this.dataSourceProjet.id)
          .subscribe({
            next: (res) => {
              this.dataSourceEtape = res;
            },
            error: () => {
              alert("Etape introuvable pour ce projet !");
            }
          })

      },
      error: () => {
        alert("Impossible d'avoir les informations sur le projet");
      }
    })
  }

  showEncadreur() {
    this.id_etudiant = this._activatedRoute.snapshot.params['id'];
    this.apiService.getEncadreurByStudent(this.id_etudiant).subscribe({
      next: (re) => {
        this.dataSourceEncadreur = re[0];
      },
      error: () => {
        alert("Impossible de recuperer les données de l'encadreur");
      }
    });
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

  back() {
    this.router.navigateByUrl('');
  }


  document_word(file: any) {
    this.selectedFile = <File>file.target.files[0]
    let reader = new FileReader()
    reader.onload = () => {
      this.imageSrc = reader.result as string
    }
    reader.readAsDataURL(this.selectedFile)
    this.apiService.document_word(reader.result as string, this.id_projet)
      .subscribe({
        next: (res) => {
          alert("Document word défini avec succes !");  // la ligne si est renvoyé pourtant la MAJ n'est pas faite
        },
        error: () => {
          alert("Impossible de définir ce document word !");
        }
      })
  }

  goToChat() {
    this.router.navigateByUrl('/message-etudiant/' + this.dataSourceProjet.id + '/' + this.id_etudiant);
  }
}
