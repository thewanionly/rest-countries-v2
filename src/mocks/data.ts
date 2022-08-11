import { Country, Region } from '../utilities/constants'

const mockedCountries: Country[] = [
  {
    name: {
      common: 'United States',
      official: 'United States of America',
      nativeName: {
        eng: {
          official: 'United States of America',
          common: 'United States'
        }
      }
    },
    cca2: 'US',
    capital: ['Washington, D.C.'],
    region: 'Americas',
    flags: {
      png: 'https://flagcdn.com/w320/us.png',
      svg: 'https://flagcdn.com/us.svg'
    },
    population: 329484123
  },
  {
    name: {
      common: 'United Kingdom',
      official: 'United Kingdom of Great Britain and Northern Ireland',
      nativeName: {
        eng: {
          official: 'United Kingdom of Great Britain and Northern Ireland',
          common: 'United Kingdom'
        }
      }
    },
    cca2: 'GB',
    capital: ['London'],
    region: 'Europe',
    flags: {
      png: 'https://flagcdn.com/w320/gb.png',
      svg: 'https://flagcdn.com/gb.svg'
    },
    population: 67215293
  },
  {
    name: {
      common: 'Australia',
      official: 'Commonwealth of Australia',
      nativeName: {
        eng: {
          official: 'Commonwealth of Australia',
          common: 'Australia'
        }
      }
    },
    cca2: 'AU',
    capital: ['Canberra'],
    region: 'Oceania',
    flags: {
      png: 'https://flagcdn.com/w320/au.png',
      svg: 'https://flagcdn.com/au.svg'
    },
    population: 25687041
  },
  {
    name: {
      common: 'New Zealand',
      official: 'New Zealand',
      nativeName: {
        eng: {
          official: 'New Zealand',
          common: 'New Zealand'
        },
        mri: {
          official: 'Aotearoa',
          common: 'Aotearoa'
        },
        nzs: {
          official: 'New Zealand',
          common: 'New Zealand'
        }
      }
    },
    cca2: 'NZ',
    capital: ['Wellington'],
    region: 'Oceania',
    flags: {
      png: 'https://flagcdn.com/w320/nz.png',
      svg: 'https://flagcdn.com/nz.svg'
    },
    population: 5084300
  },
  {
    name: {
      common: 'Japan',
      official: 'Japan',
      nativeName: {
        jpn: {
          official: '日本',
          common: '日本'
        }
      }
    },
    cca2: 'JP',
    capital: ['Tokyo'],
    region: 'Asia',
    flags: {
      png: 'https://flagcdn.com/w320/jp.png',
      svg: 'https://flagcdn.com/jp.svg'
    },
    population: 125836021
  },
  {
    name: {
      common: 'Philippines',
      official: 'Republic of the Philippines',
      nativeName: {
        eng: {
          official: 'Republic of the Philippines',
          common: 'Philippines'
        },
        fil: {
          official: 'Republic of the Philippines',
          common: 'Pilipinas'
        }
      }
    },
    cca2: 'PH',
    capital: ['Manila'],
    region: 'Asia',
    flags: {
      png: 'https://flagcdn.com/w320/ph.png',
      svg: 'https://flagcdn.com/ph.svg'
    },
    population: 109581085
  },
  {
    name: {
      common: 'Singapore',
      official: 'Republic of Singapore',
      nativeName: {
        zho: {
          official: '新加坡共和国',
          common: '新加坡'
        },
        eng: {
          official: 'Republic of Singapore',
          common: 'Singapore'
        },
        msa: {
          official: 'Republik Singapura',
          common: 'Singapura'
        },
        tam: {
          official: 'சிங்கப்பூர் குடியரசு',
          common: 'சிங்கப்பூர்'
        }
      }
    },
    cca2: 'SG',
    capital: ['Singapore'],
    region: 'Asia',
    flags: {
      png: 'https://flagcdn.com/w320/sg.png',
      svg: 'https://flagcdn.com/sg.svg'
    },
    population: 5685807
  },
  {
    name: {
      common: 'Morocco',
      official: 'Kingdom of Morocco',
      nativeName: {
        ara: {
          official: 'المملكة المغربية',
          common: 'المغرب'
        },
        ber: {
          official: 'ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ',
          common: 'ⵍⵎⴰⵖⵔⵉⴱ'
        }
      }
    },
    cca2: 'MA',
    capital: ['Rabat'],
    region: 'Africa',
    flags: {
      png: 'https://flagcdn.com/w320/ma.png',
      svg: 'https://flagcdn.com/ma.svg'
    },
    population: 36910558
  }
]

const mockedRegions: Region[] = [
  {
    region: 'Africa'
  },
  {
    region: 'Asia'
  },
  {
    region: 'Europe'
  },
  {
    region: 'Oceania'
  }
]

export { mockedCountries, mockedRegions }
