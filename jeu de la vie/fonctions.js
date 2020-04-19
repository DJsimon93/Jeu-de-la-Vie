
function construireGrille(nbrLignes,nbrColones){

    document.documentElement.style.setProperty("--nbrColones", nbrColones);
    document.documentElement.style.setProperty("--nbrLignes", nbrLignes);
    let grille= document.getElementById("grille");
    let jeu = document.createElement("div");
    jeu.className = "grille";

    for(let i=0;i<nbrLignes;i++){

        let div_container = document.createElement("div");
        div_container.className="ligne";
        div_container.setAttribute("id","ligne"+i);
        div_container.style.gridtemplatecolumns += " auto";

            for(let j = 0; j < nbrColones ; j++){

                let div_container2 = document.createElement("div");
                div_container2.className="bloc";
                div_container2.setAttribute("id",(i+" "+j));
                div_container2.style.backgroundColor = OFF;
                div_container.append(div_container2);
                
                
                
                
            }
    
        jeu.appendChild(div_container);
        
    }
    grille.append(jeu);

}

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}

function compterCases(x,y){
    x--;
    y--;  
    let strCo = "";
    let nbr=0;

    for(let i=0;i<8;i++){
        
        if(i==3||i==5){
            x++;
            y-=3;
            strCo =   x + " " +y;
            let bloc = document.getElementById(strCo);
                  
            if(bloc!=null&&bloc.style.backgroundColor == ON){
                    
                nbr++;        
            }
        }else if(i==4){
            y++;
            strCo =  x + " " +y;
            bloc = document.getElementById(strCo)   
                
            if(bloc!=null&&bloc.style.backgroundColor == ON){
                    
                nbr++;
            }
        }
        else{
            strCo =  x + " " +y;
            bloc = document.getElementById(strCo)
            
            if(bloc!=null&&bloc.style.backgroundColor == ON){
                nbr++;
                    
            }     
        }
        y++;            
    }
    return nbr;
}

function etaindreNouveau(nvxOff){
    
    for(let i=0;i<nvxOff.length;i++){
        
        let strCoord = nvxOff[i];
        bloc = document.getElementById(strCoord);
        if(bloc!=null){
            bloc.style.backgroundColor = OFF;
        }
        
    }
    nouveaOFF=[];
}

function allumerNouveau(nvxOn){
    
    for(let i=0;i<nvxOn.length;i++){
        let strCoord = nvxOn[i];
        bloc = document.getElementById(strCoord);
        if(bloc!=null){
            bloc.style.backgroundColor = ON;
        }
        
            
        if(!casesOn.includes(strCoord)){
                
            casesOn.push(nvxOn[i]);
        }
            
        }
        
    nouveaON=[];      
    
    
}
function affichageMenu(){
    $("#grille").hide();
    $("#form").show();    
}
function affichageGrille(){
    $("#form").hide();
    $("#grille").show();
}