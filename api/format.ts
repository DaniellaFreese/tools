import { VercelRequest, VercelResponse } from '@vercel/node';

interface FormatRequestBody {
  json: string;
  spaces?: number;
}

/**
 * A simple JSON formatter function for Vercel
 */
export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { json, spaces } = req.body as FormatRequestBody;

    if (!json) {
      res.status(400).json({ error: 'JSON input is required' });
      return;
    }

    // Parse and then stringify with specified indentation
    const parsed = JSON.parse(json);
    const formatted = JSON.stringify(parsed, null, spaces || 2);

    res.status(200).json({ result: formatted });
  } catch (error) {
    // If JSON parsing fails
    console.error('Error in format API:', error);
    
    res.status(400).json({ 
      error: 'Invalid JSON input', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
