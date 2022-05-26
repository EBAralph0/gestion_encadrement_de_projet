<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etapes;


class EtapeController extends Controller
{
    //
    public function getEtape(){
        return response()->json(Etapes::all(),200);
    }

    public function getProjetId($id){
        $etape = Etapes::select('*')
        ->join('projets','projets.id_etapes','=','etapes.id')
        ->where('projets.id','=',$id)
        ->get();
        if(is_null($etape)){
            return response()->json(['message' =>'Etape introuvable !'], 404);
        }
        return response()->json($etape,200);

    }

    public function addEtape(Request $request){
        $etape = Etapes::create($request->all());
        return response($etape,201);  
    }

    public function updateEtape(Request $request,$id){
        $etape = Etapes::find($id);
        if (is_null($etape)) {
            return response()->json(['message' => 'Etape introuvable'], 404);
        }
        $etape->update($request->all());
        return response($etape,200);
    }

    public function deleteEtape(Request $request,$id){
        $etape = Etapes::find($id);
        if (is_null($etape)) {
            return response()->json(['message' => 'Etape introuvable'], 404);
        }
        $etape->delete();
        return response()->json(null, 204);
    }

    public function lastStep(){
        return Etapes::max('id');
    }

    public function firstStep(){
        return Etapes::min('id');
    }

}
