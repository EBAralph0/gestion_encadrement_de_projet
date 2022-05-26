<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MessagesEnseignant extends Model
{
    //
    protected $fillable = ['id','id_projet','contenu','id_enseignant','id_etudiant'];
}
