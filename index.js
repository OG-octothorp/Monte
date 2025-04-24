var mySet = new Set([]);
var cardClasses = [".one", ".two", ".three"];
var startingMoney = 500;
var loseCounter = 0;
var winCounter = 0;
$(".reset-instructions").hide();
//random numbers generator that loops until three unique numbers are added to the set
function randomCardGenerator() {
    while(mySet.size != 3) {
        var randomN = Math.floor(Math.random()*3) + 1;
        mySet.add(randomN);
    };
};

//reveals selected card
function selectedCard () {
    randomCardGenerator();
    var arr = [...mySet];
    //listens for clicked card and reveals it
    cardClasses.forEach( function (selector, index) {
        $(selector).on("click", function () {

            var newCard = `./images/cardFace${arr[index]}.jpg`;
            $(this).attr("src", newCard);

            setTimeout( function () {
                cardClasses.forEach( function (selector, index) {                   
                    var revealCard = `./images/cardFace${arr[index]}.jpg`;
                    $(selector).attr("src", revealCard)
                })
            }, 1000)
            //reveals all the cards once the user has selected one
            setTimeout(function () {
                cardClasses.forEach(function(selector) {
                    var cardReset = "./images/cardback1.jpg";
                    $(selector).attr("src", cardReset);
                    $("h1").text("Pick any card!")
                });
                mySet = new Set([]);
                selectedCard();
            }, 2000)
        //reveals to user what card they have selected
        if(newCard === "./images/cardFace1.jpg") {
            $("h1").text("correct!!!!")
            startingMoney = startingMoney + 100;
            $("h2").text(`you have ${startingMoney} $`)
        } 
        else {
            $("h1").text("wrong!!!")
            startingMoney = startingMoney - 100;
            $("h2").text(`you have ${startingMoney} $`)
        }
        
        //prevents further clicks from chnaging h1
        cardClasses.forEach(function(selector) {
            $(selector).off("click");
        });
        
    });
    
    });   
    winCheck();
};

//checks to see if user has won, and responds accordingly
function winCheck () {
    if(startingMoney === 1000) {
        $("h1").text("YOU  WIN!!!!!!!!");
        $(".btn").hide();
        winCounter++;
        console.log(`you won ${winCounter} times`)
        if(winCounter === 5) {
            $("h1").text(`you obviously cheating to have won ${winCounter} times!!!`)
        }
        setTimeout( function () {
            $(".reset-instructions").show();
            gameReset();
        }, 2000);
        
    } else if(startingMoney === 0) {
        $("h1").text("you lose");
        $(".btn").hide();
        loseCounter++;
        if(loseCounter === 5) {
            $("h1").text(`you must really hate yourself to lose${loseCounter} times!!!`)
        }
        setTimeout( function () {
            $(".reset-instructions").show();
            gameReset();
        }, 2000);
        
    }
};
 
//resets game so it can be played again
function gameReset() {
    $(".reset-instructions").on("click", function () {
        mySet = new Set([]);
        startingMoney = 500;
        $(".btn").show()
        $(".reset-instructions").hide();
        $("h1").text("Pick any card!")
        $("h2").text(`you have ${startingMoney} $`)
        
    })
}
selectedCard();
