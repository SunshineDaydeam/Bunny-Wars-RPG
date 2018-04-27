    //define characters
    let chars = {
        'bunny' : {name: 'Regular Sized Bunny',hp: 120,attack: 8,counterAttack: 12},
        'bigBunny' : {name: 'Big Bad Bunny',hp: 140,attack: 12,counterAttack: 25},
        'easterBunny' : {name: 'The Easter Bunny',hp: 160,attack: 15,counterAttack: 15},
        'deathBunny' : {name: 'The Death Bunny',hp: 200,attack: 20,counterAttack: 20}
    };

    //define global variables
    var wins=0;                     //wins start at 0
    var losses=0;                   //losses start at 0
    var userChar;                   //User selected Character
    var currEnemy=[];               //current enemy
    var enemies = [];               //current selectable enemies
    var charIndex;                  //index of selectable chars
    var userAttack;                 //User selected Character's current attack power
    var turnCounter = 1;            //current turn
    var killCount = 0;              //number of enemies killed
    
    //define global functions
    
    function reset(){             //restart function
        console.log("game is reset," + " wins: " + wins + ", losses: " + losses);
        userChar = "";
        enemies = [];
        currEnemy=[];
        killCount=0;
        turnCounter=0;
        // $("#charSelectWindow").show();
        // $("#battleWindow").hide();
        // $("#enemySelectWindow").hide();
        chars.bunny.hp=120;
        chars.bigBunny.hp = 140;
        chars.easterBunny.hp = 160;
        chars.deathBunny.hp = 200;
    }
    function winGame(){
        reset();
    }
    function loseGame(){
        reset();
    }
    
    //hide other windows on open
    // $("#battleWindow").hide();
    // $("#enemySelectWindow").hide();
    
    
//////////////////////////select your userBunny///////////////////////////////////////
    
    //user character select function
    function charSelect(){              
        // $("#charSelectWindow").hide();
        // $("#enemySelectWindow").show();
        $("#enemy1").html(enemies[0].name);
        $("#enemy2").html(enemies[1].name);
        $("#enemy3").html(enemies[2].name);
        $("#userCharNav").text ("User: " + userChar.name + " HP: " + userChar.hp);
        console.log("you are the " + userChar.name + " your hp: " + " " + userChar.hp);
    }

    //display character select icons
    $("#userBunny").html(chars.bunny.name + "<br>" + chars.bunny.hp + " health" + "<br>" +chars.bunny.attack + " attack power");
    $("#userBigBunny").html(chars.bunny.name + "<br>" + chars.bigBunny.hp + " health" + "<br>" +chars.bigBunny.attack + " attack power");
    $("#userEasterBunny").html(chars.easterBunny.name + "<br>" + chars.easterBunny.hp + " health" + "<br>" +chars.easterBunny.attack + " attack power");
    $("#userDeathBunny").html(chars.deathBunny.name + "<br>" + chars.deathBunny.hp + " health" + "<br>" +chars.deathBunny.attack + " attack power");

    $('#userBunny').click (function(){          //when bunny is selected
        userChar = chars.bunny;
        enemies.push(chars.bigBunny);
        enemies.push(chars.easterBunny);
        enemies.push(chars.deathBunny);
        charSelect();
    });
    
    $('#userBigBunny').click (function(){       //when bigBunny is selected
        userChar = chars.bigBunny;
        enemies.push(chars.bunny);
        enemies.push(chars.easterBunny);
        enemies.push(chars.deathBunny);
        charSelect();
    });

    $('#userEasterBunny').click (function(){    //when easterBunny is selected
        userChar = chars.easterBunny;
        enemies.push(chars.bunny);
        enemies.push(chars.bigBunny);
        enemies.push(chars.deathBunny);
        charSelect();
    });

    $('#userDeathBunny').click (function(){     //when deathBunny is selected
        userChar = chars.deathBunny;
        enemies.push(chars.bunny);
        enemies.push(chars.bigBunny);
        enemies.push(chars.easterBunny);
        charSelect();
    });

//////////////////////////////////// Select Enemy Bunny ////////////////////////////////////////////


    //enemy select function
    function enemySelect(){             
        // $("#enemySelectWindow").hide();
        // $("#battleWindow").show();
        $("#userFightIcon").html (userChar.name + " " + userChar.hp);
        $("#enemyFightIcon").text(currEnemy.name + " " + currEnemy.hp);
    }        
    
    function updateEnemyList(){
        
    }

    $("#enemy1").click (function(){
        currEnemy = (enemies[0]);
        enemies.splice (0,1);
        console.log(currEnemy);
        enemySelect();
    });
    $("#enemy2").click (function(){
        currEnemy = enemies[1];
        enemies.splice (1,1);
        enemySelect();
        console.log(currEnemy);
    });
    $("#enemy3").click (function(){
        currEnemy = enemies[2];
        enemies.splice (2,1);
        enemySelect();
        console.log(currEnemy);
    });


//attack
$("#attack").click (function(){
    currEnemy.hp = currEnemy.hp - (userChar.attack * turnCounter);
    $("#attackText").text("you attacked for " + userChar.attack * turnCounter + " enemies hp: " + currEnemy.hp);
    turnCounter++;    
    if (currEnemy.hp <= 0){
        killCount++;
        console.log ("You Killed the " + currEnemy + " enemy HP: " + userChar.hp);
        // $("#battleWindow").hide();
        // $("#enemySelectWindow").show();
        if (killCount == 3){
            wins++;
            reset();
        }
    }
    else {
        userChar.hp -= currEnemy.counterAttack;
        $("#counterAttackText").text(currEnemy.name + "countered for " + currEnemy.counterAttack + " your hp: " + userChar.hp);
        if (userChar.hp <= 0){
            losses++;
            console.log("The " + currEnemy.name +" killed you ");
            // $("#battleWindow").hide();
            reset();
        }   
    }
})




