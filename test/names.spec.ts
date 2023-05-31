import { JsonRpcProvider, Contract } from 'ethers'
import { listAbi, getPoisFromContract, l1Contracts } from '../src'

const timeout = 100000

const mainnet = new JsonRpcProvider('https://rpc.decentraland.org/mainnet?project=catalyst-contracts-ci')

describe('names denylist', () => {
  it(
    'mainnet',
    async () => {
      const contract = new Contract(l1Contracts.mainnet.nameDenylist, listAbi, mainnet)
      const denylist = await getPoisFromContract(contract as any)
      expect(denylist.length).toBeGreaterThan(1)
    },
    timeout
  )

  it(
    'goerli',
    async () => {
      const contract = new Contract(l1Contracts.goerli.nameDenylist, listAbi, mainnet)
      const denylist = await getPoisFromContract(contract as any)
      expect(denylist.length).toHaveLength(0)
    },
    timeout
  )
})
