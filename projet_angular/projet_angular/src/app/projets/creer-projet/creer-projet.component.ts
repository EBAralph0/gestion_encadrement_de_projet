import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-creer-projet',
  templateUrl: './creer-projet.component.html',
  styleUrls: ['./creer-projet.component.css']
})
export class CreerProjetComponent implements OnInit {

  projetForm!:FormGroup;
  actionBtn: string='Valider';
  actionTitle: string='Définissez votre theme';
  idProjet !: number;
  dataSourceProjet!:any;
  edtied_theme!:string;

  constructor(private formBuilder:FormBuilder, private apiService:DataService,private _activatedRoute: ActivatedRoute,private router: Router) { 
    this._activatedRoute.queryParams.subscribe(params => {
      this.idProjet = params['id'];
    });
  }

  ngOnInit(): void {
    this.projetForm = this.formBuilder.group({
      theme:['',Validators.required],
    });
    this.showDetailProjet();
  }

  definirTheme(){
    if(this.projetForm.valid){
      this.apiService.definirTheme(this.edtied_theme,this.idProjet)
      .subscribe({
        next:(res)=>{
          alert("Theme défini avec succes !");
          
        },
        error:()=>{
          alert("Impossible de définir ce theme!");
        }
      })
    }
  }

  showDetailProjet() {
    this.idProjet = this._activatedRoute.snapshot.params['id'];
    this.apiService.getProjetById(this.idProjet).subscribe({
      next: (r) => {
        this.dataSourceProjet = r;
        this.projetForm.controls['theme'].setValue(this.dataSourceProjet.theme);

      },
      error: () => {
        alert("Impossible de recuperer les données du projet");
      }
    });
  }

  back(){
    this.idProjet = this._activatedRoute.snapshot.params['id'];
    this.router.navigateByUrl('/vue-enseignant/'+this.idProjet);

}
}
