


let sum=0
let hasblackjack=false
let isalive=false
let cards=[] // array 
let player={
 name:"aditya",
 chips:100
}


let playerR=document.getElementById("player")
playerR.textContent=player.name + ": $" + player.chips
let messageR=document.getElementById("message-el")


 //let sumR=document.getElementById("sum")
 let sumR=document.querySelector(".sum") // ("#sum") this is another way to store a paragraph in variable
 let cardsR=document.getElementById("cards")

function startgame(){
    if(player.chips>10){
    isalive=true
    hasblackjack=false
    let firstcard=getrandomcard()
    let secondcard=getrandomcard()
    sum=firstcard+secondcard
    cards=[firstcard,secondcard]
    rendergame()}
    else{
        messageR.textContent="you are out of money"
    }
}

function getrandomcard()
{
let rc= Math.floor(Math.random()*13 + 1)
if(rc===1){
    return 11
}else if(rc > 10 /*rc===11 || rc===12 || rc===13 */){
    return 10
} else{
    return rc
}
}






function rendergame()
{
  
     cardsR.textContent = "cards:"
    sumR.textContent="sum:" + sum
    for( let i=0;i<cards.length;i+=1){
        cardsR.textContent+=cards[i]+ " "
    }
   
    let message
if(sum<=20)
    {
            /*   console.log("Do you want to draw a new card 🐱") */
                 message="Do you want to draw a new card "
                
            }
            else if(sum===21)
                {
                /*  console.log("wohoo! you got the blackjack! meow 🥳")*/ 
                    
                    hasblackjack=true
                    message=" you've got the blackjack!  "
                    player.chips+=10
                    playerR.textContent=player.name + "$" + player.chips
                }
            else
                {
                    message="you're out of the game "
                /*   console.log("you're out of the game ") */
                    isalive=false
                    player.chips-=10
                    playerR.textContent=player.name + "$" + player.chips
                   
                }

                messageR.textContent=message
           
}

function newcard()
{
    if(isalive===true && hasblackjack===false){
    console.log("drawing a new card")
  let card=getrandomcard()

    sum+=card
    cards.push(card)
    rendergame()
    }
}
