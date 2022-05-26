import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitedLogin!: string;
  submitedPassword!: string;

  constructor(private formBuilder: FormBuilder, private apiService: DataService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.submitedLogin = this.loginForm.controls['login'].value;
      this.submitedPassword = this.loginForm.controls['password'].value;
      this.apiService.loginResponsable(this.submitedLogin, this.submitedPassword)
        .subscribe({
          next: (res) => {
            this.router.navigateByUrl('/liste_projet');
          },
          error: () => {
            this.apiService.loginEnseignant(this.submitedLogin, this.submitedPassword)
              .subscribe({
                next: (res) => {
                  this.apiService.retrieveEnseignantId(this.submitedLogin, this.submitedPassword).subscribe({
                    next:(r)=>{
                      const idEnseignant = r[0]['id'];
                      this.router.navigateByUrl('/acceuil-enseignant/'+idEnseignant);
                    },
                    error:()=>{
                      alert("Impossible de recuperer les données de l'enseignant !");
                    }
                  })
                },
                error: () => {
                  this.apiService.loginEtudiant(this.submitedLogin, this.submitedPassword)
                    .subscribe({
                      next: (res) => {
                        const idEtudiant = res[0]['id'];
                        this.router.navigateByUrl('vue-etudiant/'+idEtudiant);
                      },
                      error: () => {
                        alert("Compte introuvable !")
                      }
                    });
                }
              });
          }
        });
    }
  }

}
