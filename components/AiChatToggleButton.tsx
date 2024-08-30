import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AiChatToggleButton: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Ensure this runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAskAI = async () => {
    if (!question.trim()) return; // Don't make the API call if the question is empty
    try {
      setLoading(true);
      const { data } = await axios.post('/api/ai/query', { message: question });
      setAiResponse(data.reply);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
      setAiResponse('Sorry, something went wrong.');
      setLoading(false);
    }
  };

  if (!isClient) return null; // Avoid rendering on the server

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* AI Toggle Button */}
      <button
        className="w-16 h-16 bg-gray-600 rounded-full shadow-lg text-white font-bold hover:bg-gray-800"
        onClick={() => setShowChat(!showChat)}
      >
        Ask AI
      </button>

      {/* AI Chat Popup */}
      {showChat && (
        <div className="absolute bottom-20 right-0 w-80 bg-white shadow-lg rounded-lg p-4">
          <textarea
            rows={4}
            className="w-full p-2 border rounded focus:outline-none text-black"
            placeholder="Ask me anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="btn mt-2 w-full bg-slate-500 text-white hover:bg-slate-600"
            onClick={handleAskAI}
          >
            {loading ? 'Loading...' : 'Send'}
          </button>
          {aiResponse && (
            <p className="text-gray-800 mt-4">{aiResponse}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AiChatToggleButton;

