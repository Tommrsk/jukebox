const playlist = document.getElementById("playlist");
const randomButton = document.createElement("button");
randomButton.textContent = "Choisir une musique aléatoire";
randomButton.id = "randomButton";
document.body.appendChild(randomButton); // Ajoute le bouton au corps du document

const dureeMusique = document.getElementById("dureeMusique"); // Sélectionne l'élément pour afficher la durée

const config = {
    urlCover : "covers/",
    urlSound : "musics/",
};

const getData = async () =>{
    const req = await fetch("https://api-goat.onrender.com/api/v1/musics");
    console.log(req);
    const dbMusic = await req.json();
    data = dbMusic.result;
    console.log("result ", dbMusic);

    randomButton.addEventListener("click", function() {
        // Supprime la classe "rotate" de toutes les couvertures d'album
        const allCovers = document.querySelectorAll(".rotate");
        allCovers.forEach((cover) => {
            cover.classList.remove("rotate");
        });

        // Sélectionne une musique aléatoire depuis la base de données
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomMusic = data[randomIndex];
        
        // Met à jour le lecteur avec la musique aléatoire sélectionnée
        if (randomMusic) {
            console.log(randomMusic);
            // alert(`Veux-tu écouter le titre : ${randomMusic.title}`);
            lecteur.src = `${config.urlSound}${randomMusic.sound}`;
            lecteur.play(); // Lancer la musique automatiquement
            
           
        
            
            
               
           
        } else {
            console.log("Aucune musique trouvée.");
        }
    });

    data.forEach((music) => {
        playlist.innerHTML += `<li id="${music.id}"><img src="${config.urlCover}${music.cover}" /><div><small>  </small> </div></li> ` 
    });

    const allLi = document.querySelectorAll("li");

    allLi.forEach((li) => {   
        li.addEventListener("click", function(elem) {
            const id = parseInt(li.id);
            const searchById = data.find((element) => element.id === id);
            if (searchById) {
                console.log(searchById);
               //alert(`Veux-tu écouter le titre : ${searchById.title}`);
                lecteur.src = `${config.urlSound}${searchById.sound}`;
                lecteur.play(); // Lancer la musique automatiquement
            } else {
                console.log("Aucune musique trouvée avec cet ID.");
            }
        });
    });
    lecteur.addEventListener("play", function() {
        // Récupérer l'URL de la couverture et le titre de la musique en cours de lecture
        const currentMusicId = lecteur.getAttribute("src").split("/").pop().split(".")[0];
        const currentMusic = data.find(music => music.sound === currentMusicId + ".mp3");
        const currentCoverUrl = config.urlCover + currentMusic.cover;
    
        // Afficher la couverture de la musique en cours de lecture
        const currentCover = document.getElementById("currentCover");
        currentCover.src = currentCoverUrl;
        document.getElementById("lectureCover").classList.remove("hidden");
    
        // Afficher le titre de la musique en cours de lecture
        const currentTitle = document.getElementById("currentTitle");
        currentTitle.textContent = currentMusic.title;
        currentTitle.classList.remove("hidden");
    });
    
    
  
}

getData();