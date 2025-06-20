
// Loading screen transition
setTimeout(() => {
    document.getElementById('loadingScreen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainApp').classList.remove('hidden');
    }, 500);
}, 7000);

// Chat simulation functionality
const chatSimBtn = document.getElementById('chatSimBtn');
const chatModal = document.getElementById('chatModal');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');

// Show learning module on Start Learning click
document.getElementById('startLearningBtn').addEventListener('click', function() {
    document.getElementById('learningModule').classList.remove('hidden');
    document.getElementById('mainApp').classList.add('hidden');
    document.querySelectorAll('.module-step').forEach(div => div.classList.add('hidden'));
    document.getElementById('module1').classList.remove('hidden');
});
document.getElementById('nextToModule2').addEventListener('click', function() {
    document.getElementById('module1').classList.add('hidden');
    document.getElementById('module2').classList.remove('hidden');
});
document.getElementById('nextToModule3').addEventListener('click', function() {
    document.getElementById('module2').classList.add('hidden');
    document.getElementById('module3').classList.remove('hidden');
});
document.getElementById('nextToModule4').addEventListener('click', function() {
    document.getElementById('module3').classList.add('hidden');
    document.getElementById('module4').classList.remove('hidden');
});
document.getElementById('nextToModule5').addEventListener('click', function() {
    document.getElementById('module4').classList.add('hidden');
    document.getElementById('module5').classList.remove('hidden');
});
document.getElementById('nextToModule6').addEventListener('click', function() {
    document.getElementById('module5').classList.add('hidden');
    document.getElementById('module6').classList.remove('hidden');
});
document.getElementById('closeLearningBtn').addEventListener('click', function() {
    document.getElementById('learningModule').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
});
document.getElementById('closeLearningBtnFinish').addEventListener('click', function() {
    document.getElementById('learningModule').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
});


// Profile modal functionality
document.getElementById('profileBtn').addEventListener('click', function() {
    document.getElementById('profileModal').classList.remove('hidden');
});
document.getElementById('closeProfileBtn').addEventListener('click', function() {
    document.getElementById('profileModal').classList.add('hidden');
});

// Leaderboard modal functionality
// document.getElementById('leaderboardBtn').addEventListener('click', function() {
//     document.getElementById('leaderboardModal').classList.remove('hidden');
// });
// document.getElementById('closeLeaderboardBtn').addEventListener('click', function() {
//     document.getElementById('leaderboardModal').classList.add('hidden');
// });


// Avatar edit and change functionality
document.getElementById('editAvatarBtn').addEventListener('click', function() {
    document.getElementById('changeAvatarBtn').classList.toggle('hidden');
});

document.getElementById('changeAvatarBtn').addEventListener('click', function() {
    // Generate a random seed for the avatar
    const randomSeed = 'User' + Math.floor(Math.random() * 100000);
    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(randomSeed)}&t=${Date.now()}`;
    document.getElementById('profileAvatar').src = avatarUrl;
});



// Sample chat scenarios
const scenarios = [
    {
        id: 1,
        name: "Stranger Danger",
        messages: [
            { sender: "stranger", text: "Hey there! How are you today?", delay: 1000 },
            { sender: "stranger", text: "I saw your profile pic and thought you looked really cool!", delay: 2000 },
            { sender: "stranger", text: "How old are you? You look mature for your age.", delay: 3000, flag: true },
            { sender: "stranger", text: "Do you want to chat privately? I can show you some cool stuff.", delay: 4000, flag: true }
        ]
    },
    {
        id: 2,
        name: "Gift Offer",
        messages: [
            { sender: "stranger", text: "Hi! I work for a modeling agency and think you'd be perfect!", delay: 1000, flag: true },
            { sender: "stranger", text: "We could make you famous! Would you like that?", delay: 2000, flag: true },
            { sender: "stranger", text: "First we'd need to take some photos of you. Can you send me some?", delay: 3000, flag: true }
        ]
    },
    {
        id: 3,
        name: "Secret Relationship",
        messages: [
            { sender: "stranger", text: "You're so much more mature than people your age", delay: 1000, flag: true },
            { sender: "stranger", text: "We have such a special connection, don't we?", delay: 2000, flag: true },
            { sender: "stranger", text: "Let's keep our chats between us, okay? It's our little secret.", delay: 3000, flag: true }
        ]
    }
];

// Open chat modal
chatSimBtn.addEventListener('click', () => {
    chatModal.classList.add('active');
    startChatScenario(scenarios[0]);
});

// Close chat modal
closeChatBtn.addEventListener('click', () => {
    chatModal.classList.remove('active');
    // Clear chat messages when closing
    chatMessages.innerHTML = '';
});

// Send message
sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage('user', message);
        chatInput.value = '';
        
        // Simulate response after a delay
        setTimeout(() => {
            const responses = [
                "That's interesting! Tell me more about yourself.",
                "You seem really nice. Do you have any hobbies?",
                "I feel like we have a special connection. Do you?",
                "Can we keep this chat between us? It's our little secret.",
                "You're so mature for your age! Most people your age don't understand me like you do."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage('stranger', randomResponse, false, randomResponse.includes('secret') || randomResponse.includes('mature'));
        }, 1000 + Math.random() * 2000);
    }
}

function startChatScenario(scenario) {
    chatMessages.innerHTML = '';
    scenario.messages.forEach((msg, index) => {
        setTimeout(() => {
            addMessage(msg.sender, msg.text, false, msg.flag);
        }, msg.delay);
    });
}

function addMessage(sender, text, isUser = sender === 'user', isFlagged = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'mb-4');
    
    if (isUser) {
        messageDiv.classList.add('text-right');
        messageDiv.innerHTML = `
            <div class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs md:max-w-md">
                ${text}
            </div>
        `;
    } else {
        messageDiv.classList.add('text-left');
        if (isFlagged) {
            messageDiv.classList.add('red-flag');
        }
        messageDiv.innerHTML = `
            <div class="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg max-w-xs md:max-w-md">
                ${text}
                ${isFlagged ? '<div class="text-xs text-red-400 mt-1">🚩 This message contains potential red flags</div>' : ''}
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Quiz functionality
const quickQuizBtn = document.getElementById('quickQuizBtn');
const quizModal = document.getElementById('quizModal');
const closeQuizBtn = document.getElementById('closeQuizBtn');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizProgressBar = document.getElementById('quizProgressBar');
const quizContent = document.getElementById('quizContent');
const quizResult = document.getElementById('quizResult');
const scoreValue = document.getElementById('scoreValue');
const totalQuestions = document.getElementById('totalQuestions');
const resultFeedback = document.getElementById('resultFeedback');
const quizFinishBtn = document.getElementById('quizFinishBtn');

// Quiz questions
const quizQuestions = [
    {
        question: "Someone you just met online asks for your personal photos. What should you do?",
        options: [
            { text: "Send them because they seem nice", correct: false, feedback: "Never share personal photos with strangers online. This is a common grooming tactic." },
            { text: "Block and report them immediately", correct: true, feedback: "Correct! This is inappropriate behavior and should be reported." },
            { text: "Ask them to send their photos first", correct: false, feedback: "Even if they send photos first, you shouldn't share personal images with strangers." },
            { text: "Tell them you'll think about it", correct: false, feedback: "This still leaves the door open for potential grooming. It's best to block and report." }
        ]
    },
    {
        question: "An online friend asks you to keep your conversations secret. What does this indicate?",
        options: [
            { text: "They value your privacy", correct: false, feedback: "No, this is a major red flag. Predators often ask victims to keep conversations secret." },
            { text: "They might be planning something inappropriate", correct: true, feedback: "Correct! This is a classic grooming tactic to isolate victims." },
            { text: "They're just being cautious", correct: false, feedback: "No, legitimate friends don’t ask you to keep all conversations secret." },
            { text: "They're shy about their interests", correct: false, feedback: "This is unlikely. Secrecy is a warning sign of grooming behavior." }
        ]
    },
    {
        question: "What should you do if someone online makes you uncomfortable?",
        options: [
            { text: "Ignore it and hope they stop", correct: false, feedback: "This isn’t the best approach. You should take action to protect yourself." },
            { text: "Tell them directly that you're uncomfortable", correct: false, feedback: "This might help, but the safest option is to block and report them." },
            { text: "Block them and tell a trusted adult", correct: true, feedback: "Correct! This is the safest and most responsible action." },
            { text: "Try to understand why they're acting that way", correct: false, feedback: "Your safety is more important than understanding their reasons." }
        ]
    },
    {
        question: "Someone compliments you excessively and says you're 'mature for your age'. What does this likely mean?",
        options: [
            { text: "They genuinely admire your personality", correct: false, feedback: "This is unlikely. Predators often use this phrase to groom young people." },
            { text: "They might be trying to manipulate you", correct: true, feedback: "Correct! This is a common grooming tactic to make you feel special." },
            { text: "They're just being friendly", correct: false, feedback: "Excessive compliments about maturity are often a red flag." },
            { text: "They want to be your mentor", correct: false, feedback: "Legitimate mentors don’t use this kind of language with young people." }
        ]
    },
    {
        question: "What personal information is generally safe to share online?",
        options: [
            { text: "Your full name and address", correct: false, feedback: "Never share this information with people you don’t know in real life." },
            { text: "Your favorite movies and hobbies", correct: true, feedback: "Correct! General interests are usually safe to share." },
            { text: "Your school name and schedule", correct: false, feedback: "This could help someone locate you — never share it online." },
            { text: "Your phone number and email", correct: false, feedback: "This is private information and should not be shared online." }
        ]
    },
    {
        question: "Why might an online predator try to isolate you from friends and family?",
        options: [
            { text: "So they can surprise you with a gift", correct: false, feedback: "Predators isolate to gain control, not to surprise you." },
            { text: "So you trust them more than others", correct: true, feedback: "Correct! Isolation is a grooming tactic to gain full influence over you." },
            { text: "Because they feel shy around groups", correct: false, feedback: "This is a manipulation tactic, not shyness." },
            { text: "So they can help you focus better", correct: false, feedback: "This is not a healthy reason and is likely manipulation." }
        ]
    },
    {
        question: "If someone sends you an inappropriate image, what should you do?",
        options: [
            { text: "Reply to ask why they sent it", correct: false, feedback: "Do not engage. It could encourage further harm." },
            { text: "Delete it and pretend it didn’t happen", correct: false, feedback: "You should take action, not ignore it." },
            { text: "Save it to show your friends", correct: false, feedback: "Never share or keep inappropriate content — it’s illegal and harmful." },
            { text: "Report them and tell a trusted adult", correct: true, feedback: "Correct! Reporting and telling an adult is the responsible step." }
        ]
    },
    {
        question: "A stranger in an online game wants to chat privately and sends you a link. What should you do?",
        options: [
            { text: "Click the link to see what it is", correct: false, feedback: "Links from strangers could be harmful or phishing scams." },
            { text: "Join the private chat out of curiosity", correct: false, feedback: "Avoid private chats with strangers — it’s risky." },
            { text: "Ignore them or report the behavior", correct: true, feedback: "Correct! This is the safest way to handle suspicious behavior." },
            { text: "Tell them to ask in the main chat", correct: false, feedback: "Even if moved to the main chat, the person could still be harmful." }
        ]
    },
    {
        question: "Which of these is a red flag in online conversations?",
        options: [
            { text: "They ask you about your hobbies", correct: false, feedback: "That’s a normal question — not a red flag by itself." },
            { text: "They want to know your favorite movies", correct: false, feedback: "General questions are usually safe." },
            { text: "They ask you not to tell anyone about your chats", correct: true, feedback: "Correct! This is a common predator tactic." },
            { text: "They send you memes and jokes", correct: false, feedback: "This is normal unless the content becomes inappropriate." }
        ]
    },
    {
        question: "What’s the most important step to protect yourself online?",
        options: [
            { text: "Have lots of online friends", correct: false, feedback: "More friends doesn’t mean more safety." },
            { text: "Share less and keep profiles private", correct: true, feedback: "Correct! Controlling what you share protects your identity." },
            { text: "Use the same password everywhere", correct: false, feedback: "This puts all your accounts at risk." },
            { text: "Reply to everyone to be polite", correct: false, feedback: "You don’t owe strangers a reply — your safety comes first." }
        ]
    }
];


let currentQuestionIndex = 0;
let score = 0;
let selectedOptions = [];

// Open quiz modal
quickQuizBtn.addEventListener('click', () => {
    quizModal.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    selectedOptions = [];
    showQuestion();
});

// Close quiz modal
closeQuizBtn.addEventListener('click', () => {
    quizModal.classList.remove('active');
    resetQuiz();
});

// Finish quiz
quizFinishBtn.addEventListener('click', () => {
    quizModal.classList.remove('active');
    resetQuiz();
});

function showQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        quizQuestion.textContent = question.question;
        quizOptions.innerHTML = '';
        
        // Update progress bar
        const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
        quizProgressBar.style.width = `${progress}%`;
        
        // Create options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('quiz-option');
            optionElement.textContent = option.text;
            optionElement.dataset.index = index;
            optionElement.addEventListener('click', () => selectOption(optionElement, index));
            quizOptions.appendChild(optionElement);
        });
        
        // Show quiz content and hide result
        quizContent.style.display = 'block';
        quizResult.style.display = 'none';
    } else {
        showResults();
    }
}

function selectOption(optionElement, optionIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const option = question.options[optionIndex];
    
    // Disable all options to prevent multiple selections
    const allOptions = quizOptions.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Check if this is a multiple correct answer question
    const isMultipleCorrect = question.note && question.note.includes("two correct answers");
    
    if (isMultipleCorrect) {
        // For multiple correct answers, we need to track selected options
        selectedOptions.push(optionIndex);
        
        // Mark the selected option
        if (option.correct) {
            optionElement.classList.add('correct');
        } else {
            optionElement.classList.add('incorrect');
        }
        
        // Check if we've selected two options
        if (selectedOptions.length === 2) {
            // Show correct answers for all options
            question.options.forEach((opt, idx) => {
                if (opt.correct && !selectedOptions.includes(idx)) {
                    allOptions[idx].classList.add('correct');
                }
            });
            
            // Calculate score (both must be correct to get a point)
            const bothCorrect = selectedOptions.every(idx => question.options[idx].correct);
            if (bothCorrect) {
                score++;
            }
            
            // Move to next question after delay
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 2000);
        }
    } else {
        // For single correct answer questions
        if (option.correct) {
            optionElement.classList.add('correct');
            score++;
        } else {
            optionElement.classList.add('incorrect');
            // Show the correct answer
            const correctIndex = question.options.findIndex(opt => opt.correct);
            allOptions[correctIndex].classList.add('correct');
        }
        
        // Move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 2000);
    }
}

function showResults() {
    quizContent.style.display = 'none';
    quizResult.style.display = 'block';
    
    // Update result display
    scoreValue.textContent = score;
    totalQuestions.textContent = quizQuestions.length;
    
    // Provide feedback based on score
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) {
        resultFeedback.textContent = "Excellent! You're very aware of online safety risks.";
    } else if (percentage >= 50) {
        resultFeedback.textContent = "Good job! You know some safety tips but could learn more.";
    } else {
        resultFeedback.textContent = "Be careful! It's important to learn more about online safety.";
    }
    
    // Complete progress bar
    quizProgressBar.style.width = '100%';
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOptions = [];
    quizContent.style.display = 'block';
    quizResult.style.display = 'none';
    quizProgressBar.style.width = '0%';
}

