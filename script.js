const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay")
const quoteInputElement = document.getElementById("quoteInput")
const containerbox = document.getElementById("cont");

const timer = document.getElementById("timer");

quoteInputElement.addEventListener("input",()=>{

     const arrayQuote = quoteDisplayElement.querySelectorAll("span");
     const arrayValue = quoteInputElement.value.split("");
     let correct = true;

     arrayQuote.forEach((characterSpan, index)=>{
        const character = arrayValue[index];
        
        if(character==null){
            
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            
            
            correct = false;
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add("correct");
            containerbox.classList.add("correct-cont");

            containerbox.classList.remove("incorrect-cont");
            characterSpan.classList.remove("incorrect");

        }
        else{
            
            characterSpan.classList.remove("correct");
            containerbox.classList.remove("correct-cont");

            characterSpan.classList.add("incorrect");
            containerbox.classList.add("incorrect-cont");
            
            correct = false;
        }
     })
     if(correct){
        renderNewQuote();
     }
})

function getRandomQuote() {
    
    // fetching required data from api
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
    
}

async function renderNewQuote(){

    const quote  = await getRandomQuote();

    //reseting data
    quoteInputElement.value = "";
    quoteDisplayElement.innerHTML = "";

    // rendering new quote character by character in span tags 
    // which will help in comparing

    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    startTimer();

}

let startTime;
//timer logic 
function startTimer(){
    
    //reset timer to zero
    timer.innerText = 0;

    //store start time
    startTime = new Date();
    //setInterval api runs the inner function for every 1000ms
    setInterval(()=>{
        timer.innerText = getTimerTime();
    },1000)
}

function getTimerTime(){

    //returns time =difference from current date(new Date()) and starttime
    return Math.floor((new Date() - startTime)/1000);
}

// let startTime;
// //timer logic 
// function startTimer(){
    
//     //reset timer to zero
//     timer.innerText = 0;

//     //store start time
//     startTime = new Date();
//     //setInterval api runs the inner function for every 1000ms
//     setInterval(()=>{
//         timer.innerText = Math.floor((new Date() - startTime)/1000);
//     },1000)
// }

function reset(){    
    renderNewQuote();
}
renderNewQuote();
