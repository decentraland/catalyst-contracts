import RequestManager, { Contract, ContractFactory, HTTPProvider } from 'eth-connect'
import {
  catalystAbi,
  getCatalystServersFromDAO,
  getNameDenylistFromContract,
  getPoisFromContract,
  l1Contracts,
  l2Contracts,
  listAbi
} from '../src'
import { createFetchComponent } from '@well-known-components/fetch-component'

const timeout = 100000

describe('e2e', () => {
  let mainnet: HTTPProvider
  let goerli: HTTPProvider
  let sepolia: HTTPProvider
  let polygon: HTTPProvider
  let mumbai: HTTPProvider

  beforeAll(async () => {
    const fetch = createFetchComponent()
    const opts = { fetch: fetch.fetch }
    mainnet = new HTTPProvider('https://rpc.decentraland.org/mainnet?project=catalyst-contracts-ci', opts)
    goerli = new HTTPProvider('https://rpc.decentraland.org/goerli?project=catalyst-contracts-ci', opts)
    sepolia = new HTTPProvider('https://rpc.decentraland.org/sepolia?project=catalyst-contracts-ci', opts)
    polygon = new HTTPProvider('https://rpc.decentraland.org/polygon?project=catalyst-contracts-ci', opts)
    mumbai = new HTTPProvider('https://rpc.decentraland.org/mumbai?project=catalyst-contracts-ci', opts)
  })

  describe('names denylist', () => {
    async function createContract(address: string, provider: HTTPProvider): Promise<Contract> {
      const requestManager = new RequestManager(provider)
      const factory = new ContractFactory(requestManager, listAbi)
      return (await factory.at(address)) as any
    }

    it(
      'mainnet',
      async () => {
        const contract = await createContract(l1Contracts.mainnet.nameDenylist, mainnet)
        const denylist = await getNameDenylistFromContract(contract)
        expect(denylist.length).toBeGreaterThan(1)
      },
      timeout
    )

    it(
      'goerli',
      async () => {
        const contract = await createContract(l1Contracts.goerli.nameDenylist, goerli)
        const denylist = await getNameDenylistFromContract(contract)
        expect(denylist).toHaveLength(0)
      },
      timeout
    )

    it(
      'sepolia',
      async () => {
        const contract = await createContract(l1Contracts.sepolia.nameDenylist, sepolia)
        const denylist = await getNameDenylistFromContract(contract)
        expect(denylist.length).toBeGreaterThanOrEqual(1)
        expect(denylist).toContain('banned')
      },
      timeout
    )
  })

  describe('poi list', () => {
    async function createContract(address: string, provider: HTTPProvider): Promise<Contract> {
      const requestManager = new RequestManager(provider)
      const factory = new ContractFactory(requestManager, listAbi)
      return (await factory.at(address)) as any
    }

    it(
      'polygon',
      async () => {
        const contract = await createContract(l2Contracts.polygon.poi, polygon)
        const pois = await getPoisFromContract(contract)
        expect(pois.length).toBeGreaterThan(1)
      },
      timeout
    )

    it(
      'mumbai',
      async () => {
        const contract = await createContract(l2Contracts.mumbai.poi, mumbai)
        const pois = await getPoisFromContract(contract)
        expect(pois.length).toBeGreaterThan(1)
      },
      timeout
    )
  })

  describe('server list', () => {
    async function createContract(address: string, provider: HTTPProvider): Promise<Contract> {
      const requestManager = new RequestManager(provider)
      const factory = new ContractFactory(requestManager, catalystAbi)
      return (await factory.at(address)) as any
    }

    it(
      'mainnet',
      async () => {
        const contract = await createContract(l1Contracts.mainnet.catalyst, mainnet)
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
        const contract = await createContract(l1Contracts.goerli.catalyst, goerli)
        const servers = await getCatalystServersFromDAO(contract)
        expect(servers).toHaveLength(0)
      },
      timeout
    )

    it(
      'sepolia',
      async () => {
        const contract = await createContract(l1Contracts.sepolia.catalyst, sepolia)
        const servers = await getCatalystServersFromDAO(contract)
        expect(servers).toHaveLength(3)
        const addresses = new Set(servers.map((s) => s.address))
        expect(addresses).toContain('https://peer-ap1.decentraland.zone')
        expect(addresses).toContain('https://peer.decentraland.zone')
      },
      timeout
    )
  })
})
