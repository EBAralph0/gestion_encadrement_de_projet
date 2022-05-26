<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Projets;


class ProjetController extends Controller
{
    //
    public function getAllProjet(){
        return response()->json(Projets::all(),200);
    }

    public function getProjetById($id){
        $projet = Projets::find($id);
        if(is_null($projet)){
            return response()->json(['message' =>'projet introuvable !'], 404);
        }
        return response()->json($projet::find($id),200);
    }

    public function addProjet(Request $request){
        $projet = Projets::create($request->all());
        return response($projet,201);  
    }

    public function updateProjet(Request $request,$id){
        $projet = Projets::find($id);
        if (is_null($projet)) {
            return response()->json(['message' => 'projet introuvable'], 404);
        }
        $projet->update($request->all());
        return response($projet,200);
    }

    public function deleteProjet(Request $request,$id){
        $projet = Projets::find($id);
        if (is_null($projet)) {
            return response()->json(['message' => 'Projet introuvable'], 404);
        }
        $projet->delete();
        return response()->json(null, 204);
    }

    public function getDisplayProjet(){
        $projets = Projets::select('projets.id','projets.theme','projets.created_at','enseignants.nom_enseignant','enseignants.prenom_enseignant','etapes.date_limite')
        ->join('enseignants','enseignants.id','=','projets.id_enseignant')
        ->join('etapes','etapes.id','=','projets.id_etapes')
        ->get();
        if(is_null($projets)){
            return response()->json(['message' =>'projet introuvable !'], 404);
        }
        return response()->json($projets,200);
    }

    public function projet_for_enseignant($id){
        $projets = Projets::select('projets.id','projets.theme','projets.id_enseignant')
        ->join('enseignants','projets.id_enseignant','=','enseignants.id')
        ->where('enseignants.id','=',$id)
        ->get();
        if(is_null($projets)){
            return response()->json(['message' =>'projets introuvable !'], 404);
        }
        return response()->json($projets,200);
    }

    public function getEncadreur($id){
        $projets = Projets::select('enseignants.id','enseignants.nom_enseignant','enseignants.prenom_enseignant','enseignants.telephone_enseignant','enseignants.email_enseignant')
        ->join('enseignants','projets.id_enseignant','=','enseignants.id')
        ->where('projets.id','=',$id)
        ->get();
        if(is_null($projets)){
            return response()->json(['message' =>'encadreur introuvable !'], 404);
        }
        return response()->json($projets,200);
    }

    public function getEtudiantById($id){
        $projets = Projets::select('*')
        ->join('etudiants','etudiants.id_projet','=','projets.id')
        ->where('etudiants.id','=',$id)
        ->get();
        if(is_null($projets)){
            return response()->json(['message' =>'etudiants introuvable !'], 404);
        }
        return response()->json($projets,200);
    }

    public function advanceProjet(Request $request,$id,$currentStep){
        $projet = Projets::find($id);
        if (is_null($projet)) {
            return response()->json(['message' => 'projet introuvable'], 404);
        }
        $projet->update(['id_etapes' => $request->input('id_etapes',$currentStep+1)]);
        return response($projet,200);
    }

    public function retrogradeProjet(Request $request,$id,$currentStep){
        $projet = Projets::find($id);
        if (is_null($projet)) {
            return response()->json(['message' => 'projet introuvable'], 404);
        }
        $projet->update(['id_etapes' => $request->input('id_etapes',$currentStep-1)]);
        return response($projet,200);
    }

    public function definirTheme($theme,$id,Request $request){
        $projet = Projets::find($id);
        if (is_null($projet)) {
            return response()->json(['message' => 'projet introuvable'], 404);
        }
        $projet->update(['theme' => $request->input('theme',$theme)]);
        return response($projet,200);
    }

    public function projet_for_etudiant($id){
        $projets = Projets::select('projets.id','projets.theme','projets.id_enseignant')
        ->join('etudiants','projets.id','=','etudiants.id_projet')
        ->where('etudiants.id','=',$id)
        ->get();
        if(is_null($projets)){
            return response()->json(['message' =>'projets introuvable !'], 404);
        }
        return response()->json($projets,200);
    }

    public function document_word($document,$id,Request $request){
        $projet = Projets::find($id);
        if (is_null($projet)) {
            return response()->json(['message' => 'projet introuvable'], 404);
        }
        $projet->update(['document_word' => $request->input('document_word',$document)]);
        return response($projet,200);
    }

    public function allEtudiantOneProject($id){
        $projets = Projets::select('*')
        ->join('etudiants','projets.id','=','etudiants.id_projet')
        ->where('etudiants.id_projet','=',$id)
        ->get();
        if(is_null($projets)){
            return response()->json(['message' =>'projets introuvable !'], 404);
        }
        return response()->json($projets,200);
    }
    
}
