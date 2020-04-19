
function encodeImagetoBase64(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    $("#affichafeImage").attr("value", reader.result);
    console.log(reader.result.length);
  }
  reader.readAsDataURL(file);
}

//Repris du cours de Javascript Q1 2019-2020 M. Baroni
//Cree un table en fonction des données
function create_dynamic_HTML_table(
  targetHtmlElementId,
  arrayToPrint,
  objectPropertiesToBeSaved,
  tableName
) {
  // Get the div container whithin we want to create a dynamic html table
  let div_container = document.getElementById(targetHtmlElementId);
  // Clear any content in the div_container
  div_container.innerHTML = "";
  let myTable = document.createElement("table");
  // Set the classes names with bootstrap
  myTable.className = "table table-bordered text-nowrap";
  // Append the new empty table element to the div container
  

  // Set the table header
  let headerLine = document.createElement("tr");
  myTable.appendChild(headerLine);
  const objectToPrint = arrayToPrint[0];
  var i;
  for (i = 0; i < objectPropertiesToBeSaved.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = objectPropertiesToBeSaved[i];
    headerLine.appendChild(th);
  }

  // Set the table body
  console.log(arrayToPrint.length);
  for (let x = 0; x < arrayToPrint.length; x++) {

    let myLine = document.createElement("tr");

    myTable.appendChild(myLine);


    const objectToPrint = arrayToPrint[x];

    for (i = 0; i < objectPropertiesToBeSaved.length; i++) {

      let myCell = document.createElement("td");
      myCell.innerText = objectToPrint[objectPropertiesToBeSaved[i]];

      //Affiche la date avec le bon ordre 
      if (objectPropertiesToBeSaved[i] == "dateDevis" || objectPropertiesToBeSaved[i] == "dateDebutTravaux") {
        if (objectToPrint[objectPropertiesToBeSaved[i]] != null) {
          myCell.innerText = objectToPrint[objectPropertiesToBeSaved[i]]["dayOfMonth"] + "/" + objectToPrint[objectPropertiesToBeSaved[i]]["monthValue"] + "/" + objectToPrint[objectPropertiesToBeSaved[i]]["year"];
        }
      }
      //Ajoute le formulaire pour introduire un nom de client
      if (objectPropertiesToBeSaved[i] == "confirmation") {
        myCell.innerText = "";
        let form = document.createElement("form");
        form.setAttribute("id", "confirmationForm_" + objectToPrint["idUtilisateur"]);
        form.setAttribute("autocomplete", "off");
        let div_container2 = document.createElement("div");
        div_container2.className = "autocomplete";
        let inputForm = document.createElement("input");
        inputForm.setAttribute("id", objectToPrint["idUtilisateur"]);
        inputForm.type = "text";
        let inputHidden = document.createElement("input");
        inputHidden.setAttribute("id", "idClient_" + objectToPrint["idUtilisateur"]);
        inputHidden.type = "hidden";
        let inputSubmit = document.createElement("button");
        inputSubmit.innerHTML = "Lier client";
        inputSubmit.type = "submit";
        inputSubmit.setAttribute("id", "boutonLierClient_" + objectToPrint["idUtilisateur"]);
        inputSubmit.setAttribute("value", objectToPrint["idUtilisateur"]);
        inputSubmit.setAttribute("class", "boutonLierClient");
        div_container2.appendChild(inputForm);
        form.appendChild(inputHidden);
        form.appendChild(div_container2);
        form.appendChild(inputSubmit);
        myCell.appendChild(form);
      }

      //Ajoute le formulaire pour introduire une date
      /*
      if (objectToPrint[objectPropertiesToBeSaved[i]] === null && objectPropertiesToBeSaved[i] == "dateDebutTravaux") {
        myCell.innerText = "";
        let form = document.createElement("form");
        form.setAttribute("action","/");
        form.setAttribute("autocomplete","off");
        let div_container2 = document.createElement("div");
        div_container2.className="autocomplete";
        let inputForm = document.createElement("input");
        inputForm.setAttribute("id","dateDevisForm");
        inputForm.type="date";
        let inputHidden= document.createElement("input");
        inputHidden.setAttribute("id","idDevis");
        inputHidden.type="hidden";
        inputHidden.setAttribute("value",objectToPrint["idDevis"])
        let inputSubmit = document.createElement("button");
        inputSubmit.innerHTML = "Confirmer";
        inputSubmit.setAttribute("id","boutonConfirmerDate");
        inputSubmit.type="submit";
        div_container2.appendChild(inputForm);
        form.appendChild(inputHidden);
        form.appendChild(div_container2);
        form.appendChild(inputSubmit);
        myCell.appendChild(form);
        
      }
      */

      //Ajoute le bouton pour confirmer la date
      if (objectPropertiesToBeSaved[i] == "confirmation_date") {
        myCell.innerText = "";
        status = localStorage.getItem("status")
        if (objectToPrint["dateDebutTravaux"] != null) {
          if (objectToPrint["etat"] == "Commande confirmée") {
            myCell.innerText = "Date à confirmée";
            if (status == "o") {
              myCell.innerText = "";
              let form = document.createElement("form");
              form.setAttribute("action", "/");
              let inputHidden = document.createElement("input");
              inputHidden.setAttribute("id", "idDevis");
              inputHidden.type = "hidden";
              inputHidden.setAttribute("value", objectToPrint["idDevis"])
              let inputSubmit = document.createElement("button");
              inputSubmit.innerHTML = "Confirmer";
              inputSubmit.setAttribute("id", "boutonConfirmerDate");
              inputSubmit.type = "submit";
              form.appendChild(inputHidden);
              form.appendChild(inputSubmit);
              myCell.appendChild(form);
            }

          } else {
            myCell.innerText = "Date déjà confirmée";
          }
        } else {
          myCell.innerText = "Pas de date choisie";
        }

        if (objectToPrint["dateDebutTravaux"] == null) {
          myCell.innerText = "A definir";


        }




      }
      if (objectPropertiesToBeSaved[i] == "photoFavorite") {

        myCell.innerText = "";


        console.log("yo")
        var reader = new FileReader();
        

        reader.onloadend = function () {

          let imgDevis = document.createElement("img");
        
          imgDevis.setAttribute("src", reader.result);
          myCell.appendChild(imgDevis);
          console.log("yo3")

        }
        if (objectToPrint["photoFavorite"].length > 100) {
          console.log("yo2")
          var myblob = new Blob([objectToPrint["photoFavorite"]], {
            type: 'text/plain'
          });
          reader.readAsDataURL(myblob)
        } else {
          myCell.innerText = "A definir";
        }




      }

      myLine.appendChild(myCell);
    }

  }
}

//Repris de  w3schools.com
//Fais un autocomplete
function autocomplete(inp, arr, idUtilisateur, idClientHidden) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/

  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if ((arr[i]["nom"] + " " + arr[i]["prenom"]).substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        console.log(arr[i]);
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + (arr[i]["nom"] + " " + arr[i]["prenom"]).substr(0, val.length) + "</strong>";
        b.innerHTML += (arr[i]["nom"] + " " + arr[i]["prenom"]).substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + (arr[i]["nom"] + " " + arr[i]["prenom"]) + "'>";
        b.innerHTML += "<input type='hidden' id='idClient" + idUtilisateur + "' value='" + arr[i]["idClient"] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          console.log(this);
          inp.value = this.getElementsByTagName("input")[0].value;
          idClientHidden.value = this.getElementsByTagName("input")[1].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

export { create_dynamic_HTML_table, autocomplete, encodeImagetoBase64 };