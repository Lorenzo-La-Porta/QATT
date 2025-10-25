import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Ensure the Google GenAI API key is provided; Genkit can read from env, but we
// pass it explicitly and surface a clear error in development if it's missing.
const GOOGLE_GENAI_API_KEY = process.env.GOOGLE_GENAI_API_KEY;

if (!GOOGLE_GENAI_API_KEY) {
  // Throwing here helps fail fast on the server side where flows run.
  // Next.js will surface this in logs instead of returning a vague error to users.
  throw new Error(
    'Missing GOOGLE_GENAI_API_KEY environment variable. Please set it in your .env.local (Next) or environment and restart the server.'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: GOOGLE_GENAI_API_KEY,
      // Optionally set a sensible default model; can be overridden per prompt if needed.
      // defaultModel: 'gemini-1.5-flash',
    }),
  ],
});
