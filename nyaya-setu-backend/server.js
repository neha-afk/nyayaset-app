import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Enable CORS and JSON
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(express.json());

// Store conversation history
const conversationHistory = new Map();

// OpenRouter configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Backend with OpenRouter is running!',
    openRouterConfigured: !!OPENROUTER_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Real AI chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationId = 'default', userId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('📨 User message:', message);

    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: 'OpenRouter API key not configured',
        message: 'Please set OPENROUTER_API_KEY in your .env file'
      });
      //// 🆕 ADD THIS NEW ENDPOINT RIGHT AFTER YOUR CHAT ENDPOINT
app.post('/api/lawyers/match', async (req, res) => {
  try {
    const { category, specializations, location, budget } = req.body;
    
    console.log('🔍 Matching lawyers for:', { category, specializations });
    
    // Import your lawyers database (adjust path as needed)
    const lawyersDatabase = require('./backend/data/lawyers.json');
    
    // Filter lawyers based on specializations
    const matchedLawyers = lawyersDatabase.filter(lawyer => {
      const hasSpecialization = lawyer.specializations.some(spec => 
        specializations.some(reqSpec => 
          spec.primary.toLowerCase().includes(reqSpec.toLowerCase()) ||
          (spec.subCategories && spec.subCategories.some(sub => 
            sub.toLowerCase().includes(reqSpec.toLowerCase())
          ))
        )
      );
      
      return hasSpecialization;
    })
    .sort((a, b) => b.rating - a.rating) // Sort by rating
    .slice(0, 4); // Return top 4 matches

    console.log(`✅ Found ${matchedLawyers.length} lawyers`);

    res.json({
      success: true,
      lawyers: matchedLawyers,
      count: matchedLawyers.length
    });
    
  } catch (error) {
    console.error('❌ Error matching lawyers:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to match lawyers' 
    });
  }
});

    }

    // Get or create conversation history
    const historyKey = userId ? `${userId}_${conversationId}` : conversationId;
    if (!conversationHistory.has(historyKey)) {
      conversationHistory.set(historyKey, []);
    }
    
    const history = conversationHistory.get(historyKey);
    
    // Add user message to history
    history.push({ role: 'user', content: message });
    
    // Prepare messages for OpenRouter
    const messages = [
      {
        role: 'system',
        content: `You are Nyaya, a helpful legal assistant for Nyaya Setu in India. You provide legal information, guidance, and support to users.

Key guidelines:
- Provide general legal information and guidance about Indian laws
- Explain legal concepts in simple, easy-to-understand terms  
- Suggest when to consult a real lawyer for specific cases
- Be empathetic, supportive, and understanding
- Focus on Indian legal context and laws
- If unsure about something, recommend consulting a legal professional
- Help users understand their legal rights and options
- Provide information about legal procedures in India
- Be clear that you're an AI assistant and not a substitute for legal advice
- Keep responses conversational and helpful`
      },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    console.log('🔄 Calling OpenRouter API...');

    // Call OpenRouter API
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Nyaya Setu Legal Assistant'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // You can change this to other models
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;
    
    console.log('✅ AI Response received');

    // Add bot response to history
    history.push({ role: 'assistant', content: botResponse });
    
    // Keep only last 15 messages
    if (history.length > 15) {
      conversationHistory.set(historyKey, history.slice(-15));
    }

    res.json({
      response: botResponse,
      conversationId: conversationId,
      messageId: Date.now().toString(),
      model: data.model || 'gpt-3.5-turbo'
    });
    
  } catch (error) {
    console.error('❌ Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
});

// Clear conversation endpoint
app.delete('/api/chat/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  const { userId } = req.query;
  const historyKey = userId ? `${userId}_${conversationId}` : conversationId;
  
  conversationHistory.delete(historyKey);
  res.json({ message: 'Conversation cleared successfully' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 AI BACKEND SERVER STARTED!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔍 Health: http://localhost:${PORT}/health`);
  console.log(`💬 Chat API: http://localhost:${PORT}/api/chat`);
  console.log(`🤖 OpenRouter: ${OPENROUTER_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
});