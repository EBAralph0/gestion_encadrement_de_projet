<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MessagesEnseignant;


class MessagesEnseignantController extends Controller
{
    //
    public function getMessageByProject($id){
        $projets = MessagesEnseignant::select('messages_enseignants.id','messages_enseignants.id_projet','messages_enseignants.contenu','messages_enseignants.id_enseignant',
        'messages_enseignants.created_at','messages_enseignants.id_etudiant')
        ->join('projets','projets.id','=','messages_enseignants.id_projet')
        ->where('projets.id','=',$id)
        ->get();
        if(is_null($projets)){
            return response()->json(['message' =>'Messages introuvables !'], 404);
        }
        return response()->json($projets,200);
    }

    public function sendMessageEnseignant($id,$contenu,$id_enseignant,Request $request){
        $data=$request->all();
        $data['id_projet']=$id;
        $data['contenu']=$contenu;
        $data['id_enseignant']=$id_enseignant;
        $msg = MessagesEnseignant::create($data);
        return response($msg,201);  
    }

    public function sendMessageEtudiant($id,$contenu,$id_etudiant,Request $request){
        $data=$request->all();
        $data['id_projet']=$id;
        $data['contenu']=$contenu;
        $data['id_etudiant']=$id_etudiant;
        $msg = MessagesEnseignant::create($data);
        return response($msg,201);  
    }
}
