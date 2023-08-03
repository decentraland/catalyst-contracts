import { Contract, HTTPProvider, RPCSendableMessage, toBatchPayload, toData } from 'eth-connect'

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

export async function getCatalystServersFromDAO(contract: any): Promise<CatalystServerInfo[]> {
  const catalystCount = parseInt(await contract.catalystCount())
  const catalystIds = (
    await sendBatch(
      contract.requestManager.provider,
      await Promise.all([...Array(catalystCount).keys()].map((_, index) => contract.catalystIds.toRPCMessage(index)))
    )
  )
    .filter((r: any) => !!r.result)
    .map((r: any) => {
      const data = toData(r.result)
      return contract.catalystIds.unpackOutput(data)
    })

  const catalystDomains = (
    await sendBatch(
      contract.requestManager.provider,
      await Promise.all(catalystIds.map((catalystId: string) => contract.catalystById.toRPCMessage(catalystId)))
    )
  )
    .filter((r: any) => !!r.result)
    .map((r: any): CatalystByIdResult => {
      const data = toData(r.result)
      const unpackOutput = contract.catalystById.unpackOutput(data)
      return { owner: unpackOutput.owner, id: unpackOutput.id, domain: unpackOutput.address }
    })

  return catalystDomains
    .filter((catalystDomain: CatalystByIdResult) => {
      const isHttp = catalystDomain.domain.startsWith('http://')
      if (isHttp) {
        console.warn('Catalyst node address using http protocol, skipping')
      }
      return !isHttp
    })
    .map((catalystDomain: any) => {
      let address = catalystDomain.domain

      if (!address.startsWith('https://')) {
        address = 'https://' + address
      }

      // trim url in case it starts/ends with a blank
      address = address.trim()
      return {
        address,
        owner: catalystDomain.owner,
        id: catalystDomain.id
      }
    })
}

async function getValuesFromListContract(contract: any): Promise<string[]> {
  const count = parseInt(await contract.size())

  const batch: RPCSendableMessage[] = await Promise.all(
    [...Array(count).keys()].map((_, index) => contract.get.toRPCMessage(index))
  )
  const result = await sendBatch(contract.requestManager.provider, batch)
  return result.map((r: any) => {
    if (!r.result) {
      return 0
    }
    const data = toData(r.result)
    return contract.get.unpackOutput(data)
  })
}

export function getPoisFromContract(contract: Contract): Promise<string[]> {
  return getValuesFromListContract(contract)
}

export function getNameDenylistFromContract(contract: Contract): Promise<string[]> {
  return getValuesFromListContract(contract)
}

function sendBatch(provider: HTTPProvider, batch: RPCSendableMessage[]) {
  const payload = toBatchPayload(batch)
  return new Promise<any>((resolve, reject) => {
    provider.sendAsync(payload as any, (err: any, result: any) => {
      if (err) {
        reject(err)
        return
      }

      resolve(result)
    })
  })
}
