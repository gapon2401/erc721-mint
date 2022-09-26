import React, { useContext, useRef, useState } from 'react'
import { JsonRpcSigner, Network, Web3Provider as W3P } from '@ethersproject/providers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

type Web3ProviderContext = {
  connected: boolean
  isConnecting: boolean
  connect: () => Promise<Omit<Web3ProviderContext, 'error' | 'reconnect' | 'connect'> | void>
  reconnect: () => Promise<void>
  disconnect: () => Promise<void>
  network?: Network
  provider?: W3P
  signer?: JsonRpcSigner
  chainId?: number
  accountId?: string
  error: string
}

type ProviderRpcError = Error & {
  code: number
  data?: unknown
}

const initialValues: Web3ProviderContext = {
  provider: undefined,
  signer: undefined,
  chainId: undefined,
  accountId: undefined,
  network: undefined,
  error: '',
  connected: false,
  isConnecting: false,
  connect: async () => {
    //
  },
  reconnect: async () => {
    //
  },
  disconnect: async () => {
    //
  },
}

const Web3Context = React.createContext(initialValues)

type Props = {
  children: React.ReactNode
  infuraUrl?: string
}
const Web3Provider: React.FC<Props> = ({ infuraUrl, children }) => {
  const web3Modal = useRef<null | Web3Modal>(null)

  /* Get web3modal instance */
  const getWeb3Modal = () => {
    if (web3Modal.current === null) {
      web3Modal.current = new Web3Modal({
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: infuraUrl || process.env.NEXT_PUBLIC_INFURA_URL,
            },
          },
        },
      })
      web3Modal.current?.on('error', (e: Error) => {
        if (e.message) {
          setWeb3Provider((prev) => ({
            ...prev,
            error: e.message,
          }))
        }
      })
    }

    return web3Modal.current
  }

  /* Reconnect to cached provider */
  const onWeb3ReConnect = async () => {
    const web3Modal = getWeb3Modal()
    setWeb3Provider((prev) => ({
      ...prev,
      isConnecting: !!web3Modal.cachedProvider,
    }))
    if (web3Modal.cachedProvider) {
      await onWeb3Connect()
    }
  }

  /* Disconnect */
  const onWeb3Disconnect = async (provider?: any) => {
    const web3Modal = getWeb3Modal()
    await web3Modal.clearCachedProvider()
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect()
    }
    setWeb3Provider((prev) => ({
      ...prev,
      provider: undefined,
      signer: undefined,
      connected: false,
    }))
  }

  const getProvider = async () => {
    const web3Modal = getWeb3Modal()
    const connection = await web3Modal.connect()
    return new ethers.providers.Web3Provider(connection)
  }

  /* Connect */
  const onWeb3Connect = async () => {
    try {
      const provider = await getProvider()
      await subscribeProvider(provider)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()
      const accountId = await signer.getAddress()

      const updateData = {
        disconnect: async () => {
          await onWeb3Disconnect(provider)
        },
        provider,
        signer,
        network,
        isConnecting: false,
        chainId: network.chainId,
        accountId: accountId,
        connected: !!(provider && accountId),
      }

      setWeb3Provider((prev) => ({
        ...prev,
        ...updateData,
      }))

      return updateData
    } catch (e) {
      console.log(e)
    }
    return web3Provider
  }

  const [web3Provider, setWeb3Provider] = useState<Web3ProviderContext>({
    ...initialValues,
    connect: onWeb3Connect,
    reconnect: onWeb3ReConnect,
    disconnect: onWeb3Disconnect,
  })

  const subscribeProvider = async (provider: any) => {
    if (!provider.provider || !provider.provider.on) {
      return
    }
    provider.provider.on('accountsChanged', async (accounts: string[]) => {
      if (accounts.length === 0) {
        window.location.reload()
      } else {
        const provider = await getProvider()
        const network = await provider.getNetwork()
        const signer = await provider.getSigner()

        setWeb3Provider((prev) => ({
          ...prev,
          provider,
          signer,
          network,
          chainId: network.chainId,
          accountId: accounts[0],
        }))
      }
    })
    provider.provider.on('chainChanged', async (chainId: number) => {
      const provider = await getProvider()
      const network = await provider.getNetwork()
      const signer = await provider.getSigner()
      const accountId = await signer.getAddress()
      setWeb3Provider((prev) => ({
        ...prev,
        chainId,
        provider,
        signer,
        network,
        accountId,
      }))
    })
    provider.provider.on('disconnect', async (error: ProviderRpcError) => {
      console.log(error)
      await onWeb3Disconnect(provider)
    })
    provider.provider.on('error', async (error: ProviderRpcError) => {
      console.log(error)
      await onWeb3Disconnect(provider)
    })
  }

  return <Web3Context.Provider value={web3Provider}>{children}</Web3Context.Provider>
}

export const useWeb3 = (): Web3ProviderContext => {
  return useContext(Web3Context)
}

export default Web3Provider
