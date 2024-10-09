let current_question = 1;
const totalQuestions = 3;
let attemptedQuestions = 0;

const correctAnswers = {
    question1: 'Structured Query Language', 
    question2: 'scripting language',
    question3: 'markup language'
};

function startQuiz() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('questions').style.display = 'block';
    document.getElementById('questionCount').style.display = 'block';
    updateQuestionCount();
}

function nextQuestion(currentQuestion) {
    const questionAnswered = document.querySelector(`input[name="${getQuestionName(currentQuestion)}"]:checked`);

    if (questionAnswered) {
        attemptedQuestions++;
    }

    document.getElementById('question' + currentQuestion).style.display = 'none';
    current_question++;

    if (current_question <= totalQuestions) {
        document.getElementById('question' + current_question).style.display = 'block';
        updateQuestionCount();
    } else {
        submitQuiz();
    }
}

function updateQuestionCount() {
    document.getElementById('currentQuestion').innerText = current_question;
}

function getQuestionName(questionNumber) {
    return questionNumber === 1 ? "a" : questionNumber === 2 ? "b" : "c";
}

function submitQuiz() {
    const answers = {};
    let resultsHtml = ''; 
    let score = 0; 
    let correctAttempted = 0;

   
    const question1 = document.querySelector('input[name="a"]:checked');
    answers['question1'] = question1 ? question1.value : 'No answer';

    const question2 = document.querySelector('input[name="b"]:checked');
    answers['question2'] = question2 ? question2.value : 'No answer';

    const question3 = document.querySelector('input[name="c"]:checked');
    answers['question3'] = question3 ? question3.value : 'No answer';

    for (let question in answers) {
        const userAnswer = answers[question];
        const isCorrect = userAnswer === correctAnswers[question];

        if (userAnswer !== 'No answer') {
            correctAttempted++;
        }

        resultsHtml += `${question.charAt(0).toUpperCase() + question.slice(1)}: ${userAnswer} - ${isCorrect ? 'Correct' : 'Wrong'}<br>`;
        
        if (isCorrect) {
            score++;
        }
    }

    resultsHtml += `You have attempted ${correctAttempted} out of ${totalQuestions} questions.<br>`;
    resultsHtml += `Your score is: ${score} out of ${totalQuestions}.`;

    document.getElementById('questions').style.display = 'none'; 
    document.getElementById('resultsContent').innerHTML = resultsHtml;
    document.getElementById('results').style.display = 'block';
}

function restartQuiz() {
    current_question = 1; 
    attemptedQuestions = 0;

    document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
        input.checked = false; 
    });

    document.getElementById('results').style.display = 'none'; 
    document.getElementById('landingPage').style.display = 'block'; 
    document.getElementById('questionCount').style.display = 'none'; 
    document.getElementById('questions').style.display = 'none'; 

    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById('question' + i).style.display = 'none'; 
    }

    document.getElementById('question1').style.display = 'block'; 
    updateQuestionCount(); 
}
