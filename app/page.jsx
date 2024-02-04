import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { Metadata } from 'next';


// Assumptions
// 1. Wallet Address linked to Farcaster 
// 2. Approval given to Socket



const postUrl = `${process.env['HOST']}/api/quote`;

export async function generateMetadata() {
  // const imageUrl = `${process.env['HOST']}/images/welcome.png`;
  const imageUrl = 'https://bridgefar.xyz/welcome.png';

  return {
    title: 'BridgeFar',
    description: 'One Click Swaps',
    openGraph: {
      title: 'BridgeFar',
      images: [imageUrl],
    },
    other: {
      'fc:frame': 'vNext',
      'fc:frame:image': imageUrl,
      'fc:frame:post_url': postUrl,
      'fc:frame:button:1': 'Get Quote',
      'fc:frame:button:1': 'Transfer',
      'fc:frame:input:text': 'Format: <amount> of <token> from <chain1> to <chain2>',
      // Transfer 0.1 USDC from 
      // Polygon (137: USDC: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174) to Base (8453: USDC: 0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)
    },
  };
}

export default function Home() {
  return (
    <div className="relative min-w-full min-h-screen flex flex-col items-center justify-center m-0 p-0">
      <Image
        src="/welcome.png"
        layout="fill"
        objectFit="cover"
        alt="Hero Image"
        priority
        className=" bg-black absolute w-full h-full"
      />
    </div>
  );
}
