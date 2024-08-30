import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

const API_KEY = 'AIzaSyCpEW43m2-89-dzZIKzKAAHO3qY7k1uAeI';

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const queryAI = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [], // You can add history here if needed
      });

      const result = await chatSession.sendMessage(message);
      const responseText = result.response.text();

      return res.status(200).json({ reply: responseText });
    } catch (error) {
      console.error('Error fetching AI response:');

      if (error instanceof Error) {
        // Handle generic errors
        console.error('Error Message:', error.message);
      } else if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error('Error Response Data:', error.response?.data);
        console.error('Error Response Status:', error.response?.status);
        console.error('Error Response Headers:', error.response?.headers);
      } else {
        console.error('Unexpected Error:', error);
      }

      return res.status(500).json({ error: 'Failed to connect to AI service' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default queryAI;

