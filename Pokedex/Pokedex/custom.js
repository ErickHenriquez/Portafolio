/* Variables globales */
var NextList;
var PrevList;

/* Funcion que crea el sonido respectivo con la url local dada */
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

/* Funcion que crea la url local del sonido del pokemon clickeado y reproduce su sonido */
function pokemonSound(numero){
    myMusic = new sound("sounds/" + numero + ".wav");
    myMusic.play();
}

/* Funcion que recibe el inicio y final de la cantidad de pokemones a mostrar en la lista, 
   se utiliza fetch para llamar a la API y se almacenan las promesas en un arreglo 
   para luego obtener los resultados del objeto y sacar la informacion de cada pokemon. */
function ListaPokemones(urlPage){
    var pokeData;
    $.ajax({
        method: "GET",
        url: urlPage,
        dataType: 'json',
        async: false
    })
    .done(function(data) {
        NextList = data.next;
        PrevList = data.previous;
        pokeData = data;
    });
    return pokeData;
}

/* Luego de recibir el objeto pokemon crea un <div> por cada pokemon para mostrar los datos del pokemon y agregarlos al HTML */
function MostrarPokemones(Lista){
    const pokedex = document.getElementById("libro");
    var output = "";
    for (let i=0; i<Lista.results.length; i++){
        urlPokemon = Lista.results[i].url;
        $.ajax({
            method: "GET",
            url: urlPokemon,
            dataType: 'json',
            async: false
        })
        
        .done(function(dataPoke) {
            output += "<div id='pokemon" + dataPoke.id +"' class='col pokemon'>";
            output += "<h3>" + dataPoke.id + ". " + dataPoke.name[0].toUpperCase() + dataPoke.name.slice(1) + "</h3>";
            output += "<img src=" + dataPoke.sprites.front_default + " class='sound' pokenumero='" + dataPoke.id + "'>"; 
            output += "<h4>Types: <span>";
            for (let h=0; h<dataPoke.types.length; h++){
                if (h !== dataPoke.types.length-1){
                    output += dataPoke.types[h].type.name + ", ";
                }
                else{
                    output += dataPoke.types[h].type.name;
                }
            }
            output += "</span></h4>";
            output += "<h4>Height: <span>" + dataPoke.height + "</span></h4>";
            output += "<h4>Abilities: <span>";
            for (let j=0; j<dataPoke.abilities.length; j++){
                if (j !== dataPoke.abilities.length-1){
                    output += dataPoke.abilities[j].ability.name + ", ";
                }
                else{
                    output += dataPoke.abilities[j].ability.name;
                }
            }
            output += "</span></h4>";
            output += "</div>";
            if (dataPoke.id % 5 == 0){
                output += "<div class='w-100'></div>"; // Separa los pokemones dentro del <div> de a 5 para su mejor visualizacion
            }
        });
    }
    pokedex.innerHTML = output;
}

/* Funcion que permite obtener los datos de descripcion del pokemon seleccionado */
function descriptionPokemon(pokemon){
    var url = "https://pokeapi.co/api/v2/pokemon-species/" + (pokemon) + "/";
    var output = "";
    var flavorTexts = [] ;
    var countText;
    $.ajax({
        method: "GET",
        url: url,
        dataType: 'json',
        async: false
    })
    .done(function(data) {
        for (let i=0; i<data.flavor_text_entries.length; i++){
            if (data.flavor_text_entries[i].language.name == 'en'){ // esto me permite obtener las descripciones de un idioma en especifico, puede ser cambiado facilmente a español
                countText = 0;
                var text = JSON.stringify(data.flavor_text_entries[i].flavor_text);
                var str = text.replace(/\\n|\\f/g, ' ');
                for (let h=0; h<flavorTexts.length; h++){
                    if (str === flavorTexts[h]){
                        countText += 1;
                    }
                }
                if (countText === 0){
                    flavorTexts.push(str);
                    output += "<h4><span>" + str + "</span></h4>";
                    if (flavorTexts.length === 4){ // Desde aca marco el limite de 4 descripciones solamente pero puedo obtenerlas todas
                        i = data.flavor_text_entries.length;
                    }
                }
            }
        }
    });    
    return output;
}

/* Funcion que permite obtener los datos de la familia evolutiva del pokemon seleccionado, tanto evoluciones previas como anexas o posteriores */
function evolutionsPokemon(pokemon){
    var url = "https://pokeapi.co/api/v2/pokemon-species/" + (pokemon) + "/";
    var urlEvolutions;
    var output = "";
    var evolutions = [];
    var n_anterior = 0;
    var num_lista = 1;
    $.ajax({ // Con esta peticion obtenego la url donde se encuentra la familia evolutiva del pokemon
        method: "GET",
        url: url,
        dataType: 'json',
        async: false
    })
    .done(function(data1) {
       urlEvolutions = data1.evolution_chain.url;
    });

    $.ajax({ // Con esta peticion recorro el objeto de la familia evolutiva del pokemon para obtener los nombres
        method: "GET",
        url: urlEvolutions,
        dataType: 'json',
        async: false
    })
    .done(function(data2) { // El recorrido de esta peticion es como una especie de arbol donde en nodos especficos estan los nombres y cada rama es una evolucion
        function searchEvolutions(obj, nivel){ // Para ello usamos una funcion recursiva para llegar a todos los nodos
            evolutions.push(obj.species.name);  // Almacenamos el nombre de cada pokemon en un arreglo, de esta forma obtenemos la linea sucesoria de evoluciones por pokemon
            if (obj.evolves_to.length !== 0){
                for(let i=0; i<obj.evolves_to.length; i++){
                    searchEvolutions(obj.evolves_to[i], nivel+1);
                    if (nivel >= n_anterior){
                        console.log("Evoluciones: " + evolutions);
                        n_anterior = nivel;
                        output += "<h4><span>"+ num_lista + ". ";
                        for(let h=0; h<evolutions.length; h++){
                            if (h != evolutions.length-1){
                                output += evolutions[h][0].toUpperCase() + evolutions[h].slice(1) + " -> ";
                            }
                            else{
                                output += evolutions[h][0].toUpperCase() + evolutions[h].slice(1);
                            }
                        }
                        output += "</span></h4>";
                        num_lista++;   
                    }
                    evolutions.pop(); // una vez llegado al final de un nodo sacamos el ultimo pokemon de la lista para incluir el de la rama siguiente

                }
            }
            else{
                if (evolutions.length == 1){
                    output += "<h4><span>Este pokemon no tiene evoluciones</span></h4>"
                }
            }
        }

        searchEvolutions(data2.chain, 1);
        console.log(evolutions);      
    });   
    
    return output;
}

/* Funcion que muestra interacciones de la pagina, posterior a mostrar los pokemones */
function interacciones(){

	// 1.-Hace el pokedex visible, 3.-Crea la imagen del pokemon en la pokedex
    $(document).on('click', '#libro img', function(){ 
        if ($(this).attr('pokenumero') !== undefined){
            var numeroPokemon = $(this).attr('pokenumero');
            console.log (numeroPokemon);
            var urlImgPokemon = "http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + numeroPokemon; 
            $("#pokedex").after("<img class='pokedex pokeenpokedex sound' src='" + urlImgPokemon + ".png' pokenumero='" + (numeroPokemon) + "'>");
            $(".pokedex").css('visibility', 'visible');
            const infoPokemon = document.getElementById("infopokemon");
            var output = "";
            $.ajax({
                method: "GET",
                url: "https://pokeapi.co/api/v2/pokemon/" + (numeroPokemon) +"/",
                dataType: 'json',
                async: false
            })
            .done(function(dataPoke) {
                output += "<h3>" + dataPoke.name[0].toUpperCase() + dataPoke.name.slice(1) + "</h3>";
                output += "<h4>Number: <span>" + dataPoke.id + "</span></h4>";
                output += "<h4>Types: <span>";
                for (let h=0; h<dataPoke.types.length; h++){
                    if (h !== dataPoke.types.length-1){
                        output += dataPoke.types[h].type.name + ", ";
                    }
                    else{
                        output += dataPoke.types[h].type.name;
                    }
                }
                output += "</span></h4>";
                output += "<h4>Height: <span>" + dataPoke.height + "</span></h4>";
                output += "<h4>Abilities: <span>";
                for (let j=0; j<dataPoke.abilities.length; j++){
                    if (j !== dataPoke.abilities.length-1){
                        output += dataPoke.abilities[j].ability.name + ", ";
                    }
                    else{
                        output += dataPoke.abilities[j].ability.name;
                    }
                }
                output += "</span></h4>";
                output += "<h4>Description:</h4>";
                output += descriptionPokemon(numeroPokemon);

                output += "<h4>Evolutions:</h4>";
                output += evolutionsPokemon(numeroPokemon);

                infoPokemon.innerHTML = output;
            });
            
        }
    });

    // 1.-Activa la reproduccion del sonido del pokemon dentro y fuera de la pokedex
    $(document).on('click', '.container .sound', function(){ // 
        if ($(this).attr('pokenumero') !== undefined && $(this).attr('pokenumero') < 152){
            pokemonSound($(this).attr('pokenumero'));
        }
    });

    // Muestra los siguientes o anteriores 20 pokemones de la lista
    $(document).on('click', '.pokeballs', function(){ 
        if ($(this).attr("id") === "pokeballBack"){
            console.log("BACK");
            if (PrevList !== null){
                $(".pokemon").remove();
                MostrarPokemones(ListaPokemones(PrevList));
            }
            else{
                console.log("no existe pagina anterior");
            }
        }
        else{
            console.log("NEXT");
            if (NextList !== null){
                $(".pokemon").remove();
                MostrarPokemones(ListaPokemones(NextList));
            }
            else{
                console.log("no existe pagina posterior");
            }
        }
    });

    // Borra la imagen del pokemon en la pokedex y los datos del pokkemon, ademas esconde la imagen del pokedex
    $(document).on('click', '#exit', function(){ 
        $(".pokeenpokedex").remove();
        $(".pokedex").css('visibility', 'hidden');
    });

}

/* Comienza el llenado de la lista inicial de pokemones */
$(document).ready(function(){
    var urlApi = "https://pokeapi.co/api/v2/pokemon/";
    var pokeLista = ListaPokemones(urlApi);
    MostrarPokemones(pokeLista);
    interacciones();
    
});



