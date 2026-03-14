// Main application controller
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const progressFill = document.getElementById('progress-fill');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resultImage = document.getElementById('result-image');

    let selectedAnswer = null;

    // Switch between screens
    function showScreen(screen) {
        startScreen.classList.remove('active');
        quizScreen.classList.remove('active');
        resultScreen.classList.remove('active');
        screen.classList.add('active');
    }

    // Render current question
    function renderQuestion() {
        const question = Quiz.getCurrentQuestion();
        questionText.textContent = question.question;
        
        // Update progress
        currentQuestionSpan.textContent = Quiz.currentQuestionIndex + 1;
        totalQuestionsSpan.textContent = Quiz.getTotalQuestions();
        progressFill.style.width = `${Quiz.getProgress()}%`;

        // Render answers
        answersContainer.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.innerHTML = `
                <span class="answer-icon">${answer.icon}</span>
                <span class="answer-text">${answer.text}</span>
            `;
            btn.addEventListener('click', () => selectAnswer(btn, answer.type));
            answersContainer.appendChild(btn);
        });

        // Reset next button
        selectedAnswer = null;
        nextBtn.disabled = true;
    }

    // Handle answer selection
    function selectAnswer(btn, type) {
        // Remove previous selection
        document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
        
        // Select new answer
        btn.classList.add('selected');
        selectedAnswer = type;
        nextBtn.disabled = false;
    }

    // Show result
    function showResult() {
        const resultType = Quiz.getResult();
        const destination = Results.getDestination(resultType);

        resultTitle.textContent = destination.title;
        resultDescription.textContent = destination.description;
        
        // Set background image with fallback gradient
        resultImage.style.backgroundImage = `url('${destination.image}'), linear-gradient(135deg, var(--lavender), var(--lime-green))`;
        
        showScreen(resultScreen);
    }

    // Event: Start quiz
    startBtn.addEventListener('click', async () => {
        await Quiz.loadQuestions();
        totalQuestionsSpan.textContent = Quiz.getTotalQuestions();
        renderQuestion();
        showScreen(quizScreen);
    });

    // Event: Next question
    nextBtn.addEventListener('click', () => {
        if (selectedAnswer) {
            Quiz.recordAnswer(selectedAnswer);

            if (Quiz.nextQuestion()) {
                renderQuestion();
            } else {
                showResult();
            }
        }
    });

    // Event: Restart quiz
    restartBtn.addEventListener('click', () => {
        Quiz.reset();
        showScreen(startScreen);
    });
});
