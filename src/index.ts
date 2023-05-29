export const l1Contracts = {
  goerli: {
    registrar: '0x6b8da2752827cf926215b43bb8E46Fd7b9dDac35',
    landContract: '0x25b6B4bac4aDB582a0ABd475439dA6730777Fbf7',
    stateContract: '0xC9A46712E6913c24d15b46fF12221a79c4e251DC',
    nameDenylist: '0x71c84760df0537f7db286274817462dc2e6c1366',
    catalysts: '0x380e46851c47b73b6aa9bea50cf3b50e2cf637cf'
  },
  mainnet: {
    registrar: '0x2a187453064356c898cae034eaed119e1663acb8',
    landContract: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
    stateContract: '0x959e104e1a4db6317fa58f8295f586e1a978c297',
    nameDenylist: '0x0c4c90a4f29872a2e9ef4c4be3d419792bca9a36',
    catalysts: '0x4a2f10076101650f40342885b99b6b101d83c486'
  }
}

export const l2Contracts = {
  mumbai: {
    thirdParty: '0xEDf516F2D42A47F9cE0B145Fe0dbB76975379889',
    factories: [
      { address: '0x2A72Ec4241Ac4fBc915ae98aC5a5b01AdE721f4B', sinceBlock: 14517381 },
      { address: '0xDDb3781Fff645325C8896AA1F067bAa381607ecc', sinceBlock: 26012021 }
    ],
    commitees: [
      { address: '0x4bb5ACe5ceB3Dd51ea35fa01a8f9B5507c234270', sinceBlock: 14517376 },
      { address: '0xe18B1361d41afC44658216F3Dc27e48c2336e3c2', sinceBlock: 18881998 }
    ],
    poi: '0x08E5a5288D6bBa9383724C57175C03A37fe83A2A'
  },
  polygon: {
    thirdParty: '0x1C436C1EFb4608dFfDC8bace99d2B03c314f3348',
    factories: [
      {
        address: '0xB549B2442b2BD0a53795BC5cDcBFE0cAF7ACA9f8',
        sinceBlock: 15202563
      },
      {
        address: '0x3195e88aE10704b359764CB38e429D24f1c2f781',
        sinceBlock: 28121692
      }
    ],
    commitees: [
      { address: '0x71d9350Ef44E1e451F00e447C0DfF2d1FB75510a', sinceBlock: 15202559 },
      { address: '0xaeec95a8aa671a6d3fec56594827d7804964fa70', sinceBlock: 19585299 }
    ],
    poi: '0xFEC09d5C192aaf7Ec7E2C89Cc8D3224138391B2E'
  }
}
