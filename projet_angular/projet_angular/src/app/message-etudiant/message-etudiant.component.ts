import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-message-etudiant',
  templateUrl: './message-etudiant.component.html',
  styleUrls: ['./message-etudiant.component.css']
})
export class MessageEtudiantComponent implements OnInit {

  projetInfo!:any;
  messages!:any;
  id_projet!:number;
  id_etudiant!:number;
  dataSourceEtudiant!:any;
  contenu!:string;

  constructor(private _activatedRoute: ActivatedRoute,private apiService : DataService,private router: Router) { 
    this._activatedRoute.queryParams.subscribe(params => {
      this.id_projet = params['id'];
      this.id_etudiant = params['id_etudiant'];
  });
  }

  ngOnInit(): void {
    this.getAllMessages();
    this.getProjetById();
    this.showEtudiant();
  }

  getAllMessages(){
    this.id_projet = this._activatedRoute.snapshot.params['id'];
    this.apiService.getMessages(this.id_projet)
    .subscribe({
      next:(res)=>{
        this.messages = res;
        console.log(this.messages)

      },
      error:()=>{
        alert("Impossible de retrouver vos messages");
      }
    })
  }

  getProjetById(){
    this.id_projet = this._activatedRoute.snapshot.params['id'];
    this.apiService.getProjetById(this.id_projet)
    .subscribe({
      next:(res)=>{
        this.projetInfo = res;
      },
      error:()=>{
        alert("Impossible de retrouver le projet");
      }
    })
  }

  showEtudiant() {
    this.id_projet = this._activatedRoute.snapshot.params['id'];
    this.id_etudiant = this._activatedRoute.snapshot.params['id_etudiant'];
    this.apiService.getEtudiantById(this.id_etudiant).subscribe({
      next: (re) => {
        this.dataSourceEtudiant = re[0];

      },
      error: () => {
        alert("Impossible de recuperer les données de l'étudiant");
      }
    });
  }

  back(){
    this.id_etudiant = this._activatedRoute.snapshot.params['id_etudiant'];
    this.router.navigateByUrl('/vue-etudiant/'+this.id_etudiant);
  }

  envoyerMessageEtudiant(){

    this.id_projet = this._activatedRoute.snapshot.params['id'];
    this.id_etudiant = this._activatedRoute.snapshot.params['id_etudiant'];
    this.apiService.envoyerMessageEtudiant(this.id_projet,this.contenu,this.id_etudiant).subscribe({
      next: (re) => {
        this.contenu="";
        this.getAllMessages();

      },
      error: () => {
        alert("Impossible !");
      }
    });
  }


}
