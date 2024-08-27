import { NextApiRequest, NextApiResponse } from 'next';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

