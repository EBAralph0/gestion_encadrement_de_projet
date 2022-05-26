<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model
{
    //
    //public $timestamps = false;
    protected $fillable = ['nom_enseignant','prenom_enseignant','telephone_enseignant','email_enseignant']; 
}
