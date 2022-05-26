<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Responsable;


class ResponsableController extends Controller
{
    //
    public function getResponsable(){
        return response()->json(Responsable::all(),200);
    }

    public function getResponsableConnexion($login,$password){
        
        $condition = ['login' => $login,'password'=>$password];

        $idRespo = Responsable::where($condition)->get('id');
        $responsable = Responsable::find($idRespo);
        
        if($idRespo->count()<=0){
            return response()->json(['message' =>'Responsable introuvable !'], 404);
        }
            return response()->json($responsable,200);
    }

    public function getResponsableId($id){
        $responsable = Responsable::find($id);
        if(is_null($responsable)){
            return response()->json(['message' =>'Responsable introuvable !'], 404);
        }
        return response()->json($responsable::find($id),200);
    }

    public function loginResponsable($login,$password){
        $condition = ['login' => $login,'password'=>$password];

        $idEtudiant = Responsable::where($condition)->get('id');
        $etudiant = Responsable::find($idEtudiant);
        
        if($idEtudiant->count()<=0){
            return response()->json(['message' =>'Responsable introuvable !'], 404);
        }
            return response()->json($etudiant,200);
    } 

}
