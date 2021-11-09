//Array of choices
var rps = []
rps[0] = "Rock"
rps[1] = "Paper"
rps[2] = "Scissors"

//Array for buttons
var btn = document.querySelectorAll('button')
//console.log(btn)
//assign event listeners to the buttons
btn[0].addEventListener('click', function (e) { playGame(0) })
btn[1].addEventListener('click', function (e) { playGame(1) })
btn[2].addEventListener('click', function (e) { playGame(2) })

function playGame(playerChoice) {
    //generate cpu choice
    var cpuChoice = Math.floor(Math.random() * 2.99)

    //example of switch case
    switch (playerChoice) {
        case 0:
            if (cpuChoice == 0) {
                //its a tie
                showResults("Rock","Rock", "It's a Tie")
            }
            else if (cpuChoice == 1) {
                //computer wins
                showResults("Rock","Paper", "You Lose Computer Wins")
            }
            else {
                //player wins
                showResults("Rock","Scissors", "You Win Yay!!!")
            }
            break;
        case 1:
                if (cpuChoice == 0) {
                    //player wins
                    showResults("Paper","Rock", "You win Yay!!")
                }
                else if (cpuChoice == 1) {
                    //Its a tie
                    showResults("Paper","Paper", "It is a tie")
                }
                else {
                    //computer wins
                    showResults("Paper","Scissors", "You Lose Computer Wins")
                }
            break;
        case 2:
                if (cpuChoice == 0) {
                    //computer wins
                    showResults("Scissors","Rock", "You Lose Computer Wins")
                }
                else if (cpuChoice == 1) {
                    //player wins
                    showResults("Scissors","Paper", "You Win Yay!!!")
                }
                else {
                    //its a tie
                    showResults("Scissors","Scissors", "It is a tie")
                }
            break;
    }
}

function showResults(pChoice, cChoice, result) {
    document.getElementById("pChoice").innerHTML = pChoice
    document.getElementById("cChoice").innerHTML = cChoice
    document.getElementById("result").innerHTML = result
}