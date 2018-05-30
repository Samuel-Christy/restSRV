// !! ce fichier doit être déclaré dans /app.js pour être pris en compte !!
// cf lignes 18 & 38

//en ligne 38 de /app.js, on spécifie que toutes les routes ici seront du genre http://monserveur/Todos/{les méthodes définies ici}


//import de modules :
var express = require('express'); // le coeur du webserver
var router = express.Router(); // le routeur du coeur du webserver
var Todos = require('../models/Todos'); // le modèle (peut nécessiter changement de chemin pour s'adapter à ton projet)

/*
* GET
* */

// Todos/id?

//router.get = méthode HTTP GET !
router.get('/:id?', function (request, response, next) {
    //méthode anonyme, le routeur fournit ses paramètres
    // ----------------------------------------------------------------------------------------------
    //      '/:id?' veut dire :
    //      /        = racine
    //      :id      = paramètre (nommé id)
    //      ?        = le paramètre est facultatif
    //
    // ----------------------------------------------------------------------------------------------
    // paramètres :
    // ----------------------------------------------------------------------------------------------
    // request = requête entrante, response = requête sortante, next : prochain saut (si nécessaire)

    if (request.params.id) { //si la requête contient un id
        Todos.getById(
            request.params.id, //on fait suivre le paramètre de la requête à la méthode de notre modèle
            //et on lui fournit une fonction anonyme en guise de callback (la méthode du modèle Todos appelle cette méthode)
            // et lui passe les paramètres [ error ] & [ rows ]
            function (error, rows) {
                if (error) {
                    response.json(error); //en cas d'erreur, on envoie l'objet error en JSON, tel quel
                } else {
                    response.json(rows); // sinon, on envoie les resultats au format JSON
                }
            })
    } //fin de if (request.params.id)
    else { //si pas d'id fourni, on sélectione tous les Todos
        Todos.getAll(function (error, rows) { //la méthode du modèle ne requiert qu'un callback, on renvoie la méthode anonyme
            if (error) {
                response.json(error); //en cas d'erreur, on envoie l'objet error en JSON, tel quel
            } else {
                response.json(rows); // sinon, on envoie les resultats au format JSON
            }
        });
    }
});


/*
* POST
* */

router.post('/', function (request, response, next) {
    Todos.add(
        request.body, //ce qui a été envoyé au serveur par la méthode HTTP POST
        function (error, count) {
            //on ne se sert pas de count, mais il contient le nombre d'enregistrements concernés par la requête
            if (error) {
                response.json(error);
            } else {
                response.json(request.body); //on renvoie l'objet si OK
            }
        })
});

/*
* PUT
* */

router.put('/', function (request, response, next) {
    Todos.update(
        request.body, //ce qui a été envoyé au serveur par la méthode HTTP POST (typiquement,
        // { id:12 }
        // )
        function (error, rows) {
            //rows contient les enregistrements modifiés
            if (error) {
                response.json(error);
            } else {
                response.json(rows); //on renvoie l'objet modifié si OK
            }
        })
});


/*
* PUT
*/
//note : ici, le paramètre ID n'est pas facultatif !
router.delete('/:id', function (request, response, next) {


    Todos.delete(request.params.id,
        function (error, count) {
            //count = nombre d'enregistrements supprimés, non utilisé
            if (error) {
                response.json(error);
            } else {
                response.json(request.params.id); //on renvoie l'id de l'enregistrement modifié
            }
        })
});

//publication du module routeur pour qu'on puisse l'utiliser ailleurs (/app.js)
module.exports = router;