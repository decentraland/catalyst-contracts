import { JsonRpcProvider, Contract } from 'ethers'
import { listAbi, getPoisFromContract, l2Contracts } from '../src'

const timeout = 100000

const polygon = new JsonRpcProvider('https://rpc.decentraland.org/polygon?project=catalyst-contracts-ci')
const mumbai = new JsonRpcProvider('https://rpc.decentraland.org/mumbai?project=catalyst-contracts-ci')

describe('poi list', () => {
  it(
    'polygon',
    async () => {
      const contract = new Contract(l2Contracts['polygon'].poi, listAbi, polygon)
      const pois = await getPoisFromContract(contract as any)
      expect(pois.length).toBeGreaterThan(1)
    },
    timeout
  )

  it(
    'mumbai',
    async () => {
      const contract = new Contract(l2Contracts['mumbai'].poi, listAbi, mumbai)
      const pois = await getPoisFromContract(contract as any)
      expect(pois.length).toBeGreaterThan(1)
    },
    timeout
  )
})
