import { createConfig } from '@ponder/core'
import { http } from 'viem'

import { STPv1FactoryAbi } from './abis/STPv1FactoryAbi'
import { STPv1Abi } from './abis/STPv1Abi'

const factoryDeployments = {
  mainnet: {
    address: '0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6',
    startBlock: 18430200,
  },
  optimism: {
    address: '0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A',
    startBlock: 111939833,
  },
  base: {
    address: '0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180',
    startBlock: 6338113,
  },
} as const

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      transport: http(process.env.MAINNET_RPC),
    },
    optimism: {
      chainId: 10,
      transport: http(process.env.OPTIMISM_RPC),
    },
    base: {
      chainId: 8453,
      transport: http(process.env.BASE_RPC),
    },
  },
  contracts: {
    STPv1Factory: {
      abi: STPv1FactoryAbi,
      network: {
        mainnet: {
          address: factoryDeployments.mainnet.address,
          startBlock: factoryDeployments.mainnet.startBlock,
        },
        optimism: {
          address: factoryDeployments.optimism.address,
          startBlock: factoryDeployments.optimism.startBlock,
        },
        base: {
          address: factoryDeployments.base.address,
          startBlock: factoryDeployments.base.startBlock,
        },
      },
    },
    STPv1: {
      abi: STPv1Abi,
      network: {
        mainnet: {
          factory: {
            address: factoryDeployments.mainnet.address,
            event: STPv1FactoryAbi[3],
            parameter: 'deployment',
          },
          startBlock: factoryDeployments.mainnet.startBlock,
        },
        optimism: {
          factory: {
            address: factoryDeployments.optimism.address,
            event: STPv1FactoryAbi[3],
            parameter: 'deployment',
          },
          startBlock: factoryDeployments.optimism.startBlock,
        },
        base: {
          factory: {
            address: factoryDeployments.base.address,
            event: STPv1FactoryAbi[3],
            parameter: 'deployment',
          },
          startBlock: factoryDeployments.base.startBlock,
        },
      },
    },
  },
})
