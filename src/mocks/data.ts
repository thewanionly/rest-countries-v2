import { Country, CountryDetail, Region } from '../utilities/constants'

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
    cca3: 'USA',
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
    cca3: 'GBR',
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
    cca3: 'AUS',
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
    cca3: 'NZL',
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
    cca3: 'JPN',
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
    cca3: 'PHL',
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
    cca3: 'SGP',
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
    cca3: 'MAR',
    capital: ['Rabat'],
    region: 'Africa',
    flags: {
      png: 'https://flagcdn.com/w320/ma.png',
      svg: 'https://flagcdn.com/ma.svg'
    },
    population: 36910558
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ca.png',
      svg: 'https://flagcdn.com/ca.svg'
    },
    name: {
      common: 'Canada',
      official: 'Canada',
      nativeName: {
        eng: {
          official: 'Canada',
          common: 'Canada'
        },
        fra: {
          official: 'Canada',
          common: 'Canada'
        }
      }
    },
    cca2: 'CA',
    cca3: 'CAN',
    capital: ['Ottawa'],
    region: 'Americas',
    population: 38005238
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/mx.png',
      svg: 'https://flagcdn.com/mx.svg'
    },
    name: {
      common: 'Mexico',
      official: 'United Mexican States',
      nativeName: {
        spa: {
          official: 'Estados Unidos Mexicanos',
          common: 'México'
        }
      }
    },
    cca2: 'MX',
    cca3: 'MEX',
    capital: ['Mexico City'],
    region: 'Americas',
    population: 128932753
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

const mockedCountryDetail: CountryDetail = {
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
  cca3: 'USA',
  capital: ['Washington, D.C.'],
  region: 'Americas',
  flags: {
    png: 'https://flagcdn.com/w320/us.png',
    svg: 'https://flagcdn.com/us.svg'
  },
  population: 329484123,
  tld: ['.us'],
  currencies: {
    USD: {
      name: 'United States dollar',
      symbol: '$'
    }
  },
  languages: {
    eng: 'English'
  },
  borders: ['CAN', 'MEX'],
  subregion: 'North America'
}

export { mockedCountries, mockedCountryDetail, mockedRegions }
