const ethers = require('ethers');
import { FrameRequest, getFrameAccountAddress } from '@coinbase/onchainkit';
import { NextResponse } from 'next/server';

const API_KEY = '72a5b4b0-e727-48be-8aa1-5da9d62fe635'; // SOCKET PUBLIC API KEY
// Polygon (137: USDC: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174) to Base (8453: USDC: 0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)
const fromChainIdPoly = 137; // Polygon
const fromTokenAddressPoly = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'; // USDC
const toChainIdBase = 8453; // Ethereum
const toTokenAddressBase = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'; // USDC

const postUrlDetails = 'https://farlink.xyz/api/details';
// const fromAmount = 0.1;

// {
//   "untrustedData": {
//       "buttonIndex": 1,
//       "fid": 224616,
//       "inputText": "0.1 of USDC from Polygon to Base"

//   }
// }

// Makes a GET request to Socket APIs for quote
async function getQuote(
  fromChainId,
  fromTokenAddress,
  toChainId,
  toTokenAddress,
  fromAmount,
  userAddress,
  uniqueRoutesPerBridge = true,
  sort = 'output',
  singleTxOnly = true
) {
  const response = await fetch(
    `https://api.socket.tech/v2/quote?fromChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&toChainId=${toChainId}&toTokenAddress=${toTokenAddress}&fromAmount=${fromAmount}&userAddress=${userAddress}&uniqueRoutesPerBridge=${uniqueRoutesPerBridge}&sort=${sort}&singleTxOnly=${singleTxOnly}`,
    {
      method: 'GET',
      headers: {
        'API-KEY': API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  const json = await response.json();
  return json;
}

function extractParams(str) {
  const regex = /(\d+(\.\d+)?)\s(\w+)\sfrom\s(\w+)\sto\s(\w+)/;
  const match = str.match(regex);

  if (match) {
    return {
      amount: match[1],
      token: match[3],
      chainFrom: match[4],
      chainTo: match[5],
    };
  } else {
    // Handle the case where the string does not match the expected format
    return null;
  }
}
export async function GET(req, res) {
  // Your logic for handling GET requests
  res.json({ message: 'This handles GET requests' });
}

export async function POST(req, res) {
  // Extract input text from post request

  const body: FrameRequest = await req.json();
  const bodyTrusted: { trustedData?: { messageBytes?: string } } =
    await req.json();
  console.log('Inside jobs body:', body);
  const { untrustedData: message } = body;
  console.log('Inside jobs message:', message);
  const { buttonIndex, fid, inputText } = message;
  console.log('Inside jobs buttonIndex:', buttonIndex);
  console.log('Inside jobs fid:', fid);
  console.log('Inside jobs inputText:', inputText);

  // Fetch connected user address with farcaster id

  // fid;
  const userAddressFC = await getFrameAccountAddress(bodyTrusted, {
    NEYNAR_API_KEY: 'NEYNAR_API_DOCS',
  });

  // extract param values from inputText
  const params = inputText.split(' ');
  console.log('Inside jobs params:', params);
  // const { amount, token, chainFrom, chainTo } = extractParams(inputText);

  const quotes = await getQuote(
    fromChainIdPoly,
    fromTokenAddressPoly,
    toChainIdBase,
    toTokenAddressBase,
    0.1,
    userAddressFC,
    true,
    'output',
    true
  );

  // Convert Quotes to image using satori

  // const quote = quotes[0];

  const imageUrlForQuote = `https://satori.far.link/sample_quote.png`;

  return new NextResponse(
    `<!DOCTYPE html>
  <html>
    <head>
      <title>Farlinked!</title>
      <meta property="og:title" content="BridgeFar!" />
      <meta property="og:image" content="${imageUrlForQuote}" />
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="${imageUrlForQuote}" />
      <meta name="fc:frame:post_url" content="${postUrlDetails}" />
      <meta name="fc:frame:button:1" content="Details" />
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
