const form=document.getElementById("film-form");
const titleElement=document.querySelector("#title");
const directorElement=document.querySelector("#director");
const urlElement=document.querySelector("#url");
const cardBody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-films");

window.onload = function() {
    if(Storage.getFilmsFromStorage()[0]==undefined){
    const newFilm=new Film("The Gray Man","Joe Russo, Anthony Russo","https://www.diziler.com/static/img/content/22-07/24/the-gray-man-filmi-poster.jpeg");
    const newFilm2=new Film("Leon","Luc Besson","https://postercim.net/wp-content/uploads/2018/10/leon-film-posteri.png");
    UI.addFilmToUI(newFilm);
    Storage.addFilmToStorage(newFilm);
    UI.addFilmToUI(newFilm2);
    Storage.addFilmToStorage(newFilm2);
    }
  }
eventListeners();
function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function() {
        let films=Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    })
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;

    if(title==""||director==""||url==""){
    UI.displayMessages("Tüm alanları doldurunuz","danger");
    }
    else{
        const newFilm=new Film(title,director,url);

        UI.addFilmToUI(newFilm);//Arayüze film ekleme
        Storage.addFilmToStorage(newFilm);//Storage a film ekleme
        UI.displayMessages("Film başarıyla eklendi","success");
    }
    UI.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id==="delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Film silindi","success");
    }
    
}
function clearAllFilms(){
    if(confirm("Tüm filmleri silmek istediğinize emin misiniz?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
        UI.displayMessages("Tüm filmler silindi","success");
    }
    
}
