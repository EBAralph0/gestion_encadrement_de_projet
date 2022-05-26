import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-message-enseignant',
  templateUrl: './message-enseignant.component.html',
  styleUrls: ['./message-enseignant.component.css']
})
export class MessageEnseignantComponent implements OnInit {

  projetInfo!:any;
  messages!:any;
  id_projet!:number;
  dataSourceEncadreur!:any;
  contenu!:string;

  constructor(private _activatedRoute: ActivatedRoute,private apiService : DataService,private router: Router) { 
    this._activatedRoute.queryParams.subscribe(params => {
      this.id_projet = params['id'];
  });
  }

  ngOnInit(): void {
    this.getAllMessages();
    this.getProjetById();
    this.showEncadreur();
  }

  getAllMessages(){
    this.id_projet = this._activatedRoute.snapshot.params['id'];
    this.apiService.getMessages(this.id_projet)
    .subscribe({
      next:(res)=>{
        this.messages = res;
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

  back(){
    this.router.navigateByUrl('/acceuil-enseignant/'+this.dataSourceEncadreur.id);
  }

  envoyerMessage(){
    this.id_projet = this._activatedRoute.snapshot.params['id'];
    this.apiService.envoyerMessageEnseignant(this.id_projet,this.contenu,this.dataSourceEncadreur.id).subscribe({
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
