export type CatalystByIdResult = {
  id: string
  owner: string
  domain: string
}

export type CatalystServerInfo = {
  address: string
  owner: string
  id: string
}

export type CatalystContract = {
  catalystCount(): Promise<number>
  catalystIds(i: number): Promise<string>
  catalystById(id: string): Promise<CatalystByIdResult>
}

type ListContract = {
  size(): Promise<number>
  get(i: number): Promise<string>
}

export type PoiContract = ListContract
export type NameDenylistContract = ListContract

export async function getCatalystServersFromDAO(contract: CatalystContract): Promise<CatalystServerInfo[]> {
  const nodes: CatalystServerInfo[] = []
  for (let i = 0; i < (await contract.catalystCount()); i++) {
    const record = await contract.catalystById(await contract.catalystIds(i))
    const { id, owner, domain } = record
    if (domain.startsWith('http://')) {
      console.warn('Catalyst node address using http protocol, skipping')
      continue
    }

    let address = domain

    if (!address.startsWith('https://')) {
      address = 'https://' + address
    }

    // trim url in case it starts/ends with a blank
    address = address.trim()

    nodes.push({
      address,
      owner,
      id
    })
  }

  return nodes
}

export async function getPoiFromContract(contract: PoiContract): Promise<string[]> {
  const count = await contract.size()

  const pois: Promise<string>[] = []
  for (let i = 0; i < count; i++) {
    pois.push(contract.get(i))
  }

  return Promise.all(pois)
}

export async function getNameDenylistFromContract(contract: NameDenylistContract): Promise<string[]> {
  const count = await contract.size()

  const denylist: Promise<string>[] = []
  for (let i = 0; i < count; i++) {
    denylist.push(contract.get(i))
  }

  return Promise.all(denylist)
}
