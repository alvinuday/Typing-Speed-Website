const quoteDisplayElement = document.getElementById("sentence");
const textBox = document.getElementById("textbox");
const startButton = document.getElementById("button1");
const resetButton = document.getElementById("button2")
const timerElement = document.getElementById("timer");
const resultsLabel = document.getElementById("results-label")
const buttonContainer = document.getElementsByClassName("button-container");
const testResults = document.getElementsByClassName("test-results")
var finalAnswer =0;
const speed = document.getElementById("speed");
function getRandomQuote() {
    return fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => data.content)
  }
  async function renderNewQuote() {
    const quote1 = await getRandomQuote();
    const quote2 = quote1.replace(".","").replace(",","").replace(";","");
    const quote = quote2.toLowerCase();
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
      const characterSpan = document.createElement('span')
      characterSpan.innerText = character
      quoteDisplayElement.appendChild(characterSpan) 
    })
    textBox.value = null
    /* const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    temp */

  }


var timeflag = false;
var isWorking = true;



var tempCount = 0;
var tempErrors = 0;
var tempWordCount = 0;
var tempWrongCount =0;

const compareWords = (str1,str2) => {
    let words1 = str1.split(" ");
    let words2 = str2.split(" ");
    let count=0;

    words1.forEach(function(item, index) {
        if (item==words2[index]) {
            count++;
        }
    })
    var errorWords = (words1.length - count);
    return count;
}
const compareErrors = (str1,str2) => {
    let words1 = str1.split(" ");
    let words2 = str2.split(" ");
    let count=0;
    let wrongCount = 0;
    let nullCount = 0;

    words1.forEach(function(item, index) {
        if (item==words2[index]) {
            count++;
        }
        if (words2[index]==null) {
            nullCount++;
        }
        
    })
    wrongCount = (words1.length-(nullCount+count));
    return wrongCount;
}






textBox.addEventListener('input',()=>{
   const arrayQuote = quoteDisplayElement.querySelectorAll('span')
   var displayArray = quoteDisplayElement.innerText.split("");
   const arrayValue = textBox.value.split('')
   const arrayWord = textBox.value.split(' ')
   arrayQuote.forEach((characterSpan,index)=>{
       const character = arrayValue[index]
       if (character===characterSpan.innerText) {
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
       }
       else if (character== null) {
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
       }
       else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
       }
       
    })
    if (arrayQuote[arrayQuote.length -1].className=='correct' || arrayQuote[arrayQuote.length -1].className=='incorrect') {
        tempCount = tempCount + compareWords(quoteDisplayElement.innerText,textBox.value)
        tempWrongCount = tempWrongCount + compareErrors(quoteDisplayElement.innerText,textBox.value)
        console.log(`Total correct Words temp count = ${tempCount}
        Total WRONG Words = ${tempWrongCount}`);
        renderNewQuote();

    }
    if (timeflag==false){
        startTimer();

    }
    console.log(`Correct words are count: ${compareWords(quoteDisplayElement.innerText,textBox.value)}
    incorrect words are errors: ${compareErrors(quoteDisplayElement.innerText,textBox.value)}
    temp Count+leftover words = ${tempCount+compareWords(quoteDisplayElement.innerText,textBox.value)}`);
    resultsLabel.innerText = `Total Number of correct Words = ${tempCount+compareWords(quoteDisplayElement.innerText,textBox.value)}
    Your Typing Speed is ${tempCount+compareWords(quoteDisplayElement.innerText,textBox.value)} WPM`
    
    


   
   /* if (displayArray[displayArray.length-1]) */

})
function results() {
    textBox.disabled = true;
    console.log(`Final Correct words are : ${finalAnswer}
   Final incorrect words are : ${tempErrors}`);
    

}







function startTimer() {
    var time = 60;
    if (time>0) {
   var timerIntervalId = setInterval(() =>{
        time--;
        if (time>=10){
            timerElement.innerText = ` 0:${time}`;
        }
        else {
            timerElement.innerText = ` 0:0${time}`;
        }
    
    
        if (time==0) {
            clearInterval(timerIntervalId);
            isWorking = false;
            console.log("print results now" + finalAnswer);
            textBox.disabled = true;
            resultsLabel.style.display = 'flex';
            buttonContainer[0].style.display ='flex';
            testResults[0].style.display = 'flex';
            setTimeout(()=>{
                timerElement.style.display ="none";
            },2000);

            /* results(); */
        }
    },1000);
}
timeflag=true;
    
}
renderNewQuote()

const totalWords = (str1) => {
   let wordCount = quoteDisplayElement.innerText.split(" ");
    return (wordCount.length);
}

/* <-------RESET BUTTON--------> */
resetButton.addEventListener("click",()=>{
    timeflag=false;
    textBox.value = "";
    textBox.disabled = false;
    timerElement.style.display="flex";
    buttonContainer[0].style.display = "none";
    renderNewQuote();
    testResults[0].style.display = 'none';
    timerElement.innerText = `1:00`;

})
