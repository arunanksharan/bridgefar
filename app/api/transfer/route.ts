import { NextResponse } from 'next/server';

const imageUrlDetails = 'https://farlink.xyz/details.png';
const postUrlHome = 'https://farlink.xyz/';

export async function POST(req, res) {
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Farlinked!</title>
        <meta property="og:title" content="BridgeFar!" />
        <meta property="og:image" content="${imageUrlDetails}" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="${imageUrlDetails}" />
        <meta name="fc:frame:post_url" content="${postUrlHome}" />
        <meta name="fc:frame:button:1" content="Home" />
      </head>
      <body>Farlink</body>
    </html>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}
