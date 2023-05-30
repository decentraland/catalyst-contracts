import { JsonRpcProvider, Provider, Contract } from 'ethers'
import {
  catalystAbi,
  listAbi,
  CatalystByIdResult,
  CatalystContract,
  getCatalystServersFromDAO,
  getPoiFromContract,
  l1Contracts,
  l2Contracts
} from '../src'

const timeout = 100000

const mainnet = new JsonRpcProvider('https://rpc.decentraland.org/mainnet?project=catalyst-contracts-ci')
const goerli = new JsonRpcProvider('https://rpc.decentraland.org/goerli?project=catalyst-contracts-ci')
const polygon = new JsonRpcProvider('https://rpc.decentraland.org/polygon?project=catalyst-contracts-ci')
const mumbai = new JsonRpcProvider('https://rpc.decentraland.org/mumbai?project=catalyst-contracts-ci')

describe('all tests', () => {
  describe('server list', () => {
    function createContract(address: string, provider: Provider): CatalystContract {
      const contract = new Contract(address, catalystAbi, provider)
      return {
        async catalystCount(): Promise<number> {
          return contract.catalystCount()
        },
        async catalystIds(i: number): Promise<string> {
          return contract.catalystIds(i)
        },
        async catalystById(catalystId: string): Promise<CatalystByIdResult> {
          const [id, owner, domain] = await contract.catalystById(catalystId)
          return { id, owner, domain }
        }
      }
    }

    it(
      'mainnet',
      async () => {
        const contract = createContract(l1Contracts['mainnet'].catalysts, mainnet)
        const servers = await getCatalystServersFromDAO(contract)
        expect(servers).toHaveLength(11)
        const addresses = new Set(servers.map((s) => s.address))
        expect(addresses).toContain('https://peer-ec1.decentraland.org')
        expect(addresses).toContain('https://peer-ec2.decentraland.org')
      },
      timeout
    )

    it(
      'goerli',
      async () => {
        const contract = createContract(l1Contracts['goerli'].catalysts, goerli)
        const servers = await getCatalystServersFromDAO(contract)
        expect(servers).toHaveLength(3)
        const addresses = new Set(servers.map((s) => s.address))
        expect(addresses).toContain('https://peer-ap1.decentraland.zone')
        expect(addresses).toContain('https://peer.decentraland.zone')
      },
      timeout
    )
  })

  describe('poi list', () => {
    it(
      'polygon',
      async () => {
        const contract = new Contract(l2Contracts['polygon'].poi, listAbi, polygon)
        const pois = await getPoiFromContract(contract as any)
        expect(pois.length).toBeGreaterThan(1)
      },
      timeout
    )

    it(
      'mumbai',
      async () => {
        const contract = new Contract(l2Contracts['mumbai'].poi, listAbi, mumbai)
        const pois = await getPoiFromContract(contract as any)
        expect(pois.length).toBeGreaterThan(1)
      },
      timeout
    )
  })

  describe('names denylist', () => {
    it(
      'mainnet',
      async () => {
        const contract = new Contract(l1Contracts['mainnet'].nameDenylist, listAbi, mainnet)
        const denylist = await getPoiFromContract(contract as any)
        expect(denylist.length).toBeGreaterThan(1)
      },
      timeout
    )

    it(
      'goerli',
      async () => {
        const contract = new Contract(l1Contracts['goerli'].nameDenylist, listAbi, goerli)
        const denylist = await getPoiFromContract(contract as any)
        expect(denylist.length).toBeGreaterThan(1)
      },
      timeout
    )
  })
})
