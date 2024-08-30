import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Hardcoded OpenAI API key
const OPENAI_API_KEY = 'sk-4N7j5R5d-DBg-aMwHBTwvavYSnWcnOl5dezb_McP0gT3BlbkFJ6mjSE2YDFO7F7KWfFn4jQND5W-mIJbmu-alKrLk8QA';

const queryAI = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: message,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Log the response for debugging
      console.log('OpenAI Response:', response.data);

      return res.status(200).json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
      console.error('Error fetching AI response:', error.response ? error.response.data : error.message);
      return res.status(500).json({ error: 'Failed to connect to AI service' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default queryAI;

