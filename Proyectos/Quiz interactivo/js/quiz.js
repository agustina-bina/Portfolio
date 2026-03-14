// Quiz logic module
const Quiz = {
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    scores: {
        playa: 0,
        montaña: 0,
        ciudad: 0,
        cultural: 0,
        selva: 0
    },

    // Load questions from JSON
    async loadQuestions() {
        try {
            const response = await fetch('data/questions.json');
            this.questions = await response.json();
            return this.questions;
        } catch (error) {
            console.error('Error loading questions:', error);
            return [];
        }
    },

    // Get current question
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    },

    // Get total questions
    getTotalQuestions() {
        return this.questions.length;
    },

    // Get progress percentage
    getProgress() {
        return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
    },

    // Record answer and add score
    recordAnswer(answerType) {
        this.userAnswers.push(answerType);
        if (this.scores.hasOwnProperty(answerType)) {
            this.scores[answerType]++;
        }
    },

    // Move to next question
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    },

    // Check if quiz is finished
    isFinished() {
        return this.currentQuestionIndex >= this.questions.length - 1 && 
               this.userAnswers.length === this.questions.length;
    },

    // Get winning destination
    getResult() {
        let maxScore = 0;
        let winningType = 'playa';

        for (const [type, score] of Object.entries(this.scores)) {
            if (score > maxScore) {
                maxScore = score;
                winningType = type;
            }
        }

        return winningType;
    },

    // Reset quiz
    reset() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.scores = {
            playa: 0,
            montaña: 0,
            ciudad: 0,
            cultural: 0,
            selva: 0
        };
    }
};
