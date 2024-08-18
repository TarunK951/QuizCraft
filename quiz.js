const questions = [{
    question: "Which is an Anchor Tag ..?",
    answer: [
        { text: "<plaintext><a>", correct: false },
        { text: "<plaintext><a></a> ", correct: true },
        { text: "<plaintext><anchor></anchor>", correct: false },
        { text: "<plaintext><a />", correct: false }
    ]
},

{
    question: "What does StyleSheet mean in HTML ..?",
    answer: [
        { text: "A CSS file Extension", correct: false },
        { text: "A file which runs CSS ", correct: false },
        { text: "A file which tells a browser how to render a page", correct: true },
        { text: "A file which tells a browser how to run CSS", correct: false }
    ]
},

{
    question: "What is an element in html ..?",
    answer: [
        { text: "The HTML element is everything from the start tag to the end tag", correct: true },
        { text: "The HTML elemets are Syntax", correct: false },
        { text: "The HTML elements are <plaintext><body> & <head>", correct: false },
        { text: "Tags and Elements", correct: false }
    ]
},

{
    question: "Difference between HTML & CSS ..?",
    answer: [
        { text: "Content & Style", correct: false },
        { text: "Gives Structure & Shows Content Visually", correct: false },
        { text: "Presentation", correct: false },
        { text: "HTML-Text&Content : CSS-Shows&Presentatin", correct: true }
    ]
},

{
    question: "What are semantic elements in HTML..?",
    answer: [
        { text: "HTML tags that define the meaning of the content they contain", correct: true },
        { text: "HTML tags that define the  meaning to the browser ", correct: false },
        { text: "HTML tags that define the  meaning to the developer", correct: false },
        { text: "HTML tags that define the HTMl & CSS", correct: false }
    ]
},
{
    question: "Example of semantic elements in HTML..?",
    answer: [
        { text: "Elements: <plaintext><div> and <span>", correct: false },
        { text: "Elements: <plaintext><form> ,<table> ,<article> ", correct: true },
        { text: "Elements: <plaintext><form> ,<span>", correct: false },
        { text: "Elements: <plaintext><form> ,<table> ,<div>", correct: false }
    ]
},
{
    question: "Why do we use style sheet..?",
    answer: [
        { text: "To tell a browser how to style a page ", correct: false },
        { text: "To tell a browser how to render a page ", correct: true },
        { text: "To tell a browser how to run a page", correct: false },
        { text: "To tell a browser how to understand a page ", correct: false }
    ]
},
{
    question: "What is z index..?",
    answer: [
        { text: "Shows the inder value of a page in web browser ", correct: false },
        { text: "Tells the page page index value upto z", correct: false },
        { text: "it shows the stacking order of overlapping elements", correct: false },
        { text: " It controls the stacking order of overlapping elements", correct: true }
    ]
},
{
    question: "What is box model..?",
    answer: [
        { text: "Defines how the different parts of a box work together", correct: true },
        { text: "A set of rules used to design the web page elements", correct: false },
        { text: "A set of rules used to design the web page CSS", correct: false },
        { text: "Defines how the different parts of a box work seprately", correct: false }
    ]
},
{
    question: "What is flex box..?",
    answer: [
        { text: "A container that align elements even if u dont know the size of Data", correct: false },
        { text: "A set of rules used to design the web page elements", correct: false },
        { text: "A container that align elements even if u dont know the size of Image", correct: false },
        { text: "A container that align elements even if u dont know the size of elements", correct: true }
    ]
},
{
    question: "What is grid..?",
    answer: [
        { text: "A grid is a collection of horizontal and vertical lines creating a Element", correct: false },
        { text: "A grid is a collection of  vertical lines creating a pattern", correct: false },
        { text: "A grid is a collection of horizontal and vertical lines creating a pattern", correct: true },
        { text: "A grid is a collection of horizontal  lines creating a pattern", correct: false }
    ]
}


];




const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // Show the "Next" button after answering
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
