export const checkerContracts = {
  goerli: '0xe69DD486AC000186Af573361Fb454Bbbb85AdD85',
  mainnet: '0x49fd6E40548A67a3FB9cA4fE22ab87885ba10454',
  mumbai: '0x98B6b187163657a4b19e40d7BB911584d9c96198',
  polygon: '0x5699A7d45E59147D72Eb79B57df7343315b03dFD'
}

export const landContracts = {
  goerli: {
    landContractAddress: '0x25b6B4bac4aDB582a0ABd475439dA6730777Fbf7',
    stateContractAddress: '0xC9A46712E6913c24d15b46fF12221a79c4e251DC'
  },
  mainnet: {
    landContractAddress: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
    stateContractAddress: '0x959e104e1a4db6317fa58f8295f586e1a978c297'
  }
}

export const collectionFactoryContracts = {
  mumbai: {
    v2: '0x2A72Ec4241Ac4fBc915ae98aC5a5b01AdE721f4B',
    v3: '0xDDb3781Fff645325C8896AA1F067bAa381607ecc'
  },
  polygon: {
    v2: '0xB549B2442b2BD0a53795BC5cDcBFE0cAF7ACA9f8',
    v3: '0x3195e88aE10704b359764CB38e429D24f1c2f781'
  }
}

export const checkerAbi = [
  {
    inputs: [
      { internalType: 'address', name: '_sender', type: 'address' },
      { internalType: 'contract INFT', name: '_land', type: 'address' },
      { internalType: 'contract INFT', name: '_estate', type: 'address' },
      { internalType: 'int256', name: '_x', type: 'int256' },
      { internalType: 'int256', name: '_y', type: 'int256' }
    ],
    name: 'checkLAND',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_sender', type: 'address' },
      { internalType: 'contract IDCLRegistrar', name: '_registrar', type: 'address' },
      { internalType: 'string', name: '_name', type: 'string' }
    ],
    name: 'checkName',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_sender', type: 'address' },
      { internalType: 'contract ITPRegistry', name: '_tpRegistry', type: 'address' },
      { internalType: 'string', name: '_tpId', type: 'string' },
      { internalType: 'bytes32', name: '_root', type: 'bytes32' }
    ],
    name: 'validateThirdParty',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_sender', type: 'address' },
      { internalType: 'contract ICollection[]', name: '_factories', type: 'address[]' },
      { internalType: 'contract ICollection', name: '_collection', type: 'address' },
      { internalType: 'uint256', name: '_itemId', type: 'uint256' },
      { internalType: 'string', name: '_contentHash', type: 'string' }
    ],
    name: 'validateWearables',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  }
]
