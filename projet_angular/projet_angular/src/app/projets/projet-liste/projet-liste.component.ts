import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-projet-liste',
  templateUrl: './projet-liste.component.html',
  styleUrls: ['./projet-liste.component.css']
})
export class ProjetListeComponent implements OnInit {

  constructor(private dataService:DataService,private datepipe: DatePipe,private router: Router) { }

  displayedColumns: string[] = ['id', 'theme', 'created_at', 'nom_enseignant','Statut','action'];
  projets!:MatTableDataSource<any>;
  dataDisplay!:[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentDate = new Date();
  latest_date = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd hh:mm:ss');

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(){
    this.dataService.getListProjet().subscribe({
      next:(res)=>{
        this.projets = new MatTableDataSource(res);
        this.projets.paginator = this.paginator;
        this.projets.sort = this.sort;
      },
      error:()=>{
        alert("Erreur lors de l'affichage de la liste des projets");
      }
    })
  }

  goToDetail(id:number){
    this.router.navigateByUrl('/detail-projet/'+id);
  }

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.projets.filter = filterValue.trim().toLowerCase();

    if (this.projets.paginator) {
      this.projets.paginator.firstPage();
    }
  }

}
