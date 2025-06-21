// DOM Elements
const quizBtn = document.getElementById('quizBtn');
const quizModal = document.getElementById('quizModal');
const closeQuizBtn = document.getElementById('closeQuizBtn');
const quizContent = document.getElementById('quizContent');
const learningBtn = document.getElementById('learningBtn');
const learningModal = document.getElementById('learningModal');
const closeLearningBtn = document.getElementById('closeLearningBtn');
const learningContent = document.getElementById('learningContent');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressText = document.getElementById('progressText');
const chatSimBtn = document.getElementById('chatSimBtn');
const chatModal = document.getElementById('chatModal');
const closeChatBtn = document.getElementById('closeChatBtn');
const scenarioSelection = document.getElementById('scenarioSelection');
const chatInterface = document.getElementById('chatInterface');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const resetChatBtn = document.getElementById('resetChatBtn');
const helpChatBtn = document.getElementById('helpChatBtn');
const closeHelpBtn = document.getElementById('closeHelpBtn');
const helpContent = document.getElementById('helpContent');
const reportChatBtn = document.getElementById('reportChatBtn');
const responseOptions = document.getElementById('responseOptions');
const responseOptionButtons = document.getElementById('responseOptionButtons');
const typingIndicator = document.getElementById('typingIndicator');
const warningPanel = document.getElementById('warningPanel');
const warningText = document.getElementById('warningText');
const warningIgnoreBtn = document.getElementById('warningIgnoreBtn');
const warningHelpBtn = document.getElementById('warningHelpBtn');
const safetyTips = document.getElementById('safetyTips');
const tipContent = document.getElementById('tipContent');
const safetyScore = document.getElementById('safetyScore');
const stageIndicator = document.getElementById('stageIndicator');
const emotionalResponse = document.getElementById('emotionalResponse');
const avatarEmoji = document.getElementById('avatarEmoji');
const emotionText = document.getElementById('emotionText');
const strangerName = document.getElementById('strangerName');
const responseFeedback = document.getElementById('responseFeedback');
const feedbackSafe = document.getElementById('feedbackSafe');
const feedbackUnsafe = document.getElementById('feedbackUnsafe');
const feedbackSafeText = document.getElementById('feedbackSafeText');
const feedbackUnsafeText = document.getElementById('feedbackUnsafeText');
const warningDetails = document.getElementById('warningDetails');
const warningExplanation = document.getElementById('warningExplanation');
const scenarioSummary = document.getElementById('scenarioSummary');
const finalScore = document.getElementById('finalScore');
const redFlagsList = document.getElementById('redFlagsList');
const scenarioLessons = document.getElementById('scenarioLessons');
const tryAnotherBtn = document.getElementById('tryAnotherBtn');
const replayScenarioBtn = document.getElementById('replayScenarioBtn');
const quickQuizBtn = document.getElementById('quickQuizBtn');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizProgressBar = document.getElementById('quizProgressBar');
const quizResult = document.getElementById('quizResult');
const scoreValue = document.getElementById('scoreValue');
const totalQuestions = document.getElementById('totalQuestions');
const resultFeedback = document.getElementById('resultFeedback');
const quizFinishBtn = document.getElementById('quizFinishBtn');

// Global Variables
let currentLearningPage = 0;
let totalLearningPages = 5;
let currentScenario = null;
let predatorStage = 0;
let redFlagsDetected = 0;
let userResponses = [];
let detectedFlags = [];
let safetyPoints = 0;
let chatCompleted = false;
let currentQuizQuestion = 0;
let quizScore = 0;

// Loading screen transition
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // Ensure loading screen exists
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Ensure main app exists
                const mainApp = document.getElementById('mainApp');
                if (mainApp) {
                    mainApp.classList.remove('hidden');
                } else {
                    console.error("Main app element not found!");
                }
            }, 500);
        } else {
            console.error("Loading screen element not found!");
            // Attempt to show main content anyway
            const mainApp = document.getElementById('mainApp');
            if (mainApp) {
                mainApp.classList.remove('hidden');
            }
        }
    }, 6000); // Reduced from 7000 to 6000ms for faster loading
});

// Fallback function to ensure content always loads
function ensureContentLoaded() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainApp = document.getElementById('mainApp');
    
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        console.log("Forcing content to load (fallback)");
        loadingScreen.style.opacity = '0';
        loadingScreen.style.display = 'none';
        
        if (mainApp) {
            mainApp.classList.remove('hidden');
        }
    }
}

// Set a fallback timeout in case the loading screen gets stuck
setTimeout(ensureContentLoaded, 10000); // 10 seconds max

// Additional chat elements
const chatInputArea = document.getElementById('chatInputArea');

// Show learning module on Start Learning click
document.getElementById('startLearningBtn').addEventListener('click', function() {
    document.getElementById('learningModule').classList.remove('hidden');
    
    // Reset to module 1
    document.querySelectorAll('.module-step').forEach(div => div.classList.add('hidden'));
    document.getElementById('module1').classList.remove('hidden');
    
    // Reset progress bar to module 1
    updateProgressBar(1);
});
document.getElementById('nextToModule2').addEventListener('click', function() {
    document.getElementById('module1').classList.add('hidden');
    document.getElementById('module2').classList.remove('hidden');
    updateProgressBar(2);
});
document.getElementById('nextToModule3').addEventListener('click', function() {
    document.getElementById('module2').classList.add('hidden');
    document.getElementById('module3').classList.remove('hidden');
    updateProgressBar(3);
});
document.getElementById('nextToModule4').addEventListener('click', function() {
    document.getElementById('module3').classList.add('hidden');
    document.getElementById('module4').classList.remove('hidden');
    updateProgressBar(4);
});
document.getElementById('nextToModule5').addEventListener('click', function() {
    document.getElementById('module4').classList.add('hidden');
    document.getElementById('module5').classList.remove('hidden');
    updateProgressBar(5);
});
document.getElementById('nextToModule6').addEventListener('click', function() {
    document.getElementById('module5').classList.add('hidden');
    document.getElementById('module6').classList.remove('hidden');
    updateProgressBar(6);
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
    
    // Reset to scenario selection view
    scenarioSelection.classList.remove('hidden');
    chatInterface.classList.add('hidden');
    helpContent.classList.add('hidden');
});

// Close chat modal
closeChatBtn.addEventListener('click', () => {
    chatModal.classList.remove('active');
    // Clear chat messages when closing
    chatMessages.innerHTML = '';
    currentScenario = null;
    predatorStage = 0;
    redFlagsDetected = 0;
});

// Initialize scenario selection
document.querySelectorAll('.scenario-card').forEach(card => {
    card.addEventListener('click', function() {
        const scenario = this.dataset.scenario;
        startChatScenario(scenario);
        
        // Switch from scenario selection to chat interface
        scenarioSelection.classList.add('hidden');
        chatInterface.classList.remove('hidden');
    });
});

// Send message
sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Help button
helpChatBtn.addEventListener('click', function() {
    helpContent.classList.remove('hidden');
    chatInterface.classList.add('hidden');
    scenarioSelection.classList.add('hidden');
});

closeHelpBtn.addEventListener('click', function() {
    helpContent.classList.add('hidden');
    
    // Return to the appropriate view
    if (currentScenario) {
        chatInterface.classList.remove('hidden');
    } else {
        scenarioSelection.classList.remove('hidden');
    }
});

// Warning panel interaction
warningText.addEventListener('click', function() {
    warningDetails.classList.toggle('expanded');
});

// Reset chat button
resetChatBtn.addEventListener('click', function() {
    // Return to scenario selection
    scenarioSelection.classList.remove('hidden');
    chatInterface.classList.add('hidden');
    helpContent.classList.add('hidden');
    
    // Clear chat
    chatMessages.innerHTML = '';
    currentScenario = null;
    predatorStage = 0;
    redFlagsDetected = 0;
    userResponses = [];
    detectedFlags = [];
    safetyPoints = 0;
});

// Warning panel buttons
warningIgnoreBtn.addEventListener('click', function() {
    warningPanel.classList.add('hidden');
});

warningHelpBtn.addEventListener('click', function() {
    warningPanel.classList.add('hidden');
    
    // Show safety tips
    showSafetyTip("If you see these warning signs in real life, tell a trusted adult right away.");
});

// Report button
reportChatBtn.addEventListener('click', function() {
    showSafetyTip("Great job recognizing problematic behavior! In real life, you should report this conversation to a trusted adult and the platform.");
});

// Chat scenarios
const chatScenarios = {
    gaming: {
        name: "Gaming Friend",
        icon: "🎮",
        stranger: "GamerPro2010",
        initialMessages: [
            { text: "Hey there! I saw you in that match yesterday. You're really good!", delay: 1000, flag: false },
            { text: "Do you play often? I'm always looking for cool people to game with.", delay: 3000, flag: false }
        ],
        responses: {
            stage1: [
                { text: "Thanks! Yeah, I've been playing for a while. What other games do you like?", safe: true },
                { text: "Thanks! I usually play after school at home.", safe: false, issue: "sharing schedule" }
            ],
            stage2: [
                { text: "I just like to keep my gaming and personal life separate.", safe: true },
                { text: "Maybe, what's your Instagram?", safe: false, issue: "connecting on other platforms too soon" }
            ],
            stage3: [
                { text: "No thanks, I don't share personal photos with people I don't know well.", safe: true },
                { text: "Sure, let me see if I can find one.", safe: false, issue: "sharing personal photos" }
            ]
        },
        predatorResponses: [
            // Stage 1
            [
                "Cool! I play lots of games. Do you have Discord or Instagram so we can chat while gaming?",
                "I'd love to play together sometime. Where are you from?",
                "Nice! Do you game alone or with friends? What school do you go to?"
            ],
            // Stage 2
            [
                "I understand. But it's easier to chat elsewhere. Discord maybe? I've got some game cheats I could send you.",
                "That's cool. You seem more mature than other players your age. How old are you exactly?",
                "No problem. Do you have any photos of yourself? I like to know who I'm playing with."
            ],
            // Stage 3
            [
                "We've been chatting for a while now, I feel like we're friends. I'd love to meet up sometime and game together in person.",
                "Come on, just one photo. I've shared stuff with you. This should be our little secret.",
                "If you send a photo, I can help you join my exclusive gaming group. But don't tell anyone else."
            ]
        ]
    },
    social: {
        name: "Social Media Request",
        icon: "📱",
        stranger: "Alex_J_1995",
        initialMessages: [
            { text: "Hey there! I saw your profile and thought your posts are really cool.", delay: 1000, flag: false },
            { text: "I like the same music you do! It's hard to find people with good taste these days.", delay: 3000, flag: false }
        ],
        responses: {
            stage1: [
                { text: "Thanks! What kind of music are you into?", safe: true },
                { text: "Thanks! Yeah I post a lot from my bedroom lol", safe: false, issue: "hinting at location" }
            ],
            stage2: [
                { text: "I prefer to keep my account private, but thanks for the interest!", safe: true },
                { text: "Maybe, what's your phone number?", safe: false, issue: "sharing contact information" }
            ],
            stage3: [
                { text: "I don't meet up with people I've only talked to online.", safe: true },
                { text: "Maybe, where were you thinking?", safe: false, issue: "agreeing to meet" }
            ]
        },
        predatorResponses: [
            // Stage 1
            [
                "I like all kinds of music! Your profile pic is cute. Is that your bedroom in the background?",
                "Me too! You look really cool in your photos. Do you have a private account I could follow?",
                "That's awesome. You seem really mature compared to others your age. How old are you?"
            ],
            // Stage 2
            [
                "I'd love to chat more directly. Can I get your number or Snapchat?",
                "You seem really cool. I'm actually a photographer and could help you with some professional shots if you want.",
                "I have concert tickets for this weekend. We should hang out. I could pick you up."
            ],
            // Stage 3
            [
                "I'd love to meet up sometime. I can drive to your area. What school are you near?",
                "We have such a connection. Let's keep this between us though - other people might not understand our friendship.",
                "I could bring you some merch from your favorite band. Just meet me at the mall. Don't tell your parents, they might not understand."
            ]
        ]
    },
    talent: {
        name: "Talent Scout",
        icon: "🌟",
        stranger: "TalentFinderPro",
        initialMessages: [
            { sender: "stranger", text: "Hi there! I'm a talent scout for ModelSearch Agency. I came across your profile and you have exactly the look we're searching for!", delay: 1000, flag: true },
            { sender: "stranger", text: "We work with major brands and could offer you some great opportunities. Would you be interested in hearing more?", delay: 3000, flag: false }
        ],
        responses: {
            stage1: [
                { text: "If you're legitimate, you can contact my parents through proper channels.", safe: true },
                { text: "Wow really? That sounds amazing!", safe: false, issue: "showing excitement without verification" }
            ],
            stage2: [
                { text: "I'd need my parents to be involved in any meeting or photoshoot.", safe: true },
                { text: "I could send you some selfies first if you want.", safe: false, issue: "sending photos to stranger" }
            ],
            stage3: [
                { text: "I'm not comfortable with that. Real agencies don't ask for money upfront.", safe: true },
                { text: "OK I'll see if I can get the money.", safe: false, issue: "falling for potential scam" }
            ]
        },
        predatorResponses: [
            // Stage 1
            [
                "We usually work directly with young talent rather than parents at first. Can you send more photos of yourself so I can show my team?",
                "You have a unique look! How tall are you? Can you tell me your measurements?",
                "This could be a huge opportunity for you! I can offer a private photoshoot to build your portfolio."
            ],
            // Stage 2
            [
                "We prefer to meet with just the talent first. Can you come to our studio this weekend? I'll text you the address.",
                "Parents sometimes complicate things. You seem mature enough to handle this professionally on your own.",
                "Before we proceed, we need a small deposit of $200 to secure your spot. It shows us you're serious."
            ],
            // Stage 3
            [
                "This is how the industry works. The fee covers our costs. You can transfer it to my personal account for now.",
                "If you can't tell your parents, maybe you can use your own money? This opportunity won't wait.",
                "Let's keep this between us for now. Once you're famous, your parents will thank you!"
            ]
        ]
    },
    romantic: {
        name: "Romantic Interest",
        icon: "❤️",
        stranger: "Jay_25",
        initialMessages: [
            { sender: "stranger", text: "Hey there gorgeous! Your profile caught my eye. You're not like other people your age.", delay: 1000, flag: true },
            { sender: "stranger", text: "I know I'm a bit older but age is just a number when there's a connection, right?", delay: 3000, flag: true }
        ],
        responses: {
            stage1: [
                { text: "I'm not interested in talking with adults this way.", safe: true },
                { text: "Thanks! How old are you?", safe: false, issue: "engaging with inappropriate romantic interest" }
            ],
            stage2: [
                { text: "I'm going to block and report you. This is inappropriate.", safe: true },
                { text: "I've never had an older person interested in me before...", safe: false, issue: "showing interest in inappropriate relationship" }
            ],
            stage3: [
                { text: "No. I'm ending this conversation and telling my parents.", safe: true },
                { text: "I'm not sure... what kind of pictures?", safe: false, issue: "considering sending photos" }
            ]
        },
        predatorResponses: [
            // Stage 1
            [
                "I'm 25 but very mature. You seem mature too. Do you date older guys?",
                "You're so beautiful/handsome. Do you have more photos? Maybe some just for me?",
                "I bet your parents are strict. They probably wouldn't understand our connection."
            ],
            // Stage 2
            [
                "I can teach you things boys/girls your age don't know about. Have you ever been with someone older?",
                "I can't stop thinking about you. I know it's wrong but I really want to meet you.",
                "You're making me feel special. Could you send me some more private pictures?"
            ],
            // Stage 3
            [
                "Let's meet somewhere private. I can pick you up where no one will see us.",
                "This is our secret, right? If you tell anyone, I could get in trouble, and you wouldn't want that.",
                "If you really care about me, you'll send those pictures. That's how you show someone you trust them."
            ]
        ]
    }
};

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage('user', message);
    chatInput.value = '';
    
    // Store user response for analysis
    userResponses.push(message);
    
    // Check for potentially risky information in user messages
    checkMessageForRisks(message);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate predator response based on current scenario and stage
    setTimeout(() => {
        hideTypingIndicator();
        
        if (currentScenario) {
            // Get a predator response based on the current stage
            let response = "";
            if (predatorStage < currentScenario.predatorResponses.length) {
                const responsesForStage = currentScenario.predatorResponses[predatorStage];
                response = responsesForStage[Math.floor(Math.random() * responsesForStage.length)];
            } else {
                response = "Hey, why don't you give me your phone number so we can talk more directly?";
            }
            
            // Determine if this message has red flags
            const hasRedFlags = containsRedFlags(response);
            
            // Add the predator's message
            addMessage('stranger', response, false, hasRedFlags);
            
            // Show a warning if the message has red flags
            if (hasRedFlags) {
                redFlagsDetected++;
                setTimeout(() => {
                    showWarning(detectRedFlagType(response));
                }, 1000);
            }
            
            // Offer response options on certain messages
            if (Math.random() > 0.5) {
                setTimeout(() => {
                    showResponseOptions();
                }, 1500);
            }
            
            // Advance to next stage
            predatorStage++;
            
            // Show a random safety tip occasionally
            if (predatorStage > 1 && Math.random() > 0.7) {
                const tips = [
                    "Remember: People online aren't always who they claim to be.",
                    "Never share your address, school name, or when you're home alone.",
                    "Be cautious if someone asks for photos or to meet in person.",
                    "If someone makes you uncomfortable, tell a trusted adult.",
                    "Your personal information should stay private online."
                ];
                
                showSafetyTip(tips[Math.floor(Math.random() * tips.length)]);
            }
        }
    }, 1500 + Math.random() * 1500); // Variable delay for realism
}

function startChatScenario(scenarioType) {
    // Clear previous chat
    chatMessages.innerHTML = '';
    
    // Initialize scenario
    currentScenario = chatScenarios[scenarioType];
    
    // Reset tracking variables
    predatorStage = 0;
    redFlagsDetected = 0;
    userResponses = [];
    detectedFlags = [];
    safetyPoints = 0;
    chatCompleted = false;
    
    // Hide any feedback, warnings, or summary panels
    warningPanel.classList.add('hidden');
    responseFeedback.classList.add('hidden');
    safetyTips.classList.add('hidden');
    scenarioSummary.classList.add('hidden');
    
    // Update UI indicators
    updateSafetyDisplay();
    
    // Add welcome message
    addSystemMessage(`You are now chatting with <strong>${currentScenario.stranger}</strong>. This is a simulation to practice identifying warning signs.`);
    
    // Initialize emotion display
    strangerName.textContent = currentScenario.stranger;
    updateEmotionDisplay('friendly');
    
    // Send initial messages with typing indicators and delays
    currentScenario.initialMessages.forEach((msg, index) => {
        setTimeout(() => {
            if (index === 0) {
                showTypingIndicator();
            }
            
            setTimeout(() => {
                hideTypingIndicator();
                addMessage('stranger', msg.text, false, msg.flag);
                
                // Show a warning if this message has a flag
                if (msg.flag) {
                    setTimeout(() => {
                        showWarning(detectRedFlagType(msg.text));
                    }, 1000);
                }
                
                // Show response options after the last initial message
                if (index === currentScenario.initialMessages.length - 1) {
                    setTimeout(() => {
                        showResponseOptions();
                    }, 1000);
                }
            }, msg.delay);
            
        }, (index * 2000) + 1000);
    });
}

// Add a message to the chat
function addMessage(sender, text, isResponse = false, isFlag = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'mb-3', 'p-2', 'rounded');
    
    // Add safety classes for visual feedback
    if (isResponse) {
        messageDiv.classList.add(isFlag ? 'unsafe' : 'safe');
    }
    
    const senderSpan = document.createElement('span');
    senderSpan.classList.add('text-xs', 'font-semibold');
    
    if (sender === 'user') {
        senderSpan.classList.add('text-green-400');
        senderSpan.textContent = 'You:';
        messageDiv.classList.add('bg-gray-800');
    } else {
        senderSpan.classList.add('text-purple-400');
        senderSpan.textContent = currentScenario.stranger + ':';
        messageDiv.classList.add('bg-gray-700');
        
        // Check for red flags
        if (isFlag) {
            setTimeout(() => {
                const flagType = detectRedFlagType(text);
                showWarning(flagType);
            }, 1500);
            
            // Update emotion display for manipulative messages
            updateEmotionDisplay('manipulative');
        }
    }
    
    const textP = document.createElement('p');
    textP.classList.add('mt-1');
    textP.textContent = text;
    
    messageDiv.appendChild(senderSpan);
    messageDiv.appendChild(textP);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add a system message to the chat
function addSystemMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('system-message', 'text-xs', 'text-center', 'text-gray-400', 'my-2', 'py-1');
    messageDiv.innerHTML = message;
    chatMessages.appendChild(messageDiv);
}

// Show typing indicator
function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
}

// Hide typing indicator
function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
}

// Show warning panel
function showWarning(flagType) {
    // Add to detected flags list if not already there
    if (!detectedFlags.includes(flagType.type)) {
        detectedFlags.push(flagType.type);
    }
    
    redFlagsDetected++;
    warningText.textContent = flagType.message;
    warningExplanation.textContent = flagType.explanation;
    warningPanel.classList.remove('hidden');
    
    // Update safety score display
    updateSafetyDisplay();
}

// Update emotional display of the stranger
function updateEmotionDisplay(emotion) {
    emotionalResponse.classList.remove('hidden');
    strangerName.textContent = currentScenario.stranger;
    
    const avatarCircle = avatarEmoji.parentElement;
    avatarCircle.className = 'avatar-circle'; // Reset classes
    
    switch(emotion) {
        case 'friendly':
            avatarEmoji.textContent = '🙂';
            emotionText.textContent = 'seems friendly';
            break;
        case 'happy':
            avatarEmoji.textContent = '😊';
            emotionText.textContent = 'appears pleased';
            avatarCircle.classList.add('happy');
            break;
        case 'upset':
            avatarEmoji.textContent = '😠';
            emotionText.textContent = 'seems upset';
            avatarCircle.classList.add('upset');
            break;
        case 'manipulative':
            avatarEmoji.textContent = '🤔';
            emotionText.textContent = 'is being manipulative';
            avatarCircle.classList.add('manipulative');
            break;
        case 'persistent':
            avatarEmoji.textContent = '😒';
            emotionText.textContent = 'is being persistent';
            avatarCircle.classList.add('manipulative');
            break;
    }
}

// Show response feedback
function showResponseFeedback(isSafe, message, issue = '') {
    responseFeedback.classList.remove('hidden');
    
    if (isSafe) {
        feedbackSafe.classList.remove('hidden');
        feedbackUnsafe.classList.add('hidden');
        feedbackSafeText.textContent = message || 'Good choice! This response keeps you safe.';
        safetyPoints++;
    } else {
        feedbackSafe.classList.add('hidden');
        feedbackUnsafe.classList.remove('hidden');
        feedbackUnsafeText.textContent = message || `This response puts you at risk by ${issue}.`;
    }
    
    // Update safety score
    updateSafetyDisplay();
    
    // Hide feedback after a delay
    setTimeout(() => {
        responseFeedback.classList.add('hidden');
    }, 4000);
}

// Update safety display
function updateSafetyDisplay() {
    safetyScore.textContent = safetyPoints;
    stageIndicator.textContent = predatorStage + 1;
}

// Show safety tip
function showSafetyTip(tip) {
    tipContent.textContent = tip;
    safetyTips.classList.remove('hidden');
    
    // Hide tip after some time
    setTimeout(() => {
        safetyTips.classList.add('hidden');
    }, 6000);
}

// Learning Module Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Module Navigation with Progress Bar
    const moduleSteps = document.querySelectorAll('.module-step');
    const moduleCount = moduleSteps.length;
    const progressBar = document.getElementById('moduleProgressBar');
    const currentModuleNum = document.getElementById('currentModuleNum');
      // Back Button Navigation
    document.getElementById('backToModule1')?.addEventListener('click', function() {
        document.querySelectorAll('.module-step').forEach(step => step.classList.add('hidden'));
        document.getElementById('module1').classList.remove('hidden');
        updateProgressBar(1);
    });
    document.getElementById('backToModule2')?.addEventListener('click', function() {
        document.querySelectorAll('.module-step').forEach(step => step.classList.add('hidden'));
        document.getElementById('module2').classList.remove('hidden');
        updateProgressBar(2);
    });
    document.getElementById('backToModule3')?.addEventListener('click', function() {
        document.querySelectorAll('.module-step').forEach(step => step.classList.add('hidden'));
        document.getElementById('module3').classList.remove('hidden');
        updateProgressBar(3);
    });
    document.getElementById('backToModule4')?.addEventListener('click', function() {
        document.querySelectorAll('.module-step').forEach(step => step.classList.add('hidden'));
        document.getElementById('module4').classList.remove('hidden');
        updateProgressBar(4);
    });
    document.getElementById('backToModule5')?.addEventListener('click', function() {
        document.querySelectorAll('.module-step').forEach(step => step.classList.add('hidden'));
        document.getElementById('module5').classList.remove('hidden');
        updateProgressBar(5);
    });
    
    // Interactive Elements - Message Cards
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach(card => {
        card.addEventListener('click', function() {
            const feedback = this.querySelector('.feedback');
            if (feedback) {
                feedback.classList.toggle('hidden');
                feedback.classList.add('feedback-animation');
            }
        });
    });
    
    // Knowledge Checks
    const checkAnswerBtns = document.querySelectorAll('.check-answer');
    checkAnswerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.knowledge-check');
            const correctAnswer = parent.querySelector('.correct-answer');
            const feedbackElement = parent.querySelector('.answer-feedback');
            
            if (correctAnswer && correctAnswer.checked && feedbackElement) {
                feedbackElement.classList.remove('hidden');
                feedbackElement.classList.add('feedback-animation');
                this.textContent = "Correct!";
                this.style.backgroundColor = "#48bb78";
            } else {
                // Show incorrect feedback
                if (feedbackElement) {
                    feedbackElement.classList.remove('hidden');
                    feedbackElement.textContent = "Try again! Review the material and select the best answer.";
                    feedbackElement.classList.add('feedback-animation');
                    feedbackElement.style.color = "#fc8181";
                }
                this.textContent = "Try Again";
                this.style.backgroundColor = "#f56565";
            }
        });
    });
    
    // Flag Checking
    const checkFlagsBtn = document.querySelector('.check-flags');
    if (checkFlagsBtn) {
        checkFlagsBtn.addEventListener('click', function() {
            const flag1 = document.getElementById('flag1');
            const flag2 = document.getElementById('flag2');
            const flag3 = document.getElementById('flag3');
            const feedback = document.querySelector('.flags-feedback');
            
            if (flag1 && flag1.checked && flag2 && flag2.checked && flag3 && flag3.checked) {
                feedback.classList.remove('hidden');
                feedback.classList.add('feedback-animation');
                this.textContent = "Great job!";
                this.style.backgroundColor = "#48bb78";
            } else {
                feedback.classList.remove('hidden');
                feedback.textContent = "Not quite! Try to identify all red flags in the message.";
                feedback.style.color = "#fc8181";
                feedback.classList.add('feedback-animation');
                this.textContent = "Try Again";
                this.style.backgroundColor = "#f56565";
            }
        });
    }
    
    // Safety Self-Test
    const checkSafetyBtn = document.querySelector('.check-safety');
    if (checkSafetyBtn) {
        checkSafetyBtn.addEventListener('click', function() {
            const test1 = document.getElementById('test1');
            const test2 = document.getElementById('test2');
            const test3 = document.getElementById('test3');
            const test4 = document.getElementById('test4');
            
            const checkedCount = [test1, test2, test3, test4].filter(test => test && test.checked).length;
            const resultElement = document.querySelector('.safety-result');
            
            if (resultElement) {
                resultElement.classList.remove('hidden');
                resultElement.classList.add('feedback-animation');
                
                if (checkedCount === 4) {
                    resultElement.textContent = "Perfect! You're practicing excellent online safety habits.";
                    resultElement.style.backgroundColor = "#2f855a";
                } else if (checkedCount >= 2) {
                    resultElement.textContent = `Good start! You checked ${checkedCount}/4 safety practices. Try to implement the others too.`;
                    resultElement.style.backgroundColor = "#dd6b20";
                } else {
                    resultElement.textContent = "You have some important safety steps to take. Review the safety guidelines.";
                    resultElement.style.backgroundColor = "#c53030";
                }
            }
        });
    }
    
    // Technique buttons
    const techButtons = document.querySelectorAll('.technique-btn');
    techButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Final Challenge
    document.getElementById('submitFinalChallenge')?.addEventListener('click', function() {
        const option2 = document.getElementById('option2');
        const challengeResult = document.getElementById('challengeResult');
        
        if (option2 && option2.checked && challengeResult) {
            challengeResult.classList.remove('hidden');
            challengeResult.classList.add('feedback-animation');
            this.style.display = 'none';
        } else {
            alert("That's not the safest choice. Try again!");
        }
    });
});

// Skip intro button
document.addEventListener('DOMContentLoaded', function() {
    const skipIntroBtn = document.getElementById('skipIntroBtn');
    if (skipIntroBtn) {
        skipIntroBtn.addEventListener('click', function() {
            const loadingScreen = document.getElementById('loadingScreen');
            const mainApp = document.getElementById('mainApp');
            
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    if (mainApp) {
                        mainApp.classList.remove('hidden');
                    }
                }, 300);
            }
        });
    }
});

// Detect type of red flag
function detectRedFlagType(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('secret') || lowerMessage.includes('just between us') || lowerMessage.includes('don\'t tell')) {
        return {
            type: 'secrecy',
            message: 'This person is trying to establish secrecy',
            explanation: 'Predators often insist on keeping conversations secret to isolate victims and prevent them from getting help or advice from trusted adults.'
        };
    } else if (lowerMessage.includes('mature') || lowerMessage.includes('for your age')) {
        return {
            type: 'flattery',
            message: 'This person is using excessive flattery',
            explanation: 'Predators use flattery about maturity to make young people feel special and to manipulate them into inappropriate situations or conversations.'
        };
    } else if (lowerMessage.includes('photo') || lowerMessage.includes('picture') || lowerMessage.includes('selfie')) {
        return {
            type: 'photo-request',
            message: 'This person is requesting personal photos',
            explanation: 'Asking for photos is often a step toward requesting more inappropriate content, and sharing photos can reveal private information about your location or identity.'
        };
    } else if (lowerMessage.includes('meet') || lowerMessage.includes('in person')) {
        return {
            type: 'meeting-request',
            message: 'This person is suggesting an in-person meeting',
            explanation: 'Meeting someone you only know online is extremely dangerous. Online predators may not be who they claim to be and meeting could put you in physical danger.'
        };
    } else if (lowerMessage.includes('where') || lowerMessage.includes('live') || lowerMessage.includes('school') || lowerMessage.includes('address')) {
        return {
            type: 'personal-info',
            message: 'This person is asking for personal information',
            explanation: 'Sharing details about where you live, go to school, or other identifying information can put your safety at risk and should never be shared with online strangers.'
        };
    } else if (lowerMessage.includes('private') || lowerMessage.includes('discord') || lowerMessage.includes('instagram') || lowerMessage.includes('snap')) {
        return {
            type: 'platform-switch',
            message: 'This person wants to switch to a private platform',
            explanation: 'Moving conversations to more private platforms makes it harder for others to monitor interactions and often precedes inappropriate requests or content.'
        };
    } else {
        return {
            type: 'manipulation',
            message: 'This message shows signs of manipulation',
            explanation: 'This message contains subtle manipulation tactics that could be an attempt to gain your trust or influence your decisions in unsafe ways.'
        };
    }
}

// Show response options
function showResponseOptions() {
    // Hide the normal input
    chatInputArea.classList.add('hidden');
    
    // Show response options area
    responseOptions.classList.remove('hidden');
    
    // Clear previous options
    responseOptionButtons.innerHTML = '';
    
    // Get the appropriate responses based on current stage
    let stageResponses;
    switch(predatorStage) {
        case 0:
            stageResponses = currentScenario.responses.stage1;
            break;
        case 1:
            stageResponses = currentScenario.responses.stage2;
            break;
        case 2:
            stageResponses = currentScenario.responses.stage3;
            break;
    }
    
    // Add response options
    stageResponses.forEach(response => {
        const button = document.createElement('button');
        button.classList.add('response-option', 'p-3', 'text-left', 'bg-gray-700', 'hover:bg-gray-600', 'rounded', 'text-sm', 'transition');
        
        // Add a subtle hint icon
        const hintIcon = document.createElement('span');
        hintIcon.classList.add('hint-icon');
        hintIcon.innerHTML = response.safe ? '<i class="fas fa-shield-alt"></i>' : '<i class="fas fa-exclamation-circle"></i>';
        button.appendChild(hintIcon);
        
        const textSpan = document.createElement('span');
        textSpan.textContent = response.text;
        button.appendChild(textSpan);
        
        button.addEventListener('click', function() {
            handleResponseSelection(response);
        });
        
        responseOptionButtons.appendChild(button);
    });
}

// Handle response selection
function handleResponseSelection(response) {
    // Hide response options
    responseOptions.classList.add('hidden');
    
    // Show normal input again
    chatInputArea.classList.remove('hidden');
    
    // Add user message
    addMessage('user', response.text);
    
    // Store response
    userResponses.push({ 
        stage: predatorStage, 
        response: response.text, 
        safe: response.safe 
    });
    
    // Show feedback
    if (response.safe) {
        showResponseFeedback(true, "Good choice! This response helps keep you safe.");
        updateEmotionDisplay(Math.random() > 0.5 ? 'upset' : 'persistent');
    } else {
        showResponseFeedback(false, `Be careful! ${response.issue.charAt(0).toUpperCase() + response.issue.slice(1)} can put you at risk.`, response.issue);
        updateEmotionDisplay('happy');
    }
    
    // Process predator's next response
    setTimeout(() => {
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            
            const responses = currentScenario.predatorResponses[predatorStage];
            const responseIndex = Math.floor(Math.random() * responses.length);
            const predatorMessage = responses[responseIndex];
            
            // Add predator message
            addMessage('stranger', predatorMessage, false, true);
            
            // Move to next stage
            predatorStage++;
            
            // Update stage indicator
            stageIndicator.textContent = predatorStage + 1;
            
            // If we've reached the end of the scenario
            if (predatorStage >= 3) {
                // Show scenario summary
                setTimeout(showScenarioSummary, 2000);
                chatCompleted = true;
            } else {
                // Otherwise, show next response options
                setTimeout(showResponseOptions, 1500);
            }
            
        }, 1500 + Math.random() * 1000);
    }, 2000);
}

// Show scenario summary
function showScenarioSummary() {
    // Update final score
    finalScore.textContent = safetyPoints;
    
    // Populate red flags list
    redFlagsList.innerHTML = '';
    if (detectedFlags.length > 0) {
        detectedFlags.forEach(flag => {
            const li = document.createElement('li');
            switch(flag) {
                case 'secrecy':
                    li.textContent = 'Attempts to establish secrecy';
                    break;
                case 'flattery':
                    li.textContent = 'Excessive flattery and special treatment';
                    break;
                case 'photo-request':
                    li.textContent = 'Requests for personal photos';
                    break;
                case 'meeting-request':
                    li.textContent = 'Attempts to arrange in-person meetings';
                    break;
                case 'personal-info':
                    li.textContent = 'Requests for personal information';
                    break;
                case 'platform-switch':
                    li.textContent = 'Attempts to move conversation to more private platforms';
                    break;
                case 'manipulation':
                    li.textContent = 'General manipulation tactics';
                    break;
            }
            redFlagsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No red flags were identified';
        redFlagsList.appendChild(li);
    }
    
    // Populate key lessons
    let lessonHTML = '';
    
    // Custom lessons based on scenario type
    switch(currentScenario.name) {
        case 'Gaming Friend':
            lessonHTML = `
                <p>• Be cautious when gaming strangers want to connect outside of gaming platforms</p>
                <p>• Never share personal information even if someone seems friendly</p>
                <p>• Real gaming friends respect privacy and safety boundaries</p>
            `;
            break;
        case 'Social Media Request':
            lessonHTML = `
                <p>• Be careful with friend requests from people you don't know</p>
                <p>• Keep personal details and locations private on social media</p>
                <p>• Report and block suspicious accounts</p>
            `;
            break;
        case 'Talent Scout':
            lessonHTML = `
                <p>• Legitimate talent scouts don't approach minors directly online</p>
                <p>• Always involve parents/guardians in any professional opportunities</p>
                <p>• Be skeptical of promises of fame or special treatment</p>
            `;
            break;
        case 'Romantic Interest':
            lessonHTML = `
                <p>• Adults seeking romantic relationships with teens are predators</p>
                <p>• Age-inappropriate relationships are never acceptable</p>
                <p>• Report such behavior immediately to a trusted adult</p>
            `;
            break;
    }
    
    scenarioLessons.innerHTML = lessonHTML;
    
    // Show summary panel
    scenarioSummary.classList.remove('hidden');
    
    // Add system message
    addSystemMessage('Chat scenario completed. View your summary above.');
}

// Try another scenario button
tryAnotherBtn.addEventListener('click', function() {
    // Hide scenario summary
    scenarioSummary.classList.add('hidden');
    
    // Show scenario selection
    scenarioSelection.classList.remove('hidden');
    chatInterface.classList.add('hidden');
});

// Replay scenario button
replayScenarioBtn.addEventListener('click', function() {
    // Hide scenario summary
    scenarioSummary.classList.add('hidden');
    
    // Replay the current scenario
    startChatScenario(Object.keys(chatScenarios).find(key => chatScenarios[key] === currentScenario));
});

// Quick Quiz Functionality
// Quiz questions data
const quizData = [
    {
        question: "Which of the following is a warning sign of online grooming?",
        options: [
            "Asking about your favorite video games",
            "Requesting to keep conversations secret from parents",
            "Sharing information about their school",
            "Talking about a popular TV show"
        ],
        correct: 1,
        explanation: "Predators often request secrecy to isolate victims from their support networks."
    },
    {
        question: "What should you do if someone online makes you feel uncomfortable?",
        options: [
            "Keep talking to them to be polite",
            "Share minimal personal information",
            "Block them and tell a trusted adult",
            "Give them another chance"
        ],
        correct: 2,
        explanation: "Your safety is the priority. Block suspicious contacts and tell a trusted adult."
    },
    {
        question: "Which information is safest to share with someone you only know online?",
        options: [
            "Your school name",
            "Your general interests and hobbies",
            "Your home address",
            "Photos of yourself and friends"
        ],
        correct: 1,
        explanation: "General interests are relatively safe to share, while specific personal details are not."
    },
    {
        question: "If an online friend offers you gifts or money, you should:",
        options: [
            "Accept if it's something you really want",
            "Give them your address for delivery",
            "Decline and tell a trusted adult",
            "Ask for more expensive gifts"
        ],
        correct: 2,
        explanation: "Predators often use gifts as part of the grooming process. Always decline and report."
    },
    {
        question: "What does 'flattery' mean in the context of online grooming?",
        options: [
            "Making normal compliments",
            "Using excessive praise to manipulate",
            "Being friendly and supportive",
            "Telling jokes to make someone laugh"
        ],
        correct: 1,
        explanation: "Predators use excessive compliments to make targets feel special and lower their defenses."
    }
];

// Event listener for Quick Quiz button
quickQuizBtn.addEventListener('click', function() {
    quizModal.classList.add('active');
    startQuiz();
});

// Close quiz modal
closeQuizBtn.addEventListener('click', function() {
    quizModal.classList.remove('active');
    // Reset for next time
    currentQuizQuestion = 0;
    quizScore = 0;
});

// Quiz finish button
quizFinishBtn.addEventListener('click', function() {
    quizModal.classList.remove('active');
    // Reset for next time
    currentQuizQuestion = 0;
    quizScore = 0;
});

// Function to update the progress bar in the learning module
function updateProgressBar(moduleNumber) {
    const totalModules = 6;
    const progressPercentage = (moduleNumber / totalModules) * 100;
    const moduleProgressBar = document.getElementById('moduleProgressBar');
    const currentModuleNum = document.getElementById('currentModuleNum');
    
    if (moduleProgressBar) {
        moduleProgressBar.style.width = `${progressPercentage}%`;
    }
    
    if (currentModuleNum) {
        currentModuleNum.textContent = moduleNumber;
    }
}

// Global quiz variables (already declared)

// Start quiz function
function startQuiz() {
    // Reset quiz state
    currentQuizQuestion = 0;
    quizScore = 0;
    
    // Clear any existing feedback classes
    resultFeedback.classList.remove('text-green-400', 'text-yellow-400', 'text-red-400');
    
    // Show quiz content, hide result
    quizContent.style.display = 'block';
    quizResult.style.display = 'none';
    
    // Load first question
    loadQuestion();
}

// Load question function
function loadQuestion() {
    // Clear previous options
    quizOptions.innerHTML = '';
    
    // Get current question
    const currentQuestion = quizData[currentQuizQuestion];
    
    // Set question text
    quizQuestion.textContent = currentQuestion.question;
    
    // Create option buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('quiz-option');
        button.textContent = option;
        button.dataset.index = index;
        button.addEventListener('click', checkAnswer);
        quizOptions.appendChild(button);
    });
      // Update progress bar
    const progress = ((currentQuizQuestion + 1) / quizData.length) * 100;
    document.getElementById('quizProgressBar').style.width = `${progress}%`;
}

// Check answer function
function checkAnswer(e) {
    const selectedOption = parseInt(e.target.dataset.index);
    const currentQuestion = quizData[currentQuizQuestion];
    
    // Disable all options after selection
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });
    
    // Highlight correct and incorrect answers
    document.querySelectorAll('.quiz-option').forEach((btn, index) => {
        if (index === currentQuestion.correct) {
            btn.classList.add('correct');
        } else if (index === selectedOption) {
            btn.classList.add('incorrect');
        }
    });
    
    // Update score if correct
    if (selectedOption === currentQuestion.correct) {
        quizScore++;
    }
    
    // Show explanation
    const explanation = document.createElement('p');
    explanation.classList.add('quiz-explanation', 'mt-3', 'text-sm', 'text-gray-300', 'bg-gray-800', 'p-2', 'rounded');
    explanation.textContent = currentQuestion.explanation;
    quizOptions.appendChild(explanation);
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuizQuestion++;
        
        // Check if quiz is complete
        if (currentQuizQuestion < quizData.length) {
            loadQuestion();
        } else {
            showQuizResult();
        }
    }, 2000);
}

// Show quiz result function
function showQuizResult() {
    // Hide quiz content, show result
    quizContent.style.display = 'none';
    quizResult.style.display = 'block';
    
    // Update score
    scoreValue.textContent = quizScore;
    totalQuestions.textContent = quizData.length;
    
    // Set feedback based on score
    const percentage = (quizScore / quizData.length) * 100;
    
    if (percentage >= 80) {
        resultFeedback.textContent = "Excellent! You're well-equipped to stay safe online.";
        resultFeedback.classList.add('text-green-400');
    } else if (percentage >= 60) {
        resultFeedback.textContent = "Good job! You know the basics, but review some safety guidelines.";
        resultFeedback.classList.add('text-yellow-400');
    } else {
        resultFeedback.textContent = "You should review online safety guidelines to better protect yourself.";
        resultFeedback.classList.add('text-red-400');
    }
}

