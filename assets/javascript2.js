//define characters
let chars = {
    'bunny' : {name: 'Regular Sized Bunny',hp: 120,attack: 8,counterAttack: 12, image: "<img src='assets/images/bunnySmall.jpg'>"},
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

function reset(){             //restart function
    console.log("NEW GAME," + " wins: " + wins + ", losses: " + losses);
    userChar = "";
    enemies = [];
    currEnemy=[];
    killCount=0;
    turnCounter=0;
    chars.bunny.hp=120;
    chars.bigBunny.hp = 140;
    chars.easterBunny.hp = 160;
    chars.deathBunny.hp = 200;
    $("#charSelectWindow").show();
    $("#enemySelectWindow").hide();
    $("#battleWindow").hide();

    $(".wins").text("Wins: " + wins);
    $(".losses").text("Losses: " + losses);
}
reset();

//////////////////////////select your userBunny///////////////////////////////////////

//user character select function

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

function charSelect(){              
    $("#enemy1").html(enemies[0].image);
    $("#enemy2").html(enemies[1].image);
    $("#enemy3").html(enemies[2].image);
    $("#userCharNavName").html(userChar.image)
    $("#charSelectWindow").hide();
    $("#enemySelectWindow").show();
    console.log("you are the " + userChar.name + " your hp: " + " " + userChar.hp);
}

    //display character select icons
    $("#userBunny").html(chars.bunny.image);
    $("#userBigBunny").html(chars.bigBunny.image);
    $("#userEasterBunny").html(chars.easterBunny.image);
    $("#userDeathBunny").html(chars.deathBunny.image);

//////////////////////////////////// Select Enemy Bunny ////////////////////////////////////////////


//enemy select function   

function updateEnemyList(){
    $("#enemySelectWindow").hide();
    $("#battleWindow").show(); 
    $("#userFightIcon").html (userChar.image);
    $("#enemyFightIcon").html(currEnemy.image);
        if (enemies[0] != undefined){
            $("#enemy1").html(enemies[0].image);}
        if (enemies[0] == undefined){
            $("#enemy1").html("");}
        if (enemies[1] != undefined){
            $("#enemy2").html(enemies[1].image);}
        if (enemies[1] == undefined){
            $("#enemy2").html("");}
        if (enemies[2] != undefined){
            $("#enemy3").html(enemies[2].image);}
        if (enemies[2] == undefined){
            $("#enemy3").html("");}

}

$("#enemy1").click (function(){
    currEnemy = (enemies[0]);
    enemies.splice (0,1);
    console.log(currEnemy);
    updateEnemyList();
});
$("#enemy2").click (function(){
    currEnemy = enemies[1];
    enemies.splice (1,1);
    updateEnemyList();
    console.log(currEnemy);
});
$("#enemy3").click (function(){
    currEnemy = enemies[2];
    enemies.splice (2,1);
    updateEnemyList();
    console.log(currEnemy);
});


//attack
$("#attack").click (function(){
if (currEnemy.hp >= 0){
    currEnemy.hp = currEnemy.hp - (userChar.attack * turnCounter);
    $("#attackText").text("you attacked for " + userChar.attack * turnCounter + " enemies hp: " + currEnemy.hp);
    turnCounter++;    
    if (currEnemy.hp <= 0){
        killCount++;
        console.log ("You Killed the " + currEnemy + " enemy HP: " + userChar.hp);
        $("#enemySelectWindow").show();
        $("#battleWindow").hide();
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
            reset();
        }   
    }
}

})