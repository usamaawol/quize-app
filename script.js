// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const finalScoreElement = document.getElementById('final-score');
const totalQuestionsFinalElement = document.getElementById('total-questions-final');
const resultMessageElement = document.getElementById('result-message');
const progressBar = document.getElementById('progress-bar');
const timeElement = document.getElementById('time');
const categorySelect = document.getElementById('category');

// Buttons
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let selectedOption = null;
let questions = [];

// Question bank with 50+ questions across different categories
const questionBank = [
    // General Knowledge (10 questions)
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris",
        category: "general"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
        category: "general"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        answer: "Blue Whale",
        category: "general"
    },
    {
        question: "Which country is home to the Great Barrier Reef?",
        options: ["Brazil", "Australia", "Thailand", "Mexico"],
        answer: "Australia",
        category: "general"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Ag", "Au", "Gd"],
        answer: "Au",
        category: "general"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci",
        category: "general"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean",
        category: "general"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Osmium", "Oxygen", "Osmium"],
        answer: "Oxygen",
        category: "general"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        answer: "Jupiter",
        category: "general"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare",
        category: "general"
    },

    // Science (10 questions)
    {
        question: "What is the chemical formula for water?",
        options: ["CO2", "H2O", "NaCl", "O2"],
        answer: "H2O",
        category: "science"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
        answer: "Mitochondria",
        category: "science"
    },
    {
        question: "What is the speed of light in a vacuum (approximately)?",
        options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
        answer: "300,000 km/s",
        category: "science"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide",
        category: "science"
    },
    {
        question: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        answer: "6",
        category: "science"
    },
    {
        question: "Which planet has the most moons?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        answer: "Saturn",
        category: "science"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Graphite"],
        answer: "Diamond",
        category: "science"
    },
    {
        question: "Which blood type is known as the universal donor?",
        options: ["A+", "B-", "AB+", "O-"],
        answer: "O-",
        category: "science"
    },
    {
        question: "What is the chemical symbol for silver?",
        options: ["Si", "Ag", "Au", "Sv"],
        answer: "Ag",
        category: "science"
    },
    {
        question: "Which part of the brain controls balance?",
        options: ["Cerebrum", "Cerebellum", "Brainstem", "Hypothalamus"],
        answer: "Cerebellum",
        category: "science"
    },

    // History (10 questions)
    {
        question: "In which year did World War II end?",
        options: ["1943", "1945", "1947", "1950"],
        answer: "1945",
        category: "history"
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "James Madison"],
        answer: "George Washington",
        category: "history"
    },
    {
        question: "Which ancient civilization built the Great Pyramids of Giza?",
        options: ["Ancient Greeks", "Ancient Egyptians", "Ancient Romans", "Ancient Chinese"],
        answer: "Ancient Egyptians",
        category: "history"
    },
    {
        question: "Who was the first person to step on the Moon?",
        options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
        answer: "Neil Armstrong",
        category: "history"
    },
    {
        question: "When was the Declaration of Independence signed?",
        options: ["1774", "1776", "1781", "1787"],
        answer: "1776",
        category: "history"
    },
    {
        question: "Who painted the Sistine Chapel ceiling?",
        options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
        answer: "Michelangelo",
        category: "history"
    },
    {
        question: "Which empire was ruled by Genghis Khan?",
        options: ["Mongol Empire", "Roman Empire", "Ottoman Empire", "British Empire"],
        answer: "Mongol Empire",
        category: "history"
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1905", "1912", "1915", "1920"],
        answer: "1912",
        category: "history"
    },
    {
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Mother Teresa", "Rosalind Franklin", "Jane Addams"],
        answer: "Marie Curie",
        category: "history"
    },
    {
        question: "Which war was fought between the North and South regions in the United States?",
        options: ["World War I", "American Revolution", "Civil War", "War of 1812"],
        answer: "Civil War",
        category: "history"
    },

    // Geography (10 questions)
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: "Nile",
        category: "geography"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
        answer: "Antarctic",
        category: "geography"
    },
    {
        question: "Which country has the most time zones?",
        options: ["Russia", "USA", "France", "China"],
        answer: "France",
        category: "geography"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        answer: "Vatican City",
        category: "geography"
    },
    {
        question: "Which mountain range includes Mount Everest?",
        options: ["Andes", "Alps", "Himalayas", "Rockies"],
        answer: "Himalayas",
        category: "geography"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo",
        category: "geography"
    },
    {
        question: "Which river flows through Paris?",
        options: ["Thames", "Seine", "Danube", "Rhine"],
        answer: "Seine",
        category: "geography"
    },
    {
        question: "What is the largest continent by land area?",
        options: ["Africa", "North America", "Asia", "Europe"],
        answer: "Asia",
        category: "geography"
    },
    {
        question: "Which country is also known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "Thailand"],
        answer: "Japan",
        category: "geography"
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        answer: "Ottawa",
        category: "geography"
    },

    // Sports (10 questions)
    {
        question: "In which sport would you perform a slam dunk?",
        options: ["Soccer", "Basketball", "Tennis", "Volleyball"],
        answer: "Basketball",
        category: "sports"
    },
    {
        question: "How many players are on a standard soccer team?",
        options: ["9", "10", "11", "12"],
        answer: "11",
        category: "sports"
    },
    {
        question: "Which country has won the most FIFA World Cup titles?",
        options: ["Germany", "Italy", "Brazil", "Argentina"],
        answer: "Brazil",
        category: "sports"
    },
    {
        question: "In tennis, what is a score of 40-40 called?",
        options: ["Deuce", "Advantage", "Match Point", "Set Point"],
        answer: "Deuce",
        category: "sports"
    },
    {
        question: "Which sport is associated with Wimbledon?",
        options: ["Golf", "Tennis", "Cricket", "Rugby"],
        answer: "Tennis",
        category: "sports"
    },
    {
        question: "How many rings are on the Olympic flag?",
        options: ["4", "5", "6", "7"],
        answer: "5",
        category: "sports"
    },
    {
        question: "In which sport would you use a 'birdie'?",
        options: ["Badminton", "Golf", "Tennis", "Baseball"],
        answer: "Badminton",
        category: "sports"
    },
    {
        question: "What is the maximum break you can score in snooker?",
        options: ["100", "147", "155", "200"],
        answer: "147",
        category: "sports"
    },
    {
        question: "Which country won the first ever FIFA World Cup in 1930?",
        options: ["Brazil", "Uruguay", "Argentina", "Italy"],
        answer: "Uruguay",
        category: "sports"
    },
    {
        question: "In American football, how many points is a touchdown worth?",
        options: ["3", "5", "6", "7"],
        answer: "6",
        category: "sports"
    }
];

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectRandomQuestions(questions, count) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function filterQuestionsByCategory(questions, category) {
    if (category === 'all') return questions;
    return questions.filter(q => q.category === category);
}

// Quiz functions
function startQuiz() {
    const selectedCategory = categorySelect.value;
    const filteredQuestions = filterQuestionsByCategory(questionBank, selectedCategory);
    questions = selectRandomQuestions(filteredQuestions, 20);
    
    if (questions.length === 0) {
        alert('Not enough questions in this category. Please select another category.');
        return;
    }
    
    currentQuestionIndex = 0;
    score = 0;
    
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    totalQuestionsElement.textContent = questions.length;
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    
    // Update progress
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    // Set question text
    questionElement.textContent = `${questionNumber}. ${currentQuestion.question}`;
    
    // Shuffle options
    const shuffledOptions = shuffleArray([...currentQuestion.options]);
    
    // Create option buttons
    shuffledOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(optionElement, option));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update UI - keep Submit button visible but enabled, and hide Next
    submitBtn.style.display = '';
    submitBtn.disabled = false;
    submitBtn.classList.remove('disabled');
    nextBtn.style.display = 'none';
    selectedOption = null;
    
    // Reset timer for new question
    resetTimer();
}

function resetState() {
    // Clear previous options
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
    
    // Remove feedback if any
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Reset timer
    resetTimer();
}

function selectOption(optionElement, selectedAnswer) {
    // Remove selected class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    optionElement.classList.add('selected');
    selectedOption = selectedAnswer;
}

function checkAnswer() {
    if (selectedOption === null) {
        showFeedback('Please select an answer!', false);
        return;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Check if answer is correct
    const isCorrect = selectedOption === currentQuestion.answer;
    
    if (isCorrect) {
        score++;
        scoreElement.textContent = score;
    }
    
    // Show correct/incorrect feedback
    options.forEach(opt => {
        if (opt.textContent === currentQuestion.answer) {
            opt.classList.add('correct');
        } else if (opt.textContent === selectedOption && !isCorrect) {
            opt.classList.add('wrong');
        }
    });
    
    // Show feedback message
    const feedback = isCorrect 
        ? 'Correct! Well done!'
        : `Incorrect! The correct answer is: ${currentQuestion.answer}`;
    
    showFeedback(feedback, isCorrect);
    
    // Show next button and disable submit button to prevent re-submission
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
    nextBtn.style.display = 'block';
    
    // Stop the timer
    stopTimer();
}

function showFeedback(message, isCorrect) {
    const feedbackElement = document.createElement('div');
    feedbackElement.classList.add('feedback');
    feedbackElement.classList.add(isCorrect ? 'correct' : 'incorrect');
    feedbackElement.textContent = message;
    
    const questionContainer = document.getElementById('question-container');
    questionContainer.appendChild(feedbackElement);
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Update score display
    finalScoreElement.textContent = score;
    totalQuestionsFinalElement.textContent = totalQuestions;
    document.getElementById('score-percent').textContent = `${percentage}%`;
    
    // Set result message based on score
    let message;
    if (percentage >= 80) {
        message = 'Excellent! You are a quiz master! 🎉';
    } else if (percentage >= 60) {
        message = 'Great job! You know your stuff! 👍';
    } else if (percentage >= 40) {
        message = 'Good effort! Keep learning! 💪';
    } else {
        message = 'Keep practicing! You\'ll get better! 👏';
    }
    
    resultMessageElement.textContent = message;
    
    // Animate the score circle
    const circle = document.querySelector('.score-circle');
    const circleInner = document.querySelector('.score-circle-inner');
    const circlePercent = document.getElementById('score-percent');
    
    // Reset any previous animation
    circle.style.background = 'conic-gradient(#e9ecef 0% 100%)';
    
    // Animate the circle
    let progress = 0;
    const targetProgress = percentage;
    const animationDuration = 1500; // 1.5 seconds
    const interval = 20; // Update every 20ms
    const increment = (targetProgress / (animationDuration / interval));
    
    const animateCircle = setInterval(() => {
        progress += increment;
        if (progress >= targetProgress) {
            progress = targetProgress;
            clearInterval(animateCircle);
        }
        
        const color = getScoreColor(progress);
        circle.style.background = `conic-gradient(${color} 0% ${progress}%, #e9ecef ${progress}% 100%)`;
        circlePercent.textContent = `${Math.round(progress)}%`;
    }, interval);
    
    // Stop any running timer
    stopTimer();
}

function getScoreColor(percentage) {
    if (percentage >= 80) return '#4CAF50'; // Green
    if (percentage >= 60) return '#8BC34A'; // Light green
    if (percentage >= 40) return '#FFC107'; // Yellow
    return '#F44336'; // Red
}

function restartQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    // Reset score display
    scoreElement.textContent = '0';
    
    // Reset timer display
    resetTimer();
}

// Timer functions
function startTimer() {
    timeLeft = 30;
    updateTimerDisplay();
    
    // Clear any existing timer to prevent multiple timers running
    stopTimer();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            timeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timeElement.textContent = timeLeft;
    
    // Change color when time is running low
    if (timeLeft <= 10) {
        timeElement.style.color = 'var(--danger-color)';
        timeElement.style.animation = 'pulse 0.5s infinite';
    } else {
        timeElement.style.color = '';
        timeElement.style.animation = '';
    }
}

function resetTimer() {
    stopTimer();
    timeLeft = 30;
    updateTimerDisplay();
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function timeUp() {
    // Only process time up if we haven't already shown the answer
    if (!submitBtn.disabled) {
        stopTimer();
        
        const currentQuestion = questions[currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        // Disable all options
        options.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Show the correct answer
        options.forEach(opt => {
            if (opt.textContent === currentQuestion.answer) {
                opt.classList.add('correct');
            }
        });
        
        // Remove any existing feedback first to prevent duplicates
        const existingFeedback = document.querySelector('.feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Show feedback only once
        showFeedback(`Time's up! The correct answer is: ${currentQuestion.answer}`, false);
        
        // Disable submit button and show next
        submitBtn.disabled = true;
        submitBtn.classList.add('disabled');
        nextBtn.style.display = 'block';
    }
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Only handle keyboard events when quiz screen is active
    if (!quizScreen.classList.contains('active')) return;
    
    // Number keys 1-4 for selecting options
    if (e.key >= '1' && e.key <= '4') {
        const options = document.querySelectorAll('.option');
        const index = parseInt(e.key) - 1;
        if (index < options.length) {
            const option = options[index];
            const selectedAnswer = option.textContent;
            selectOption(option, selectedAnswer);
        }
    }
    
    // Enter key to submit or go to next question
    if (e.key === 'Enter') {
        if (!submitBtn.disabled) {
            checkAnswer();
        } else if (nextBtn.style.display !== 'none') {
            nextQuestion();
        }
    }
});

// Add pulse animation for timer
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize the app
function init() {
    // Set initial state
    startScreen.classList.add('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    
    // Reset any existing state
    resetState();
    
    // Set current year in footer if exists
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Start the app
init();




