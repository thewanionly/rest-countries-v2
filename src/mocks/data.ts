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
    flag: '🇺🇸',
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
    flag: '🇬🇧',
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
    flag: '🇦🇺',
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
    flag: '🇳🇿',
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
    flag: '🇯🇵',
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
    flag: '🇵🇭',
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
    flag: '🇸🇬',
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
    flag: '🇲🇦',
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
    region: 'Americas'
  }
]

export { mockedCountries, mockedRegions }
