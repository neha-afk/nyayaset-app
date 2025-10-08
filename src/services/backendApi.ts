// src/services/backendApi.ts

const API_BASE_URL = 'http://localhost:3001/api';

export interface ChatResponse {
  response: string;
  conversationId: string;
  messageId: string;
  model: string;
}

export interface ConversationHistory {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

class BackendAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Chat with AI
  async sendChatMessage(
    message: string, 
    conversationId: string = 'default', 
    userId?: string,
    model: string = 'gpt-3.5-turbo'
  ): Promise<ChatResponse> {
    console.log('🔄 Sending message to backend:', message);
    
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationId,
        userId,
        model
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Backend response:', data);
    return data;
  }

  // Clear conversation
  async clearConversation(
    conversationId: string = 'default', 
    userId?: string
  ): Promise<void> {
    // For now, just return success - we'll implement proper clearing later
    return Promise.resolve();
  }
}

export const backendAPI = new BackendAPI();