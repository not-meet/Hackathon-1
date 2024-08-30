import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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
      // Improved error handling
      if (axios.isAxiosError(error)) {
        // Axios error
        console.error('Axios error:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: error.response?.data?.error || 'Failed to connect to AI service' });
      } else {
        // Other errors
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default queryAI;

