export const checkerAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        internalType: 'contract ILAND',
        name: '_land',
        type: 'address'
      },
      {
        internalType: 'contract IEstate',
        name: '_estate',
        type: 'address'
      },
      {
        internalType: 'int256',
        name: '_x',
        type: 'int256'
      },
      {
        internalType: 'int256',
        name: '_y',
        type: 'int256'
      }
    ],
    name: 'checkLAND',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        internalType: 'contract IDCLRegistrar',
        name: '_registrar',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string'
      }
    ],
    name: 'checkName',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]'
      }
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'results',
        type: 'bool[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IThirdPartyRegistry',
        name: '_tpRegistry',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_tpId',
        type: 'string'
      },
      {
        internalType: 'bytes32',
        name: '_root',
        type: 'bytes32'
      }
    ],
    name: 'validateThirdParty',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        internalType: 'contract ICollectionFactory[]',
        name: '_factories',
        type: 'address[]'
      },
      {
        internalType: 'contract ICollection',
        name: '_collection',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '_contentHash',
        type: 'string'
      },
      {
        internalType: 'contract ICommittee[]',
        name: '_committees',
        type: 'address[]'
      }
    ],
    name: 'validateWearables',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]
