import { JsonRpcProvider, Provider, Contract } from 'ethers'
import { catalystAbi, CatalystByIdResult, CatalystContract, getCatalystServersFromDAO, l1Contracts } from '../src'

const timeout = 100000

const mainnet = new JsonRpcProvider('https://rpc.decentraland.org/mainnet?project=catalyst-contracts-ci')
const goerli = new JsonRpcProvider('https://rpc.decentraland.org/goerli?project=catalyst-contracts-ci')

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
      const contract = createContract(l1Contracts.mainnet.catalyst, mainnet)
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
      const contract = createContract(l1Contracts.goerli.catalyst, goerli)
      const servers = await getCatalystServersFromDAO(contract)
      expect(servers).toHaveLength(3)
      const addresses = new Set(servers.map((s) => s.address))
      expect(addresses).toContain('https://peer-ap1.decentraland.zone')
      expect(addresses).toContain('https://peer.decentraland.zone')
    },
    timeout
  )
})
