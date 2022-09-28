import React, { Suspense } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Home: NextPage = () => {
  const DynamicMintForm = dynamic(() => import('@/components/MintForm'), {
    suspense: true,
  })

  return (
    <>
      <header className='page-header' role='banner'>
        <Head>
          <title>Mint with WalletConnect + Web3Modal</title>
          <meta name='description' content='Mint ERC-721 (NFT) with WallectConnect and Web3Modal' />
          <link rel='icon' href='./favicon.png' />
        </Head>
        <h1 className='project-name'>Mint with WalletConnect + Web3Modal</h1>
        <h2 className='project-tagline'>
          Demo page, which shows how to mint erc-721 (NFT) token with{' '}
          <a href={'https://www.npmjs.com/package/ethers'} title={'ethers'}>
            ethers
          </a>{' '}
          +{' '}
          <a href={'https://www.npmjs.com/package/@walletconnect/web3-provider'} title={'walletconnect'}>
            walletconnect
          </a>{' '}
          +{' '}
          <a href={'https://www.npmjs.com/package/web3modal'} title={'web3modal'}>
            web3modal
          </a>
        </h2>
        <a href='https://github.com/gapon2401/erc721-mint' className='btn'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E"
            alt={'Github'}
          />
          {` `}View on GitHub
        </a>
      </header>
      <main className={'main-content'} role={'main'}>
        <Suspense fallback={`Loading...`}>
          <DynamicMintForm />
        </Suspense>
      </main>
    </>
  )
}

export default Home
