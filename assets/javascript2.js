//define characters
let chars = {
    'bunny' : {name: 'Regular Sized Bunny',hp: 250,attack: 8,counterAttack: 12, image: "<img src='assets/images/bunnySmall.jpg'>"},
    'bigBunny' : {name: 'Big Bad Bunny',hp: 140,attack: 12,counterAttack: 25, image: "<img src='assets/images/bunnyBig.jpeg'>"},
    'easterBunny' : {name: 'The Easter Bunny',hp: 160,attack: 15,counterAttack: 15, image: "<img src='assets/images/bunnyEaster.jpg'>"},
    'deathBunny' : {name: 'The Death Bunny',hp: 200,attack: 20,counterAttack: 20, image: "<img src='assets/images/bunnyEvil.jpg'>"}
};

//define global variables
var wins=0;                     //wins start at 0
var losses=0;                   //losses start at 0
var userChar;                   //User selected Character
var currEnemy=[];               //current enemy
var enemies = [];               //current selectable enemies
var userAttack;                 //User selected Character's current attack power
var turnCounter = 1;            //current turn
var killCount = 0;              //number of enemies killed

//define global functions

//reset function
function reset(){                     
    userChar = "";                              //reset user character
    enemies = [];                               //reset enemies array
    currEnemy=[];                               //reset current enemies
    killCount=0;                                //reset kill counter
    turnCounter=1;                              //reset turn counter
    chars.bunny.hp=250;                         //reset bunny health
    chars.bigBunny.hp = 140;                    //reset big bunny health
    chars.easterBunny.hp = 160;                 //reset easter bunny health
    chars.deathBunny.hp = 200;                  //reset death bunny health

    $("#userStatsBar").show();                  //show user stats bar
    $("#charSelectWindow").show();              //show character selection screen
    $("#startGameWindow").hide();               //hide "how to play" window
    $("#enemySelectWindow").hide();                 //hide enemy selection screen  
    $("#battleWindow").hide();                      //hide battle screen
    $("#winWindow").hide();                         //hide win screen
    $("#lossWindow").hide();                        //hide loss screen
    $(".wins").text("Wins: " + wins);           //update wins on navbar
    $(".losses").text("Losses: " + losses);     //update losses on navbar
    $("#counterAttackText").text("");
    $("#attackText").text("");

    $("#userCharNavName").html("")      //display user character image on navbar
    $(".health").text("HP: " + 0);
    $(".attack").text("Attack Power: " + 0);
}

$("#userStatsBar").hide();
$("#charSelectWindow").hide();              //show character selection screen
$("#startGameWindow").show();
$("#enemySelectWindow").hide();                 //hide enemy selection screen  
$("#battleWindow").hide();                      //hide battle screen
$("#winWindow").hide();                         //hide win screen
$("#lossWindow").hide();                        //hide loss screen

$("#startGame").click(function(){       //run reset function when User clicks start Game
    reset();  
})


//////////////////////////////////////////////////////////////////////////////////////
////////////////////////  SELECT YOUR USER BUNNY  ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

    
//display character select images
$("#userBunny").html(chars.bunny.image);
$("#userBigBunny").html(chars.bigBunny.image);
$("#userEasterBunny").html(chars.easterBunny.image);
$("#userDeathBunny").html(chars.deathBunny.image);

$('#userBunny').click (function(){          //when bunny is selected
    userChar = chars.bunny;                 //define bunny as user character
    enemies.push(chars.bigBunny);           //push other characters to enemies array
    enemies.push(chars.easterBunny);        //
    enemies.push(chars.deathBunny);         //
    charSelect();                           //run charSelect Function
});

$('#userBigBunny').click (function(){       //when bigBunny is selected
    userChar = chars.bigBunny;              //define big bunny as user character
    enemies.push(chars.bunny);              //push other characters to enemies array
    enemies.push(chars.easterBunny);        //
    enemies.push(chars.deathBunny);         //
    charSelect();                           //run charSelect Function
});

$('#userEasterBunny').click (function(){    //when easterBunny is selected
    userChar = chars.easterBunny;           //define easter bunny as user character
    enemies.push(chars.bunny);              //push other characters to enemies array
    enemies.push(chars.bigBunny);           //
    enemies.push(chars.deathBunny);         //
    charSelect();                           //run charSelect Function
});

$('#userDeathBunny').click (function(){     //when deathBunny is selected
    userChar = chars.deathBunny;            //define death bunny as user character
    enemies.push(chars.bunny);              //push other characters to enemies array
    enemies.push(chars.bigBunny);           //
    enemies.push(chars.easterBunny);        //
    charSelect();                           //run charSelect Function
});

//character select function
//runs when your user character is selected
function charSelect(){              
    $("#enemy1").html(enemies[0].image);            //display character images to enemies Select Window
    $("#enemy2").html(enemies[1].image);            //
    $("#enemy3").html(enemies[2].image);            //
    $("#userCharNavName").html(userChar.image)      //display user character image on navbar
    $(".health").text("HP: " + userChar.hp);
    $(".attack").text("Attack Power: " + userChar.attack);
    
    $("#charSelectWindow").hide();
    $("#enemySelectWindow").show();
    
    console.log("you are the " + userChar.name + " your hp: " + " " + userChar.hp);
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////////     SELECT YOUR ENEMY    ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


//update Enemies Function 
function updateEnemyList(){                         
    $("#enemySelectWindow").hide();                 //hide enemy selection window
    $("#battleWindow").show();                      //show battle window
    $("#userFightIcon").html (userChar.image + userChar.hp);      //display user bunny image on battlescreen
    $("#enemyFightIcon").html(currEnemy.image + currEnemy.hp);     //display enemy bunny image on battlescreen
    $("#counterAttackText").text("");               //Delete the CounterAttack Text from BattleScreen
    $("#attackText").text("");                      //Delete the Attack Text from BattleScreen
    
        if (enemies[0] != undefined){               //if 1 enemy exists
            $("#enemy1").html(enemies[0].image);}       //display its image 
        if (enemies[0] == undefined){               //if not
            $("#enemy1").html("");}                     //display nothing in its spot
        if (enemies[1] != undefined){               //if 2nd enemy exists
            $("#enemy2").html(enemies[1].image);}       //display it's image
        if (enemies[1] == undefined){               //if not
            $("#enemy2").html("");}                     //display nothing in its spot
        if (enemies[2] != undefined){               //if 3rd enemy exists
            $("#enemy3").html(enemies[2].image);}       //display it's image
        if (enemies[2] == undefined){               //if not
            $("#enemy3").html("");}                     //display nothing in its spot
}

//Enemy1 Click
$("#enemy1").click (function(){             //if enemy 1 is selected
    currEnemy = (enemies[0]);               //define selected enemy ast currEnemy
    enemies.splice (0,1);                   //remove selected enemy from enemies array                     
    updateEnemyList();                      //run update enemies function
    console.log(currEnemy);
});
$("#enemy2").click (function(){             //if enemy 1 is selected
    currEnemy = enemies[1];                 //define selected enemy ast currEnemy
    enemies.splice (1,1);                   //remove selected enemy from enemies array
    updateEnemyList();                      //run update enemies function
    console.log(currEnemy);                 
});
$("#enemy3").click (function(){             //if enemy 1 is selected
    currEnemy = enemies[2];                 //define selected enemy ast currEnemy
    enemies.splice (2,1);                   //remove selected enemy from enemies array
    updateEnemyList();                      //run update enemies function
    console.log(currEnemy);                 
});


//////////////////////////////////////////////////////////////////////////////
////////////////////////                              ////////////////////////
////////////////////////     BUNNY BATTLE SHOWDOWN    ////////////////////////
////////////////////////                              ////////////////////////
//////////////////////////////////////////////////////////////////////////////


//update battleDisplay Function
function updateBattleStats(){
    //battle window
    $("#userFightIcon").html (userChar.image + " " + userChar.hp);      
    $("#enemyFightIcon").html(currEnemy.image + " " + currEnemy.hp);
    //navbar stats
    $("#userCharNavName").html(userChar.image)  
    $(".health").text("HP: " + userChar.hp);
    $(".attack").text("Attack Power: " + userChar.attack * turnCounter);
}

//When attack Button Clicked
$("#attack").click (function(){
if (currEnemy.hp > 0){                                              //if enemy's health is greater than 0
    currEnemy.hp = currEnemy.hp - (userChar.attack * turnCounter);  //reduce enemies health by user attack times the number of turns
    $("#attackText").text("You Attacked For " + userChar.attack * turnCounter + " Damage!");
    turnCounter++;
    updateBattleStats();                                                  //increase turn counter + 1
    
    //If enemy dies
    if (currEnemy.hp <= 0){                                             
        killCount++;                                                //increase killcount +1
        $("#enemySelectWindow").show();                             //show enemy select window
        $("#battleWindow").hide();                                  //hide battle window
        
        //if you killed all 3 bunnies
        if (killCount == 3){                        
            wins++;                                                 //increase wins +1
            $("#enemySelectWindow").hide();                         //hide enemy select window
            $("#userStatsBar").hide();                              //hide stats bar
            $("#winWindow").show();                                 //show Congratulations window
            $(".reset").click (function(){                          //click reset button to go play again
                reset();
            })
        }
    }
    //If enemy survives the attack
    else {
        userChar.hp -= currEnemy.counterAttack;                     //user hp is reduced by current enemies counter-attack
        $("#counterAttackText").text(currEnemy.name + " countered for " + currEnemy.counterAttack + " Damage!");
        updateBattleStats()

        //If user's bunny dies :(
        if (userChar.hp <= 0){                                      
            losses++;                                               //increase losses by 1
            console.log("The " + currEnemy.name +" killed you ");   
            $("#battleWindow").hide();                              //hide battle window
            $("#userStatsBar").hide();                              //hide stats bar
            $("#lossWindow").show();                                //show the You Lost window
            $(".reset").click (function(){                          //click reset button to play again
                reset();
            })
        }   
    }
}

})