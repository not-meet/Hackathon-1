import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const queryAI = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: message,
          max_tokens: 150,
          temperature: 0.7, // Adjust as needed
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return res.status(200).json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to connect to AI service' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default queryAI;

