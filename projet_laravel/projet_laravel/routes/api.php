<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 *  CRUD ENSEIGNANT
*/
//get all enseignant
Route::get('enseignants','EnseignantController@getEnseignant');

//get one enseignant
Route::get('enseignant/{id}','EnseignantController@getEnseignantId');

//Add enseignant
Route::post('addEnseignant','EnseignantController@addEnseignant');

//Update enseignant
Route::put('updateEnseignant/{id}','EnseignantController@updateEnseignant');

// delete enseignant
Route::delete('deleteEnseignant/{id}','EnseignantController@deleteEnseignant');

//login enseignant
Route::get('loginEnseignant/{login}/{password}','EnseignantController@loginEnseignant');

// retrieve enseignant
Route::get('retrieveEnseignantId/{login}/{password}','EnseignantController@retrieveEnseignantId');



/**
 *  CRUD ETAPES
 */
//get all etapes
Route::get('etapes','EtapeController@getEtape');

//get one etape
Route::get('etape/{id}','EtapeController@getProjetId');

//Add etape
Route::post('addEtape','EtapeController@addEtape');

//Update etape
Route::put('updateEtape/{id}','EtapeController@updateEtape');

//delete etape
Route::delete('deleteEtape/{id}','EtapeController@deleteEtape');

//get last Etape
Route::get('lastStep','EtapeController@lastStep');

//get first Etape
Route::get('firstStep','EtapeController@firstStep');


/**
 * CRUD ETUDIANT 
 */
//get all etudiants
Route::get('etudiants','EtudiantController@getEtudiant');

// get one etudiant
Route::get('etudiant/{id}','EtudiantController@getEtudiantId');

//login etudiant
Route::get('loginEtudiant/{login}/{password}','EtudiantController@loginEtudiant');

//get l'encadreur de l'etudiant
Route::get('getEncadreurEtudiant/{id_etudiant}','EtudiantController@getEncadreurEtudiant');




/**
 * CRUD Responsable
 */
//get all respo
Route::get('responsables','ResponsableController@getResponsable');

//get one respo
Route::get('responsables/{id}','ResponsableController@getResponsableId');

// login respo
Route::get('loginResponsable/{login}/{password}','ResponsableController@getResponsableConnexion');


/**
 * CRUD PROJET
 */
// get all projet
Route::get('projets','ProjetController@getAllProjet');

//get one projet
Route::get('projet/{id}','ProjetController@getProjetById');

// add projet
Route::post('addProjet','ProjetController@addProjet');

//update projet
Route::put('updateProjet/{id}','ProjetController@updateProjet');

//delete projet
Route::delete('deleteProjet/{id}','ProjetController@deleteProjet');

//get project with all info
Route::get('projet_display','ProjetController@getDisplayProjet');

//get projet for enseignant
Route::get('projet_for_enseignant/{id}','ProjetController@projet_for_enseignant');

//get encadreur
Route::get('getEncadreur/{id}','ProjetController@getEncadreur');

//get etutiant by project
Route::get('getEtudiantById/{id}','ProjetController@getEtudiantById');

//avencer le projet
Route::put('advanceProjet/{id}/{currentStep}','ProjetController@advanceProjet');

//avencer le projet
Route::put('retrogradeProjet/{id}/{currentStep}','ProjetController@retrogradeProjet');

// definir le theme
Route::put('definirTheme/{theme}/{id}','ProjetController@definirTheme');

//get projet for etudiant
Route::get('projet_for_etudiant/{id}','ProjetController@projet_for_etudiant');

// document word du projet
Route::put('document_word/{document}/{id}','ProjetController@document_word');

//get all etdiant on one project
Route::get('allEtudiantOneProject/{id}','ProjetController@allEtudiantOneProject');



/**
 * CRUD message enseignant
 */
//get all rmessage 
Route::get('getMessageByProject/{id}','MessagesEnseignantController@getMessageByProject');

// send message enseignat
Route::post('sendMessageEnseignant/{id}/{contenu}/{id_enseignant}','MessagesEnseignantController@sendMessageEnseignant');

// send message étudiant
Route::post('sendMessageEtudiant/{id}/{contenu}/{id_etudiant}','MessagesEnseignantController@sendMessageEtudiant');
