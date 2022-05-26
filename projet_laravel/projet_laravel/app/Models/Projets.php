<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projets extends Model
{
    //
    protected $fillable = ['theme','id_enseignant','id_etapes','photo_projet','document_word','document_pdf']; 

}
