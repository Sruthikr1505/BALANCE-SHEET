// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messages');

// Auto-resize textarea
function autoResize() {
    messageInput.style.height = 'auto';
    messageInput.style.height = messageInput.scrollHeight + 'px';
    
    // Enable/disable send button based on content
    const hasContent = messageInput.value.trim().length > 0;
    sendButton.disabled = !hasContent;
}

// Create message element
function createMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'assistant-message'}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    
    if (isUser) {
        avatarDiv.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
        `;
    } else {
        avatarDiv.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="currentColor" stroke-width="2"/>
                <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="2"/>
                <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="2"/>
            </svg>
        `;
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    contentDiv.appendChild(paragraph);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    return messageDiv;
}

// Create typing indicator
function createTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message typing-message';
    messageDiv.id = 'typing-indicator';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="currentColor" stroke-width="2"/>
            <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="2"/>
        </svg>
    `;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    
    contentDiv.appendChild(typingDiv);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    return messageDiv;
}

// Scroll to bottom of messages
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Simulate AI response
function getAIResponse(userMessage) {
    const responses = [
        "I understand your question. Let me think about that and provide you with a helpful response.",
        "That's an interesting point! Based on what you've shared, here's what I think...",
        "Thank you for asking! I'd be happy to help you with that. Here's my response:",
        "Great question! Let me break this down for you in a clear and helpful way.",
        "I appreciate you reaching out. Here's how I would approach this:",
        "That's a thoughtful question. Let me provide you with some insights on this topic.",
        "I'm here to help! Based on your message, here's what I'd suggest:",
        "Thanks for the question! I'll do my best to give you a comprehensive answer."
    ];
    
    // Add some context-aware responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! It's great to meet you. How can I assist you today?";
    }
    
    if (lowerMessage.includes('how are you')) {
        return "I'm doing well, thank you for asking! I'm here and ready to help with whatever you need. How are you doing today?";
    }
    
    if (lowerMessage.includes('thank')) {
        return "You're very welcome! I'm always happy to help. Is there anything else I can assist you with?";
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
        return "Goodbye! It was great chatting with you. Feel free to come back anytime if you have more questions. Have a wonderful day!";
    }
    
    // Random response for other messages
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex] + " This is a demo interface, so I'm providing simulated responses to show how the chat would work!";
}

// Send message function
async function sendMessage() {
    const content = messageInput.value.trim();
    
    if (!content) return;
    
    // Add user message
    const userMessage = createMessage(content, true);
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    messageInput.value = '';
    autoResize();
    
    // Scroll to bottom
    scrollToBottom();
    
    // Show typing indicator
    const typingIndicator = createTypingIndicator();
    messagesContainer.appendChild(typingIndicator);
    scrollToBottom();
    
    // Simulate AI thinking time
    const thinkingTime = Math.random() * 2000 + 1000; // 1-3 seconds
    
    setTimeout(() => {
        // Remove typing indicator
        const typingElement = document.getElementById('typing-indicator');
        if (typingElement) {
            typingElement.remove();
        }
        
        // Add AI response
        const aiResponse = getAIResponse(content);
        const assistantMessage = createMessage(aiResponse);
        messagesContainer.appendChild(assistantMessage);
        
        // Scroll to bottom
        scrollToBottom();
    }, thinkingTime);
}

// Event Listeners
messageInput.addEventListener('input', autoResize);

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendButton.disabled) {
            sendMessage();
        }
    }
});

sendButton.addEventListener('click', sendMessage);

// New chat button functionality
document.querySelector('.btn-icon').addEventListener('click', () => {
    // Clear all messages except the welcome message
    const messages = messagesContainer.querySelectorAll('.message');
    messages.forEach((message, index) => {
        if (index > 0) { // Keep the first welcome message
            message.remove();
        }
    });
    
    // Clear input
    messageInput.value = '';
    autoResize();
    
    // Focus on input
    messageInput.focus();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    autoResize();
    messageInput.focus();
    
    // Add some demo functionality
    setTimeout(() => {
        const welcomeHint = document.createElement('div');
        welcomeHint.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: #40414f;
            color: #ececf1;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: fadeIn 0.3s ease-in;
            max-width: 250px;
        `;
        welcomeHint.textContent = 'Try typing "Hello" to start a conversation!';
        document.body.appendChild(welcomeHint);
        
        // Remove hint after 5 seconds
        setTimeout(() => {
            welcomeHint.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => welcomeHint.remove(), 300);
        }, 5000);
    }, 2000);
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(10px);
        }
    }
`;
document.head.appendChild(style);