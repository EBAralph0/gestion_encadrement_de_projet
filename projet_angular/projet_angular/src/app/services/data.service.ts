import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL='http://127.0.0.1:8000/api/';
  constructor(private httpClient:HttpClient) { }

  getProjet(){
    return this.httpClient.get<any>(this.API_URL+'projets');
  }

  getListProjet(){
    return this.httpClient.get<any>(this.API_URL+'projet_display');
  }

  putProjet(data:any,id:number){
    return this.httpClient.post<any>(this.API_URL+'updateProjet/'+id,data)
  }

  projet_for_enseignant(id:number){
    return this.httpClient.get<any>(this.API_URL+'projet_for_enseignant/'+id);
  }

  loginResponsable(login:string,password:string){
    return this.httpClient.get<any>(this.API_URL+'loginResponsable/'+login+'/'+password);
  }
  loginEnseignant(login:string,password:string){
    return this.httpClient.get<any>(this.API_URL+'loginEnseignant/'+login+'/'+password);
  }
  loginEtudiant(login:string,password:string){
    return this.httpClient.get<any>(this.API_URL+'loginEtudiant/'+login+'/'+password);
  }

  retrieveEnseignantId(login:string,password:string){
    return this.httpClient.get<any>(this.API_URL+'retrieveEnseignantId/'+login+'/'+password);
  } 

  getProjetById(id:number){
    return this.httpClient.get<any>(this.API_URL+'projet/'+id);
  }

  getEncadreur(idProjet:number){
    return this.httpClient.get<any>(this.API_URL+'getEncadreur/'+idProjet);
  }

  getEtudiantById(idProjet:number){
    return this.httpClient.get<any>(this.API_URL+'getEtudiantById/'+idProjet);
  }

  getSteps(){
    return this.httpClient.get<any>(this.API_URL+'etapes');
  }

  getStepsOfProject(idProjet:number){
    return this.httpClient.get<any>(this.API_URL+'etape/'+idProjet);
  }

  advanceProjet(id:number,currentStep:number){
    return this.httpClient.put(this.API_URL+'advanceProjet/'+id+'/'+currentStep,id);
  }

  retrogradeProjet(id:number,currentStep:number){
    return this.httpClient.put(this.API_URL+'retrogradeProjet/'+id+'/'+currentStep,id);
  }

  firstStep(){
    return this.httpClient.get<any>(this.API_URL+'firstStep');
  }

  lastStep(){
    return this.httpClient.get<any>(this.API_URL+'lastStep');
  }

  definirTheme(theme:string,id:number){
    return this.httpClient.put(this.API_URL+'definirTheme/'+theme+'/'+id,id);
  }

  projet_for_etudiant(id:number){
    return this.httpClient.get<any>(this.API_URL+'projet_for_etudiant/'+id);
  }

  document_word(document:any,id:number){
    return this.httpClient.put(this.API_URL+'document_word/'+document+'/'+id,id);
  }

  getMessages(id:number){
    return this.httpClient.get<any>(this.API_URL+'getMessageByProject/'+id);
  }

  envoyerMessageEnseignant(id_projet:number,contenu: string,id_enseignant:number){
    return this.httpClient.post<any>(this.API_URL+'sendMessageEnseignant/'+id_projet+'/'+contenu+'/'+id_enseignant,contenu)
  }

  envoyerMessageEtudiant(id_projet:number,contenu: string,id_etudiant:number){
    return this.httpClient.post<any>(this.API_URL+'sendMessageEtudiant/'+id_projet+'/'+contenu+'/'+id_etudiant,contenu)
  }

  getEncadreurByStudent(id_etudiant:number){
    return this.httpClient.get<any>(this.API_URL+'getEncadreurEtudiant/'+id_etudiant);

  }

  allEtudiantOneProject(id_projet:number){
    return this.httpClient.get<any>(this.API_URL+'allEtudiantOneProject/'+id_projet);
  }

}
