import { NextResponse } from 'next/server';

const imageUrlDetails = 'https://farlink.xyz/details.png';
const postUrlTransfer = 'https://farlink.xyz/api/transfer';

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
        <meta name="fc:frame:post_url" content="${postUrlTransfer}" />
        <meta name="fc:frame:button:1" content="Transfer" />
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
