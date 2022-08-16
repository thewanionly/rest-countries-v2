import { Country, CountryDetail, Region } from 'utilities/constants'

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
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/fr.png',
      svg: 'https://flagcdn.com/fr.svg'
    },
    name: {
      common: 'France',
      official: 'French Republic',
      nativeName: {
        fra: {
          official: 'République française',
          common: 'France'
        }
      }
    },
    cca2: 'FR',
    cca3: 'FRA',
    capital: ['Paris'],
    region: 'Europe',
    population: 67391582
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/cf.png',
      svg: 'https://flagcdn.com/cf.svg'
    },
    name: {
      common: 'Central African Republic',
      official: 'Central African Republic',
      nativeName: {
        fra: {
          official: 'République centrafricaine',
          common: 'République centrafricaine'
        },
        sag: {
          official: 'Ködörösêse tî Bêafrîka',
          common: 'Bêafrîka'
        }
      }
    },
    cca2: 'CF',
    cca3: 'CAF',
    capital: ['Bangui'],
    region: 'Africa',
    population: 4829764
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/is.png',
      svg: 'https://flagcdn.com/is.svg'
    },
    name: {
      common: 'Iceland',
      official: 'Iceland',
      nativeName: {
        isl: {
          official: 'Ísland',
          common: 'Ísland'
        }
      }
    },
    cca2: 'IS',
    cca3: 'ISL',
    capital: ['Reykjavik'],
    region: 'Europe',
    population: 366425
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/np.png',
      svg: 'https://flagcdn.com/np.svg'
    },
    name: {
      common: 'Nepal',
      official: 'Federal Democratic Republic of Nepal',
      nativeName: {
        nep: {
          official: 'नेपाल संघीय लोकतान्त्रिक गणतन्त्र',
          common: 'नेपाल'
        }
      }
    },
    cca2: 'NP',
    cca3: 'NPL',
    capital: ['Kathmandu'],
    region: 'Asia',
    population: 29136808
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/gh.png',
      svg: 'https://flagcdn.com/gh.svg'
    },
    name: {
      common: 'Ghana',
      official: 'Republic of Ghana',
      nativeName: {
        eng: {
          official: 'Republic of Ghana',
          common: 'Ghana'
        }
      }
    },
    cca2: 'GH',
    cca3: 'GHA',
    capital: ['Accra'],
    region: 'Africa',
    population: 31072945
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/iq.png',
      svg: 'https://flagcdn.com/iq.svg'
    },
    name: {
      common: 'Iraq',
      official: 'Republic of Iraq',
      nativeName: {
        ara: {
          official: 'جمهورية العراق',
          common: 'العراق'
        },
        arc: {
          official: 'ܩܘܼܛܢܵܐ ܐܝܼܪܲܩ',
          common: 'ܩܘܼܛܢܵܐ'
        },
        ckb: {
          official: 'کۆماری عێراق',
          common: 'کۆماری'
        }
      }
    },
    cca2: 'IQ',
    cca3: 'IRQ',
    capital: ['Baghdad'],
    region: 'Asia',
    population: 40222503
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/th.png',
      svg: 'https://flagcdn.com/th.svg'
    },
    name: {
      common: 'Thailand',
      official: 'Kingdom of Thailand',
      nativeName: {
        tha: {
          official: 'ราชอาณาจักรไทย',
          common: 'ประเทศไทย'
        }
      }
    },
    cca2: 'TH',
    cca3: 'THA',
    capital: ['Bangkok'],
    region: 'Asia',
    population: 69799978
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/dk.png',
      svg: 'https://flagcdn.com/dk.svg'
    },
    name: {
      common: 'Denmark',
      official: 'Kingdom of Denmark',
      nativeName: {
        dan: {
          official: 'Kongeriget Danmark',
          common: 'Danmark'
        }
      }
    },
    cca2: 'DK',
    cca3: 'DNK',
    capital: ['Copenhagen'],
    region: 'Europe',
    population: 5831404
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/rs.png',
      svg: 'https://flagcdn.com/rs.svg'
    },
    name: {
      common: 'Serbia',
      official: 'Republic of Serbia',
      nativeName: {
        srp: {
          official: 'Република Србија',
          common: 'Србија'
        }
      }
    },
    cca2: 'RS',
    cca3: 'SRB',
    capital: ['Belgrade'],
    region: 'Europe',
    population: 6908224
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/ug.png',
      svg: 'https://flagcdn.com/ug.svg'
    },
    name: {
      common: 'Uganda',
      official: 'Republic of Uganda',
      nativeName: {
        eng: {
          official: 'Republic of Uganda',
          common: 'Uganda'
        },
        swa: {
          official: 'Republic of Uganda',
          common: 'Uganda'
        }
      }
    },
    cca2: 'UG',
    cca3: 'UGA',
    capital: ['Kampala'],
    region: 'Africa',
    population: 45741000
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/cc.png',
      svg: 'https://flagcdn.com/cc.svg'
    },
    name: {
      common: 'Cocos (Keeling) Islands',
      official: 'Territory of the Cocos (Keeling) Islands',
      nativeName: {
        eng: {
          official: 'Territory of the Cocos (Keeling) Islands',
          common: 'Cocos (Keeling) Islands'
        }
      }
    },
    cca2: 'CC',
    cca3: 'CCK',
    capital: ['West Island'],
    region: 'Oceania',
    population: 544
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/me.png',
      svg: 'https://flagcdn.com/me.svg'
    },
    name: {
      common: 'Montenegro',
      official: 'Montenegro',
      nativeName: {
        cnr: {
          official: 'Црна Гора',
          common: 'Црна Гора'
        }
      }
    },
    cca2: 'ME',
    cca3: 'MNE',
    capital: ['Podgorica'],
    region: 'Europe',
    population: 621718
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/sa.png',
      svg: 'https://flagcdn.com/sa.svg'
    },
    name: {
      common: 'Saudi Arabia',
      official: 'Kingdom of Saudi Arabia',
      nativeName: {
        ara: {
          official: 'المملكة العربية السعودية',
          common: 'العربية السعودية'
        }
      }
    },
    cca2: 'SA',
    cca3: 'SAU',
    capital: ['Riyadh'],
    region: 'Asia',
    population: 34813867
  },
  {
    flags: {
      png: 'https://flagcdn.com/w320/jo.png',
      svg: 'https://flagcdn.com/jo.svg'
    },
    name: {
      common: 'Jordan',
      official: 'Hashemite Kingdom of Jordan',
      nativeName: {
        ara: {
          official: 'المملكة الأردنية الهاشمية',
          common: 'الأردن'
        }
      }
    },
    cca2: 'JO',
    cca3: 'JOR',
    capital: ['Amman'],
    region: 'Asia',
    population: 10203140
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

const mockedCountryDetail2: CountryDetail = {
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
  flags: {
    png: 'https://flagcdn.com/w320/ca.png',
    svg: 'https://flagcdn.com/ca.svg'
  },
  population: 38005238,
  tld: ['.ca'],
  currencies: {
    CAD: {
      name: 'Canadian dollar',
      symbol: '$'
    }
  },
  languages: {
    eng: 'English',
    fra: 'French'
  },
  borders: ['USA'],
  subregion: 'North America'
}

export { mockedCountries, mockedCountryDetail, mockedCountryDetail2, mockedRegions }
