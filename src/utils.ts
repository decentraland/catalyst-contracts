import RequestManager, { ContractFactory } from 'eth-connect'
import {
  CatalystContract,
  catalystDeployments,
  catalystAbiItems
} from './CatalystAbi'
import {
  listAbiItems,
  denylistNamesDeployments,
  ListContract,
  poiDeployments
} from './ListAbi'

// eslint-disable-next-line
export async function nameDenylistForProvider(ethereumProvider: any): Promise<ListContract | undefined> {
  const rm = new RequestManager(ethereumProvider)
  const networkId = (await rm.net_version()).toString()

  if (!(networkId in denylistNamesDeployments))
    throw new Error(
      `There is no deployed NameDenylist contract for networkId=${networkId}`
    )

  try {
    const contractAddress = denylistNamesDeployments[networkId]

    return (await new ContractFactory(rm, listAbiItems).at(
      contractAddress
    )) as any as ListContract
  } catch (error) {
    return undefined
  }
}

// eslint-disable-next-line
export async function poiListForProvider(ethereumProvider: any): Promise<ListContract | undefined> {
  const rm = new RequestManager(ethereumProvider)
  const networkId = (await rm.net_version()).toString()

  if (!(networkId in poiDeployments))
    throw new Error(
      `There is no deployed PoiDenylist contract for networkId=${networkId}`
    )

  try {
    const contractAddress = poiDeployments[networkId]

    return (await new ContractFactory(rm, listAbiItems).at(
      contractAddress
    )) as any as ListContract
  } catch (error) {
    return undefined
  }
}

// eslint-disable-next-line
export async function catalystRegistryForProvider(ethereumProvider: any): Promise<CatalystContract | undefined> {
  const rm = new RequestManager(ethereumProvider)
  const networkId = (await rm.net_version()).toString()

  if (!(networkId in catalystDeployments))
    throw new Error(
      `There is no deployed CatalystProxy contract for networkId=${networkId}`
    )

  try {
    const contractAddress = catalystDeployments[networkId]

    return (await new ContractFactory(rm, catalystAbiItems).at(
      contractAddress
    )) as any as CatalystContract
  } catch (error) {
    return undefined
  }
}
