<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiants extends Model
{
    //
    protected $fillable = ['nom_etudiant','prenom_etudiant','filiere_etudiant','classe_etudiant','photo_etudiant','id_projet','login','password']; 

}
