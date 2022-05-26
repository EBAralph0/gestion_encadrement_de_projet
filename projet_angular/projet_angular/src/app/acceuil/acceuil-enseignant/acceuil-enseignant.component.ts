import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-acceuil-enseignant',
  templateUrl: './acceuil-enseignant.component.html',
  styleUrls: ['./acceuil-enseignant.component.css']
})

export class AcceuilEnseignantComponent implements OnInit {

  dataSource !:any;
  // projets :
  id_enseignant!:number;
  
  constructor(private _activatedRoute: ActivatedRoute,private apiService : DataService,private router: Router) { 
    this._activatedRoute.queryParams.subscribe(params => {
      this.id_enseignant = params['id'];
  });
  }

  ngOnInit(): void {
    this.getEnseignantProjet()
  }

  getEnseignantProjet(){
    this.id_enseignant = this._activatedRoute.snapshot.params['id'];
    this.apiService.projet_for_enseignant(this.id_enseignant)
    .subscribe({
      next:(res)=>{
        this.dataSource = res;
      },
      error:()=>{
        alert("Impossible de retrouver vos groupes");
      }
    })
  }

  chooseProject(id:number){
    // this.id_enseignant = this._activatedRoute.snapshot.params['id'];
    this.router.navigateByUrl('/vue-enseignant/'+id);
  }

  goToChat(id:number){
    this.router.navigateByUrl('/message-enseignant/'+id);
  }
}
