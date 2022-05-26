<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enseignant;

class EnseignantController extends Controller
{
    //
    public function getEnseignant(){
        return response()->json(Enseignant::all(),200);
    }

    public function getEnseignantId($id){
        $enseignant = Enseignant::find($id);
        if(is_null($enseignant)){
            return response()->json(['message' =>'Enseignant introuvable !'], 404);
        }
        return response()->json($enseignant::find($id),200);
    }

    public function addEnseignant(Request $request){
        $ens = Enseignant::create($request->all());
        return response($ens,201);  
    }

    public function updateEnseignant(Request $request, $id){
        $enseignant = Enseignant::find($id);
        if (is_null($enseignant)) {
            return response()->json(['message' => 'Enseignant introuvable'], 404);
        }
        $enseignant->update($request->all());
        return response($enseignant,200);
    }

    public function deleteEnseignant(Request $request,$id){
        $enseignant = Enseignant::find($id);
        if (is_null($enseignant)) {
            return response()->json(['message' => 'Enseignant introuvable'], 404);
        }
        $enseignant->delete();
        return response()->json(null, 204);
    }

    public function loginEnseignant($login,$password){
        $condition = ['login' => $login,'password'=>$password];

        $idEnseignant = Enseignant::where($condition)->get('id');
        $enseignant = Enseignant::find($idEnseignant);
        
        if($idEnseignant->count()<=0){
            return response()->json(['message' =>'Enseignant introuvable !'], 404);
        }
            return response()->json($enseignant,200);
    }

    public function retrieveEnseignantId($login,$password){
        $condition = ['login' => $login,'password'=>$password];
        $idEnseignant = Enseignant::where($condition)->get('id');
        if (is_null($idEnseignant)) {
            return response()->json(['message' => 'Enseignant introuvable'], 404);
        }
        return response($idEnseignant,200);
    }

}
