const ON = 'rgba(219, 6, 166, 0.8)';
const OFF = 'rgba(0, 0, 0)';
let casesOn = [];
let casesOff = [];
let nouveaON = [];
let nouveaOFF = [];


//Si t'appuie sur le bouton => initialise la grille
$(document).on("click","#bouton1",function(e){
    
    affichageGrille();
    e.preventDefault();
    let nbrLignes = $("#valLignes").val();
    let nbrColones = $("#valColones").val();
    

    construireGrille(nbrLignes,nbrColones);
    $(document).on('click','.bloc',function(e){
        console.log(this);
        
        if($(this).css('background-color') == ON){
            $(this).css('background-color',OFF);
        }else{
            
            casesOn.push($(this).attr('id'));
            $(this).css('background-color',ON);
        }
    
        
        
    });
    
});

$("#start").on('click', function(e){
    
    while(casesOn.length > 0){
               
        let strCoordonee = casesOn.pop();
        let bloc = document.getElementById(strCoordonee);
        if(bloc==null){}
        else if(bloc.style.backgroundColor==OFF){
        
            break;
        }
        let coordonees = strCoordonee.split(" ");
        let x=coordonees[0]-1;
        let y=coordonees[1]-1;
        
        for(let i=0;i<9;i++){
            if(i==3||i==6){
                x++;
                y-=3;
                let nbr = compterCases(x,y);

                if( nbr>3 || nbr<2 ){
                    strCo =   x + " " +y;
                    nouveaOFF.push(strCo);
                }else if(nbr == 3){
                    strCo =   x + " " +y;
                    let bloc = document.getElementById(strCo);
                    nouveaON.push(strCo);
                }else{
                    strCo =   x + " " +y;
                    let bloc = document.getElementById(strCo);
                    if(bloc!=null&&bloc.style.backgroundColor==ON){
                        nouveaON.push(strCo);
                    }                       
                }
            }else{
                let nbr = compterCases(x,y);

                if( nbr>3 || nbr<2 ){     
                    strCo =   x + " " +y;
                    nouveaOFF.push(strCo);

                }else if(nbr == 3){
                    strCo =   x + " " +y;
                    nouveaON.push(strCo);
                
                }else{
                    strCo =   x + " " +y;
                    let bloc = document.getElementById(strCo);
                    if(bloc!=null&&bloc.style.backgroundColor==ON){
                        nouveaON.push(strCo);
                    }                   
                }               
            }
            y++;          
        }        
        if(casesOn.length==0){
            $(document).ready(function(e){
                console.log("hey");
                etaindreNouveau(nouveaOFF);
                allumerNouveau(nouveaON);
                   
                wait(500);
                console.log(casesOn);
                document.getElementById("start").click();
            });                   
        }                
    }
});





$(document).ready(function(e){
    
    affichageMenu();
   
});

$(document).keydown(function(e){
    
    if(event.which==82){
        e.preventDefault();
        let nbrLignes = $("#valLignes").val();
        let nbrColones = $("#valColones").val();
    
        let max_bloc = nbrLignes/2 *nbrColones/2;
        for(let i=0;i<max_bloc;i++){

            let x = Math.floor(Math.random() * nbrLignes);
            let y = Math.floor(Math.random() * nbrColones);
            strcoord = x+" "+y;
            console.log(strcoord);
            let bloc = document.getElementById(strcoord);
            bloc.style.backgroundColor = ON;
            casesOn.push(strcoord);
        }
    }

});

