import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatTimestamp(timestamp: string) {
  const date = new Date(parseInt(timestamp) * 1000)

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}

export function formatChain(chainId: number) {
  switch (chainId) {
    case 1:
      return 'Ethereum'
    case 8453:
      return 'Base'
    case 10:
      return 'OP Mainnet'
    default:
      return 'Unknown'
  }
}
