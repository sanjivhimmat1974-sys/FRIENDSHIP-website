/* BFF Site - Interactive JavaScript */

// Quiz Data
const quizQuestions = [
    {
        question: "What's my favorite color?",
        options: ["Pink! 💖", "Blue! 💙", "Purple! 💜", "Green! 💚"],
        correct: 0
    },
    {
        question: "What's my favorite food?",
        options: ["Pizza! 🍕", "Burgers! 🍔", "Pasta! 🍝", "Sushi! 🍣"],
        correct: 0
    },
    {
        question: "What's my favorite hobby?",
        options: ["Reading 📚", "Dancing 💃", "Painting 🎨", "Gaming 🎮"],
        correct: 0
    }
];

const quizResults = [
    { emoji: "💔", text: "We need to know each other better! Let's hang out more! 🎉" },
    { emoji: "💕", text: "Not bad! We're getting to know each other well! 🌟" },
    { emoji: "💖", text: "Pretty good! We have a great friendship! 💕" },
    { emoji: "💝", text: "Amazing! We know each other so well! 🌈" }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createSparkles();
});

// Create floating hearts in background
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💖', '💕', '💗', '💝', '❤️'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart-bg';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDuration = (3 + Math.random() * 4) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(heart);
            
            // Remove and recreate after animation
            setTimeout(() => {
                heart.remove();
                createFloatingHeart();
            }, 7000);
        }, i * 500);
    }
}

function createFloatingHeart() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💖', '💕', '💗', '💝', '❤️'];
    const heart = document.createElement('div');
    heart.className = 'floating-heart-bg';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.animationDuration = (3 + Math.random() * 4) + 's';
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
        createFloatingHeart();
    }, 7000);
}

// Create sparkle effects
function createSparkles() {
    const container = document.getElementById('sparkles');
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDuration = (2 + Math.random() * 3) + 's';
            container.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
                createSparkle();
            }, 5000);
        }, i * 300);
    }
}

function createSparkle() {
    const container = document.getElementById('sparkles');
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (2 + Math.random() * 3) + 's';
    container.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
        createSparkle();
    }, 5000);
}

// Quiz Functions
let currentQuestion = 0;
let score = 0;

function selectOption(optionIndex) {
    const correct = quizQuestions[currentQuestion].correct;
    
    if (optionIndex === correct) {
        score++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showQuestion() {
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const quizResult = document.getElementById('quizResult');
    
    questionText.textContent = quizQuestions[currentQuestion].question;
    optionsContainer.innerHTML = '';
    
    quizQuestions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    // Hide result if shown
    quizResult.style.display = 'none';
}

function showResult() {
    const optionsContainer = document.getElementById('optionsContainer');
    const quizResult = document.getElementById('quizResult');
    const resultEmoji = document.getElementById('resultEmoji');
    const resultText = document.getElementById('resultText');
    
    optionsContainer.style.display = 'none';
    quizResult.style.display = 'block';
    
    let resultIndex;
    if (score === 0) resultIndex = 0;
    else if (score === 1) resultIndex = 1;
    else if (score === 2) resultIndex = 2;
    else resultIndex = 3;
    
    const result = quizResults[resultIndex];
    resultEmoji.textContent = result.emoji;
    resultText.textContent = result.text;
    
    // Celebrate with confetti!
    createConfetti();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    
    const optionsContainer = document.getElementById('optionsContainer');
    const quizResult = document.getElementById('quizResult');
    
    optionsContainer.style.display = 'block';
    quizResult.style.display = 'none';
    
    showQuestion();
}

// Friendship Calculator
function calculateFriendship() {
    const yourName = document.getElementById('yourName').value.trim();
    const friendName = document.getElementById('friendName').value.trim();
    const resultDisplay = document.getElementById('resultDisplay');
    const resultPercentage = document.getElementById('resultPercentage');
    const resultMessage = document.getElementById('resultMessage');
    
    if (!yourName || !friendName) {
        alert('Please enter both names! 💕');
        return;
    }
    
    // Calculate friendship percentage based on names
    const combinedNames = (yourName + friendName).toLowerCase();
    let hash = 0;
    for (let i = 0; i < combinedNames.length; i++) {
        hash = combinedNames.charCodeAt(i) + ((hash << 5) - hash);
    }
    const percentage = Math.abs(hash % 100);
    const displayPercentage = Math.max(percentage, 75); // Minimum 75% because best friends!
    
    resultPercentage.textContent = displayPercentage + '%';
    
    // Set message based on percentage
    if (displayPercentage >= 95) {
        resultMessage.textContent = "Soul Sisters/Brothers! 💖 You're meant to be best friends!";
    } else if (displayPercentage >= 85) {
        resultMessage.textContent = "Best Friends Forever! 💕 Nothing can separate you!";
    } else if (displayPercentage >= 75) {
        resultMessage.textContent = "Amazing Friends! 💗 Cherish this bond!";
    } else {
        resultMessage.textContent = "Great Friends! 💖 Keep making memories!";
    }
    
    resultDisplay.style.display = 'block';
    
    // Animate percentage
    animatePercentage(0, displayPercentage);
    
    // Create celebration effects
    createConfetti();
}

function animatePercentage(start, end) {
    const resultPercentage = document.getElementById('resultPercentage');
    let current = start;
    const increment = end / 20;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        resultPercentage.textContent = Math.floor(current) + '%';
    }, 50);
}

// Confetti Effect
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(confettiContainer);
    
    const confettiEmojis = ['🎊', '🎉', '💖', '💕', '✨', '⭐', '🌟'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -50px;
                font-size: ${1 + Math.random() * 2}em;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            `;
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 50);
    }
    
    setTimeout(() => confettiContainer.remove(), 5000);
}

// Add confetti animation dynamically
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Add floating heart background animation
const heartBgStyle = document.createElement('style');
heartBgStyle.textContent = `
    .floating-heart-bg {
        position: absolute;
        font-size: 1.5em;
        animation: floatUp 7s ease-out forwards;
        opacity: 0.6;
    }
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
            transform: translateY(-20px) scale(1);
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartBgStyle);

// Memory cards hover effect
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Reason cards click effect
document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('click', function() {
        const icon = this.querySelector('.reason-icon');
        icon.style.transform = 'scale(1.5) rotate(360deg)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 500);
    });
});
