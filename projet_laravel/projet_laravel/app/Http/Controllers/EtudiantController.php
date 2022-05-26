<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiants;

class EtudiantController extends Controller
{
    //
    public function getEtudiant(){
        return response()->json(Etudiants::all(),200);
    }

    public function getEtudiantId($id){
        $etudiant = Etudiants::find($id);
        if(is_null($etudiant)){
            return response()->json(['message' =>'Etudiant introuvable !'], 404);
        }
        return response()->json($etudiant::find($id),200);

      
    }

    public function loginEtudiant($login,$password){
        $condition = ['login' => $login,'password'=>$password];

        $idEtudiant = Etudiants::where($condition)->get('id');
        $etudiant = Etudiants::find($idEtudiant);
        
        if($idEtudiant->count()<=0){
            return response()->json(['message' =>'Etudiant introuvable !'], 404);
        }
            return response()->json($etudiant,200);
    }

    public function getEncadreurEtudiant($id_etudiant){
        $etudiant = Etudiants::select('enseignants.id','enseignants.nom_enseignant','enseignants.prenom_enseignant','enseignants.telephone_enseignant','enseignants.email_enseignant')
        ->join('projets','projets.id','=','etudiants.id_projet')
        ->join('enseignants','enseignants.id','=','projets.id_enseignant')
        ->where('etudiants.id','=',$id_etudiant)
        ->get();
        if(is_null($etudiant)){
            return response()->json(['message' =>'projets introuvable !'], 404);
        }
        return response()->json($etudiant,200);
    }
    
}
