// [
//   '{{repeat(100)}}',
//   {
//     index: '{{index()}}',
//     name: '{{company()}}',
//     company_relationship: [
//       '{{repeat(3)}}',
//       {
//         id: '{{integer(0,100)}}'
//       }
//     ],
//     projects: [
//       '{{repeat(1,10)}}',
//       {
//         id: '{{integer(101,1000)}}'
//       }
//     ]
//   }
// ]

const companyRayData = [{ legend: 'A', count: 2 }, { legend: 'B', count: 4 }, { legend: 'C', count: 7 }, { legend: 'D', count: 5 }, { legend: 'E', count: 9 }, { legend: 'F', count: 6 }, { legend: 'G', count: 7 }, { legend: 'H', count: 4 }, { legend: 'I', count: 3 }, { legend: 'J', count: 0 }, { legend: 'K', count: 0 }, { legend: 'L', count: 3 }, { legend: 'M', count: 4 }, { legend: 'N', count: 7 }, { legend: 'O', count: 1 }, { legend: 'P', count: 5 }, { legend: 'Q', count: 3 }, { legend: 'R', count: 4 }, { legend: 'S', count: 7 }, { legend: 'T', count: 4 }, { legend: 'U', count: 1 }, { legend: 'V', count: 2 }, { legend: 'W', count: 0 }, { legend: 'X', count: 1 }, { legend: 'Y', count: 0 }, { legend: 'Z', count: 11 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }];

const companyDataSample = [
  {
    index: 0,
    name: 'Accufarm',
    company_relationship: [
      {
        id: 11,
      },
      {
        id: 37,
      },
      {
        id: 92,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 7,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'MB',
      city: 'Sexton',
    },
  },
  {
    index: 1,
    name: 'Circum',
    company_relationship: [
      {
        id: 8,
      },
      {
        id: 30,
      },
      {
        id: 88,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 10,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NT',
      city: 'Beyerville',
    },
  },
  {
    index: 2,
    name: 'Isologix',
    company_relationship: [
      {
        id: 25,
      },
      {
        id: 23,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'SK',
      city: 'Cassel',
    },
  },
  {
    index: 3,
    name: 'Rodemco',
    company_relationship: [
      {
        id: 87,
      },
      {
        id: 25,
      },
      {
        id: 66,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'AB',
      city: 'Calpine',
    },
  },
  {
    index: 4,
    name: 'Digigen',
    company_relationship: [
      {
        id: 15,
      },
      {
        id: 70,
      },
      {
        id: 55,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 10,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'PE',
      city: 'Keyport',
    },
  },
  {
    index: 5,
    name: 'Amtap',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 97,
      },
      {
        id: 45,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 0,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'SK',
      city: 'Kapowsin',
    },
  },
  {
    index: 6,
    name: 'Pivitol',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 93,
      },
      {
        id: 76,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 6,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'PE',
      city: 'Frystown',
    },
  },
  {
    index: 7,
    name: 'Micronaut',
    company_relationship: [
      {
        id: 5,
      },
      {
        id: 95,
      },
      {
        id: 52,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 2,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NL',
      city: 'Dunnavant',
    },
  },
  {
    index: 8,
    name: 'Entogrok',
    company_relationship: [
      {
        id: 60,
      },
      {
        id: 68,
      },
      {
        id: 65,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'AB',
      city: 'Hoehne',
    },
  },
  {
    index: 9,
    name: 'Ecosys',
    company_relationship: [
      {
        id: 66,
      },
      {
        id: 70,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 0,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NL',
      city: 'Yorklyn',
    },
  },
  {
    index: 10,
    name: 'Zialactic',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 4,
      },
      {
        id: 96,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 10,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NU',
      city: 'Delshire',
    },
  },
  {
    index: 11,
    name: 'Pharmex',
    company_relationship: [
      {
        id: 58,
      },
      {
        id: 7,
      },
      {
        id: 47,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 0,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'PE',
      city: 'Adamstown',
    },
  },
  {
    index: 12,
    name: 'Grupoli',
    company_relationship: [
      {
        id: 7,
      },
      {
        id: 11,
      },
      {
        id: 74,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 4,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'MB',
      city: 'Noblestown',
    },
  },
  {
    index: 13,
    name: 'Solgan',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 50,
      },
      {
        id: 97,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NS',
      city: 'Oley',
    },
  },
  {
    index: 14,
    name: 'Pigzart',
    company_relationship: [
      {
        id: 68,
      },
      {
        id: 37,
      },
      {
        id: 61,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 4,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'MB',
      city: 'Soudan',
    },
  },
  {
    index: 15,
    name: 'Sportan',
    company_relationship: [
      {
        id: 92,
      },
      {
        id: 9,
      },
      {
        id: 46,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 0,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'YT',
      city: 'Dundee',
    },
  },
  {
    index: 16,
    name: 'Vurbo',
    company_relationship: [
      {
        id: 70,
      },
      {
        id: 3,
      },
      {
        id: 18,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 9,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'QC',
      city: 'Sims',
    },
  },
  {
    index: 17,
    name: 'Waretel',
    company_relationship: [
      {
        id: 95,
      },
      {
        id: 65,
      },
      {
        id: 48,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'YT',
      city: 'Nicut',
    },
  },
  {
    index: 18,
    name: 'Sultraxin',
    company_relationship: [
      {
        id: 62,
      },
      {
        id: 53,
      },
      {
        id: 14,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 9,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'MB',
      city: 'Coyote',
    },
  },
  {
    index: 19,
    name: 'Martgo',
    company_relationship: [
      {
        id: 21,
      },
      {
        id: 6,
      },
      {
        id: 51,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 1,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'QC',
      city: 'Winston',
    },
  },
  {
    index: 20,
    name: 'Orbiflex',
    company_relationship: [
      {
        id: 68,
      },
      {
        id: 80,
      },
      {
        id: 67,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 0,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NB',
      city: 'Yardville',
    },
  },
  {
    index: 21,
    name: 'Xth',
    company_relationship: [
      {
        id: 52,
      },
      {
        id: 99,
      },
      {
        id: 37,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 5,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'BC',
      city: 'Tyhee',
    },
  },
  {
    index: 22,
    name: 'Aquasseur',
    company_relationship: [
      {
        id: 10,
      },
      {
        id: 27,
      },
      {
        id: 74,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 8,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NT',
      city: 'Loyalhanna',
    },
  },
  {
    index: 23,
    name: 'Anarco',
    company_relationship: [
      {
        id: 53,
      },
      {
        id: 1,
      },
      {
        id: 6,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 8,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'YT',
      city: 'Lutsen',
    },
  },
  {
    index: 24,
    name: 'Deminimum',
    company_relationship: [
      {
        id: 15,
      },
      {
        id: 43,
      },
      {
        id: 56,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'QC',
      city: 'Madaket',
    },
  },
  {
    index: 25,
    name: 'Globoil',
    company_relationship: [
      {
        id: 13,
      },
      {
        id: 14,
      },
      {
        id: 50,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 2,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NT',
      city: 'Sehili',
    },
  },
  {
    index: 26,
    name: 'Eplode',
    company_relationship: [
      {
        id: 79,
      },
      {
        id: 0,
      },
      {
        id: 11,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NU',
      city: 'Blende',
    },
  },
  {
    index: 27,
    name: 'Pulze',
    company_relationship: [
      {
        id: 24,
      },
      {
        id: 49,
      },
      {
        id: 40,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 3,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NB',
      city: 'Columbus',
    },
  },
  {
    index: 28,
    name: 'Earwax',
    company_relationship: [
      {
        id: 90,
      },
      {
        id: 59,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 7,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'SK',
      city: 'Rivereno',
    },
  },
  {
    index: 29,
    name: 'Vertide',
    company_relationship: [
      {
        id: 57,
      },
      {
        id: 24,
      },
      {
        id: 78,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 6,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'QC',
      city: 'Wilmington',
    },
  },
  {
    index: 30,
    name: 'Signity',
    company_relationship: [
      {
        id: 87,
      },
      {
        id: 66,
      },
      {
        id: 68,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'YT',
      city: 'Callaghan',
    },
  },
  {
    index: 31,
    name: 'Tersanki',
    company_relationship: [
      {
        id: 21,
      },
      {
        id: 73,
      },
      {
        id: 72,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 10,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NB',
      city: 'Catharine',
    },
  },
  {
    index: 32,
    name: 'Junipoor',
    company_relationship: [
      {
        id: 54,
      },
      {
        id: 48,
      },
      {
        id: 88,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'MB',
      city: 'Williams',
    },
  },
  {
    index: 33,
    name: 'Xsports',
    company_relationship: [
      {
        id: 12,
      },
      {
        id: 47,
      },
      {
        id: 38,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 6,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NU',
      city: 'Rote',
    },
  },
  {
    index: 34,
    name: 'Steeltab',
    company_relationship: [
      {
        id: 21,
      },
      {
        id: 36,
      },
      {
        id: 84,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'AB',
      city: 'Castleton',
    },
  },
  {
    index: 35,
    name: 'Capscreen',
    company_relationship: [
      {
        id: 69,
      },
      {
        id: 36,
      },
      {
        id: 39,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 0,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NT',
      city: 'Townsend',
    },
  },
  {
    index: 36,
    name: 'Kengen',
    company_relationship: [
      {
        id: 68,
      },
      {
        id: 96,
      },
      {
        id: 46,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 0,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'PE',
      city: 'Southview',
    },
  },
  {
    index: 37,
    name: 'Daisu',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 83,
      },
      {
        id: 88,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 5,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'QC',
      city: 'Weedville',
    },
  },
  {
    index: 38,
    name: 'Halap',
    company_relationship: [
      {
        id: 49,
      },
      {
        id: 34,
      },
      {
        id: 74,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 2,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'QC',
      city: 'Wheatfields',
    },
  },
  {
    index: 39,
    name: 'Boilicon',
    company_relationship: [
      {
        id: 14,
      },
      {
        id: 79,
      },
      {
        id: 67,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 10,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NL',
      city: 'Garberville',
    },
  },
  {
    index: 40,
    name: 'Terascape',
    company_relationship: [
      {
        id: 51,
      },
      {
        id: 46,
      },
      {
        id: 55,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 8,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'AB',
      city: 'Weogufka',
    },
  },
  {
    index: 41,
    name: 'Accusage',
    company_relationship: [
      {
        id: 90,
      },
      {
        id: 21,
      },
      {
        id: 21,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 2,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'BC',
      city: 'Brenton',
    },
  },
  {
    index: 42,
    name: 'Baluba',
    company_relationship: [
      {
        id: 27,
      },
      {
        id: 33,
      },
      {
        id: 89,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'QC',
      city: 'Yonah',
    },
  },
  {
    index: 43,
    name: 'Bulljuice',
    company_relationship: [
      {
        id: 32,
      },
      {
        id: 84,
      },
      {
        id: 29,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 10,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'QC',
      city: 'Topaz',
    },
  },
  {
    index: 44,
    name: 'Zensus',
    company_relationship: [
      {
        id: 16,
      },
      {
        id: 79,
      },
      {
        id: 66,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 5,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NT',
      city: 'Singer',
    },
  },
  {
    index: 45,
    name: 'Candecor',
    company_relationship: [
      {
        id: 76,
      },
      {
        id: 58,
      },
      {
        id: 10,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 0,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NL',
      city: 'Disautel',
    },
  },
  {
    index: 46,
    name: 'Magneato',
    company_relationship: [
      {
        id: 70,
      },
      {
        id: 64,
      },
      {
        id: 94,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 10,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'ON',
      city: 'Tibbie',
    },
  },
  {
    index: 47,
    name: 'Uniworld',
    company_relationship: [
      {
        id: 70,
      },
      {
        id: 58,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 9,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NU',
      city: 'Curtice',
    },
  },
  {
    index: 48,
    name: 'Cubix',
    company_relationship: [
      {
        id: 57,
      },
      {
        id: 10,
      },
      {
        id: 90,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 9,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'YT',
      city: 'Roberts',
    },
  },
  {
    index: 49,
    name: 'Isodrive',
    company_relationship: [
      {
        id: 4,
      },
      {
        id: 76,
      },
      {
        id: 43,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 7,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NS',
      city: 'Wyoming',
    },
  },
  {
    index: 50,
    name: 'Zytrax',
    company_relationship: [
      {
        id: 16,
      },
      {
        id: 8,
      },
      {
        id: 2,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 3,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'YT',
      city: 'Riviera',
    },
  },
  {
    index: 51,
    name: 'Straloy',
    company_relationship: [
      {
        id: 0,
      },
      {
        id: 40,
      },
      {
        id: 18,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 7,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NU',
      city: 'Windsor',
    },
  },
  {
    index: 52,
    name: 'Isologica',
    company_relationship: [
      {
        id: 32,
      },
      {
        id: 11,
      },
      {
        id: 42,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 3,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'QC',
      city: 'Canterwood',
    },
  },
  {
    index: 53,
    name: 'Qualitern',
    company_relationship: [
      {
        id: 15,
      },
      {
        id: 14,
      },
      {
        id: 6,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NB',
      city: 'Maxville',
    },
  },
  {
    index: 54,
    name: 'Norsul',
    company_relationship: [
      {
        id: 83,
      },
      {
        id: 92,
      },
      {
        id: 24,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NT',
      city: 'Beaverdale',
    },
  },
  {
    index: 55,
    name: 'Ecstasia',
    company_relationship: [
      {
        id: 94,
      },
      {
        id: 65,
      },
      {
        id: 88,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 4,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'YT',
      city: 'Shindler',
    },
  },
  {
    index: 56,
    name: 'Brainquil',
    company_relationship: [
      {
        id: 28,
      },
      {
        id: 61,
      },
      {
        id: 10,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 0,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'PE',
      city: 'Tilden',
    },
  },
  {
    index: 57,
    name: 'Entroflex',
    company_relationship: [
      {
        id: 32,
      },
      {
        id: 48,
      },
      {
        id: 57,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 10,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'QC',
      city: 'Nicholson',
    },
  },
  {
    index: 58,
    name: 'Zoinage',
    company_relationship: [
      {
        id: 92,
      },
      {
        id: 45,
      },
      {
        id: 100,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 2,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'AB',
      city: 'Reinerton',
    },
  },
  {
    index: 59,
    name: 'Makingway',
    company_relationship: [
      {
        id: 11,
      },
      {
        id: 97,
      },
      {
        id: 62,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'SK',
      city: 'Haena',
    },
  },
  {
    index: 60,
    name: 'Gaptec',
    company_relationship: [
      {
        id: 58,
      },
      {
        id: 72,
      },
      {
        id: 21,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 1,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'PE',
      city: 'Edenburg',
    },
  },
  {
    index: 61,
    name: 'Geekology',
    company_relationship: [
      {
        id: 18,
      },
      {
        id: 80,
      },
      {
        id: 55,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 2,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'MB',
      city: 'Manila',
    },
  },
  {
    index: 62,
    name: 'Prosure',
    company_relationship: [
      {
        id: 33,
      },
      {
        id: 14,
      },
      {
        id: 72,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 10,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'ON',
      city: 'Como',
    },
  },
  {
    index: 63,
    name: 'Myopium',
    company_relationship: [
      {
        id: 75,
      },
      {
        id: 16,
      },
      {
        id: 61,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 0,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'BC',
      city: 'Suitland',
    },
  },
  {
    index: 64,
    name: 'Suremax',
    company_relationship: [
      {
        id: 1,
      },
      {
        id: 61,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NB',
      city: 'Gratton',
    },
  },
  {
    index: 65,
    name: 'Vetron',
    company_relationship: [
      {
        id: 25,
      },
      {
        id: 59,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NS',
      city: 'Starks',
    },
  },
  {
    index: 66,
    name: 'Blanet',
    company_relationship: [
      {
        id: 71,
      },
      {
        id: 23,
      },
      {
        id: 74,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 0,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NL',
      city: 'Cobbtown',
    },
  },
  {
    index: 67,
    name: 'Xelegyl',
    company_relationship: [
      {
        id: 59,
      },
      {
        id: 65,
      },
      {
        id: 10,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 10,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'QC',
      city: 'Allentown',
    },
  },
  {
    index: 68,
    name: 'Iplax',
    company_relationship: [
      {
        id: 20,
      },
      {
        id: 46,
      },
      {
        id: 89,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 10,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'MB',
      city: 'Benson',
    },
  },
  {
    index: 69,
    name: 'Yogasm',
    company_relationship: [
      {
        id: 57,
      },
      {
        id: 44,
      },
      {
        id: 11,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 10,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'YT',
      city: 'Bethpage',
    },
  },
  {
    index: 70,
    name: 'Nurplex',
    company_relationship: [
      {
        id: 40,
      },
      {
        id: 45,
      },
      {
        id: 3,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NL',
      city: 'Biddle',
    },
  },
  {
    index: 71,
    name: 'Centrexin',
    company_relationship: [
      {
        id: 48,
      },
      {
        id: 44,
      },
      {
        id: 20,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'BC',
      city: 'Mooresburg',
    },
  },
  {
    index: 72,
    name: 'Musix',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 99,
      },
      {
        id: 75,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 2,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'BC',
      city: 'Cataract',
    },
  },
  {
    index: 73,
    name: 'Neocent',
    company_relationship: [
      {
        id: 97,
      },
      {
        id: 46,
      },
      {
        id: 75,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 3,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'ON',
      city: 'Epworth',
    },
  },
  {
    index: 74,
    name: 'Intrawear',
    company_relationship: [
      {
        id: 100,
      },
      {
        id: 56,
      },
      {
        id: 70,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 3,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NS',
      city: 'Tivoli',
    },
  },
  {
    index: 75,
    name: 'Geekfarm',
    company_relationship: [
      {
        id: 20,
      },
      {
        id: 85,
      },
      {
        id: 53,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 9,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'MB',
      city: 'Dixonville',
    },
  },
  {
    index: 76,
    name: 'Avit',
    company_relationship: [
      {
        id: 1,
      },
      {
        id: 21,
      },
      {
        id: 30,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 9,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'AB',
      city: 'Dowling',
    },
  },
  {
    index: 77,
    name: 'Organica',
    company_relationship: [
      {
        id: 36,
      },
      {
        id: 13,
      },
      {
        id: 7,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 5,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'SK',
      city: 'Chumuckla',
    },
  },
  {
    index: 78,
    name: 'Tetratrex',
    company_relationship: [
      {
        id: 63,
      },
      {
        id: 3,
      },
      {
        id: 9,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 9,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'ON',
      city: 'Kidder',
    },
  },
  {
    index: 79,
    name: 'Volax',
    company_relationship: [
      {
        id: 23,
      },
      {
        id: 32,
      },
      {
        id: 64,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 0,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NU',
      city: 'Avoca',
    },
  },
  {
    index: 80,
    name: 'Magnina',
    company_relationship: [
      {
        id: 53,
      },
      {
        id: 22,
      },
      {
        id: 11,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 2,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NL',
      city: 'Driftwood',
    },
  },
  {
    index: 81,
    name: 'Otherside',
    company_relationship: [
      {
        id: 46,
      },
      {
        id: 33,
      },
      {
        id: 60,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 7,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'PE',
      city: 'Ferney',
    },
  },
  {
    index: 82,
    name: 'Songlines',
    company_relationship: [
      {
        id: 73,
      },
      {
        id: 70,
      },
      {
        id: 19,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 9,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NB',
      city: 'Eastvale',
    },
  },
  {
    index: 83,
    name: 'Indexia',
    company_relationship: [
      {
        id: 77,
      },
      {
        id: 20,
      },
      {
        id: 59,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NU',
      city: 'Emory',
    },
  },
  {
    index: 84,
    name: 'Olucore',
    company_relationship: [
      {
        id: 72,
      },
      {
        id: 88,
      },
      {
        id: 71,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 7,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NU',
      city: 'Marysville',
    },
  },
  {
    index: 85,
    name: 'Geekol',
    company_relationship: [
      {
        id: 22,
      },
      {
        id: 81,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 1,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'ON',
      city: 'Eureka',
    },
  },
  {
    index: 86,
    name: 'Exoswitch',
    company_relationship: [
      {
        id: 79,
      },
      {
        id: 8,
      },
      {
        id: 84,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 5,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NS',
      city: 'Hollymead',
    },
  },
  {
    index: 87,
    name: 'Remotion',
    company_relationship: [
      {
        id: 85,
      },
      {
        id: 88,
      },
      {
        id: 25,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 7,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NT',
      city: 'Axis',
    },
  },
  {
    index: 88,
    name: 'Magmina',
    company_relationship: [
      {
        id: 97,
      },
      {
        id: 54,
      },
      {
        id: 54,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 6,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NB',
      city: 'Chicopee',
    },
  },
  {
    index: 89,
    name: 'Lingoage',
    company_relationship: [
      {
        id: 62,
      },
      {
        id: 26,
      },
      {
        id: 73,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 0,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'BC',
      city: 'Nelson',
    },
  },
  {
    index: 90,
    name: 'Joviold',
    company_relationship: [
      {
        id: 36,
      },
      {
        id: 31,
      },
      {
        id: 3,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 9,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NB',
      city: 'Goldfield',
    },
  },
  {
    index: 91,
    name: 'Dognosis',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 1,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'BC',
      city: 'Boyd',
    },
  },
  {
    index: 92,
    name: 'Bovis',
    company_relationship: [
      {
        id: 61,
      },
      {
        id: 71,
      },
      {
        id: 35,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 10,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'AB',
      city: 'Eagletown',
    },
  },
  {
    index: 93,
    name: 'Rodeomad',
    company_relationship: [
      {
        id: 90,
      },
      {
        id: 86,
      },
      {
        id: 61,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 10,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'BC',
      city: 'Kempton',
    },
  },
  {
    index: 94,
    name: 'Enquility',
    company_relationship: [
      {
        id: 28,
      },
      {
        id: 83,
      },
      {
        id: 93,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 0,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'QC',
      city: 'Eastmont',
    },
  },
  {
    index: 95,
    name: 'Evidends',
    company_relationship: [
      {
        id: 93,
      },
      {
        id: 91,
      },
      {
        id: 53,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 9,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'BC',
      city: 'Taycheedah',
    },
  },
  {
    index: 96,
    name: 'Artiq',
    company_relationship: [
      {
        id: 69,
      },
      {
        id: 86,
      },
      {
        id: 39,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 3,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'ON',
      city: 'Urbana',
    },
  },
  {
    index: 97,
    name: 'Extremo',
    company_relationship: [
      {
        id: 72,
      },
      {
        id: 87,
      },
      {
        id: 36,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 6,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'QC',
      city: 'Walton',
    },
  },
  {
    index: 98,
    name: 'Homelux',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 90,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 8,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'SK',
      city: 'Lynn',
    },
  },
  {
    index: 99,
    name: 'Geofarm',
    company_relationship: [
      {
        id: 4,
      },
      {
        id: 39,
      },
      {
        id: 54,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 10,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'SK',
      city: 'Nogal',
    },
  },
  {
    index: 100,
    name: 'Omnigog',
    company_relationship: [
      {
        id: 13,
      },
      {
        id: 79,
      },
      {
        id: 29,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 5,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'AB',
      city: 'Barstow',
    },
  },
  {
    index: 101,
    name: 'Keeg',
    company_relationship: [
      {
        id: 0,
      },
      {
        id: 90,
      },
      {
        id: 83,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 2,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'YT',
      city: 'Camptown',
    },
  },
  {
    index: 102,
    name: 'Stucco',
    company_relationship: [
      {
        id: 15,
      },
      {
        id: 72,
      },
      {
        id: 12,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'SK',
      city: 'Hiko',
    },
  },
  {
    index: 103,
    name: 'Shopabout',
    company_relationship: [
      {
        id: 37,
      },
      {
        id: 55,
      },
      {
        id: 24,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 4,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NL',
      city: 'Elwood',
    },
  },
  {
    index: 104,
    name: 'Plasmos',
    company_relationship: [
      {
        id: 8,
      },
      {
        id: 0,
      },
      {
        id: 94,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 4,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NS',
      city: 'Succasunna',
    },
  },
  {
    index: 105,
    name: 'Zentry',
    company_relationship: [
      {
        id: 60,
      },
      {
        id: 67,
      },
      {
        id: 21,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 8,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NB',
      city: 'Lopezo',
    },
  },
  {
    index: 106,
    name: 'Mazuda',
    company_relationship: [
      {
        id: 3,
      },
      {
        id: 56,
      },
      {
        id: 76,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 6,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NS',
      city: 'Wiscon',
    },
  },
  {
    index: 107,
    name: 'Autograte',
    company_relationship: [
      {
        id: 86,
      },
      {
        id: 39,
      },
      {
        id: 72,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'YT',
      city: 'Hatteras',
    },
  },
  {
    index: 108,
    name: 'Cyclonica',
    company_relationship: [
      {
        id: 77,
      },
      {
        id: 17,
      },
      {
        id: 2,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 2,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'ON',
      city: 'Crisman',
    },
  },
  {
    index: 109,
    name: 'Matrixity',
    company_relationship: [
      {
        id: 72,
      },
      {
        id: 34,
      },
      {
        id: 83,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 1,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NB',
      city: 'Loveland',
    },
  },
  {
    index: 110,
    name: 'Zoxy',
    company_relationship: [
      {
        id: 68,
      },
      {
        id: 39,
      },
      {
        id: 45,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NB',
      city: 'Sanders',
    },
  },
  {
    index: 111,
    name: 'Lunchpad',
    company_relationship: [
      {
        id: 7,
      },
      {
        id: 15,
      },
      {
        id: 7,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 1,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NS',
      city: 'Hendersonville',
    },
  },
  {
    index: 112,
    name: 'Dogspa',
    company_relationship: [
      {
        id: 62,
      },
      {
        id: 9,
      },
      {
        id: 50,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NL',
      city: 'Juntura',
    },
  },
  {
    index: 113,
    name: 'Aeora',
    company_relationship: [
      {
        id: 41,
      },
      {
        id: 39,
      },
      {
        id: 95,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 3,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NS',
      city: 'Westerville',
    },
  },
  {
    index: 114,
    name: 'Cuizine',
    company_relationship: [
      {
        id: 24,
      },
      {
        id: 46,
      },
      {
        id: 85,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 8,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'YT',
      city: 'Roulette',
    },
  },
  {
    index: 115,
    name: 'Bisba',
    company_relationship: [
      {
        id: 71,
      },
      {
        id: 37,
      },
      {
        id: 24,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 6,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'SK',
      city: 'Deltaville',
    },
  },
  {
    index: 116,
    name: 'Voipa',
    company_relationship: [
      {
        id: 96,
      },
      {
        id: 35,
      },
      {
        id: 13,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 3,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'AB',
      city: 'Oasis',
    },
  },
  {
    index: 117,
    name: 'Namebox',
    company_relationship: [
      {
        id: 30,
      },
      {
        id: 0,
      },
      {
        id: 4,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 3,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NU',
      city: 'Cavalero',
    },
  },
  {
    index: 118,
    name: 'Gluid',
    company_relationship: [
      {
        id: 92,
      },
      {
        id: 5,
      },
      {
        id: 4,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 4,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'BC',
      city: 'Stollings',
    },
  },
  {
    index: 119,
    name: 'Zenthall',
    company_relationship: [
      {
        id: 88,
      },
      {
        id: 92,
      },
      {
        id: 61,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 5,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'SK',
      city: 'Babb',
    },
  },
  {
    index: 120,
    name: 'Tubesys',
    company_relationship: [
      {
        id: 88,
      },
      {
        id: 4,
      },
      {
        id: 97,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 5,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NB',
      city: 'Waterloo',
    },
  },
  {
    index: 121,
    name: 'Comtent',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 42,
      },
      {
        id: 72,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 6,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'SK',
      city: 'Jacksonwald',
    },
  },
  {
    index: 122,
    name: 'Delphide',
    company_relationship: [
      {
        id: 63,
      },
      {
        id: 78,
      },
      {
        id: 65,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NL',
      city: 'Ellerslie',
    },
  },
  {
    index: 123,
    name: 'Magnemo',
    company_relationship: [
      {
        id: 88,
      },
      {
        id: 66,
      },
      {
        id: 9,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 10,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'YT',
      city: 'Comptche',
    },
  },
  {
    index: 124,
    name: 'Tripsch',
    company_relationship: [
      {
        id: 45,
      },
      {
        id: 52,
      },
      {
        id: 91,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 7,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NT',
      city: 'Cloverdale',
    },
  },
  {
    index: 125,
    name: 'Zilencio',
    company_relationship: [
      {
        id: 22,
      },
      {
        id: 97,
      },
      {
        id: 0,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 9,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'ON',
      city: 'Ticonderoga',
    },
  },
  {
    index: 126,
    name: 'Krog',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 99,
      },
      {
        id: 93,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 7,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'PE',
      city: 'Deseret',
    },
  },
  {
    index: 127,
    name: 'Dognost',
    company_relationship: [
      {
        id: 20,
      },
      {
        id: 19,
      },
      {
        id: 93,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 6,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'PE',
      city: 'Aurora',
    },
  },
  {
    index: 128,
    name: 'Eventix',
    company_relationship: [
      {
        id: 51,
      },
      {
        id: 97,
      },
      {
        id: 80,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 10,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NT',
      city: 'Florence',
    },
  },
  {
    index: 129,
    name: 'Fibrodyne',
    company_relationship: [
      {
        id: 32,
      },
      {
        id: 12,
      },
      {
        id: 57,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 7,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'BC',
      city: 'Ivanhoe',
    },
  },
  {
    index: 130,
    name: 'Urbanshee',
    company_relationship: [
      {
        id: 13,
      },
      {
        id: 50,
      },
      {
        id: 97,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 1,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'QC',
      city: 'Cade',
    },
  },
  {
    index: 131,
    name: 'Hatology',
    company_relationship: [
      {
        id: 56,
      },
      {
        id: 34,
      },
      {
        id: 95,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 5,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'SK',
      city: 'Statenville',
    },
  },
  {
    index: 132,
    name: 'Supportal',
    company_relationship: [
      {
        id: 41,
      },
      {
        id: 26,
      },
      {
        id: 43,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 4,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'BC',
      city: 'Bethany',
    },
  },
  {
    index: 133,
    name: 'Exotechno',
    company_relationship: [
      {
        id: 13,
      },
      {
        id: 90,
      },
      {
        id: 84,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 6,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'QC',
      city: 'Urie',
    },
  },
  {
    index: 134,
    name: 'Qualitex',
    company_relationship: [
      {
        id: 6,
      },
      {
        id: 44,
      },
      {
        id: 92,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 0,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'MB',
      city: 'Dyckesville',
    },
  },
  {
    index: 135,
    name: 'Rugstars',
    company_relationship: [
      {
        id: 52,
      },
      {
        id: 55,
      },
      {
        id: 62,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 0,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NL',
      city: 'Roosevelt',
    },
  },
  {
    index: 136,
    name: 'Artworlds',
    company_relationship: [
      {
        id: 12,
      },
      {
        id: 34,
      },
      {
        id: 59,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 8,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'SK',
      city: 'Staples',
    },
  },
  {
    index: 137,
    name: 'Phormula',
    company_relationship: [
      {
        id: 25,
      },
      {
        id: 42,
      },
      {
        id: 20,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 2,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'BC',
      city: 'Kansas',
    },
  },
  {
    index: 138,
    name: 'Kaggle',
    company_relationship: [
      {
        id: 13,
      },
      {
        id: 1,
      },
      {
        id: 23,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 5,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'MB',
      city: 'Klagetoh',
    },
  },
  {
    index: 139,
    name: 'Emoltra',
    company_relationship: [
      {
        id: 65,
      },
      {
        id: 94,
      },
      {
        id: 79,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 2,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'PE',
      city: 'Whitehaven',
    },
  },
  {
    index: 140,
    name: 'Apex',
    company_relationship: [
      {
        id: 97,
      },
      {
        id: 34,
      },
      {
        id: 52,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 7,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NL',
      city: 'Geyserville',
    },
  },
  {
    index: 141,
    name: 'Ovolo',
    company_relationship: [
      {
        id: 3,
      },
      {
        id: 25,
      },
      {
        id: 90,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 4,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'AB',
      city: 'Hoagland',
    },
  },
  {
    index: 142,
    name: 'Greeker',
    company_relationship: [
      {
        id: 69,
      },
      {
        id: 18,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 4,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NT',
      city: 'Wakarusa',
    },
  },
  {
    index: 143,
    name: 'Marketoid',
    company_relationship: [
      {
        id: 9,
      },
      {
        id: 9,
      },
      {
        id: 95,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 2,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NS',
      city: 'Wyano',
    },
  },
  {
    index: 144,
    name: 'Opticom',
    company_relationship: [
      {
        id: 87,
      },
      {
        id: 32,
      },
      {
        id: 57,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 1,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'ON',
      city: 'Adelino',
    },
  },
  {
    index: 145,
    name: 'Enersol',
    company_relationship: [
      {
        id: 12,
      },
      {
        id: 44,
      },
      {
        id: 73,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 6,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'AB',
      city: 'Coventry',
    },
  },
  {
    index: 146,
    name: 'Rotodyne',
    company_relationship: [
      {
        id: 88,
      },
      {
        id: 64,
      },
      {
        id: 35,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 6,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NB',
      city: 'Nile',
    },
  },
  {
    index: 147,
    name: 'Sureplex',
    company_relationship: [
      {
        id: 82,
      },
      {
        id: 61,
      },
      {
        id: 70,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 8,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NS',
      city: 'Hollins',
    },
  },
  {
    index: 148,
    name: 'Splinx',
    company_relationship: [
      {
        id: 69,
      },
      {
        id: 89,
      },
      {
        id: 51,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 9,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'YT',
      city: 'Vienna',
    },
  },
  {
    index: 149,
    name: 'Exovent',
    company_relationship: [
      {
        id: 77,
      },
      {
        id: 82,
      },
      {
        id: 79,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 0,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'ON',
      city: 'Tilleda',
    },
  },
  {
    index: 150,
    name: 'Zepitope',
    company_relationship: [
      {
        id: 0,
      },
      {
        id: 43,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 0,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'PE',
      city: 'Snyderville',
    },
  },
  {
    index: 151,
    name: 'Premiant',
    company_relationship: [
      {
        id: 3,
      },
      {
        id: 83,
      },
      {
        id: 90,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 0,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'YT',
      city: 'Thatcher',
    },
  },
  {
    index: 152,
    name: 'Progenex',
    company_relationship: [
      {
        id: 0,
      },
      {
        id: 94,
      },
      {
        id: 52,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'SK',
      city: 'Beason',
    },
  },
  {
    index: 153,
    name: 'Twiggery',
    company_relationship: [
      {
        id: 84,
      },
      {
        id: 12,
      },
      {
        id: 98,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'BC',
      city: 'Rosedale',
    },
  },
  {
    index: 154,
    name: 'Ziggles',
    company_relationship: [
      {
        id: 2,
      },
      {
        id: 100,
      },
      {
        id: 77,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 10,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NT',
      city: 'Cutter',
    },
  },
  {
    index: 155,
    name: 'Isotrack',
    company_relationship: [
      {
        id: 6,
      },
      {
        id: 19,
      },
      {
        id: 36,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 7,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'YT',
      city: 'Morriston',
    },
  },
  {
    index: 156,
    name: 'Comtour',
    company_relationship: [
      {
        id: 21,
      },
      {
        id: 96,
      },
      {
        id: 80,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 3,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'SK',
      city: 'Ezel',
    },
  },
  {
    index: 157,
    name: 'Podunk',
    company_relationship: [
      {
        id: 39,
      },
      {
        id: 33,
      },
      {
        id: 0,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 5,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NL',
      city: 'Franklin',
    },
  },
  {
    index: 158,
    name: 'Playce',
    company_relationship: [
      {
        id: 11,
      },
      {
        id: 14,
      },
      {
        id: 47,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 0,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'PE',
      city: 'Corinne',
    },
  },
  {
    index: 159,
    name: 'Rockabye',
    company_relationship: [
      {
        id: 51,
      },
      {
        id: 91,
      },
      {
        id: 89,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 0,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'AB',
      city: 'Dexter',
    },
  },
  {
    index: 160,
    name: 'Accuprint',
    company_relationship: [
      {
        id: 29,
      },
      {
        id: 10,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NU',
      city: 'Brecon',
    },
  },
  {
    index: 161,
    name: 'Vortexaco',
    company_relationship: [
      {
        id: 36,
      },
      {
        id: 10,
      },
      {
        id: 91,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 4,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'ON',
      city: 'Gilgo',
    },
  },
  {
    index: 162,
    name: 'Eschoir',
    company_relationship: [
      {
        id: 0,
      },
      {
        id: 65,
      },
      {
        id: 54,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 6,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NL',
      city: 'Lowgap',
    },
  },
  {
    index: 163,
    name: 'Orbixtar',
    company_relationship: [
      {
        id: 15,
      },
      {
        id: 79,
      },
      {
        id: 31,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NU',
      city: 'Loomis',
    },
  },
  {
    index: 164,
    name: 'Zilidium',
    company_relationship: [
      {
        id: 22,
      },
      {
        id: 59,
      },
      {
        id: 67,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 9,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'AB',
      city: 'Cliff',
    },
  },
  {
    index: 165,
    name: 'Optyk',
    company_relationship: [
      {
        id: 72,
      },
      {
        id: 67,
      },
      {
        id: 66,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 4,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NB',
      city: 'Irwin',
    },
  },
  {
    index: 166,
    name: 'Amtas',
    company_relationship: [
      {
        id: 22,
      },
      {
        id: 4,
      },
      {
        id: 29,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 8,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NT',
      city: 'Takilma',
    },
  },
  {
    index: 167,
    name: 'Yurture',
    company_relationship: [
      {
        id: 67,
      },
      {
        id: 3,
      },
      {
        id: 98,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NT',
      city: 'Maplewood',
    },
  },
  {
    index: 168,
    name: 'Cytrek',
    company_relationship: [
      {
        id: 11,
      },
      {
        id: 54,
      },
      {
        id: 53,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 3,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NU',
      city: 'Diaperville',
    },
  },
  {
    index: 169,
    name: 'Bleendot',
    company_relationship: [
      {
        id: 85,
      },
      {
        id: 17,
      },
      {
        id: 37,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'PE',
      city: 'Bynum',
    },
  },
  {
    index: 170,
    name: 'Extragen',
    company_relationship: [
      {
        id: 25,
      },
      {
        id: 92,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 8,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'ON',
      city: 'Robinette',
    },
  },
  {
    index: 171,
    name: 'Zillacom',
    company_relationship: [
      {
        id: 30,
      },
      {
        id: 31,
      },
      {
        id: 84,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'ON',
      city: 'Craig',
    },
  },
  {
    index: 172,
    name: 'Navir',
    company_relationship: [
      {
        id: 62,
      },
      {
        id: 76,
      },
      {
        id: 53,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 9,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NT',
      city: 'Kenwood',
    },
  },
  {
    index: 173,
    name: 'Futurize',
    company_relationship: [
      {
        id: 83,
      },
      {
        id: 70,
      },
      {
        id: 85,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 4,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'BC',
      city: 'Frizzleburg',
    },
  },
  {
    index: 174,
    name: 'Jasper',
    company_relationship: [
      {
        id: 0,
      },
      {
        id: 65,
      },
      {
        id: 71,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 4,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'SK',
      city: 'Lorraine',
    },
  },
  {
    index: 175,
    name: 'Orboid',
    company_relationship: [
      {
        id: 9,
      },
      {
        id: 32,
      },
      {
        id: 95,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 8,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NL',
      city: 'Stagecoach',
    },
  },
  {
    index: 176,
    name: 'Emtrak',
    company_relationship: [
      {
        id: 11,
      },
      {
        id: 93,
      },
      {
        id: 50,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 7,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'SK',
      city: 'Sidman',
    },
  },
  {
    index: 177,
    name: 'Telpod',
    company_relationship: [
      {
        id: 57,
      },
      {
        id: 62,
      },
      {
        id: 14,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 4,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NT',
      city: 'Seymour',
    },
  },
  {
    index: 178,
    name: 'Mondicil',
    company_relationship: [
      {
        id: 79,
      },
      {
        id: 82,
      },
      {
        id: 68,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 7,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'SK',
      city: 'Brethren',
    },
  },
  {
    index: 179,
    name: 'Cytrex',
    company_relationship: [
      {
        id: 97,
      },
      {
        id: 39,
      },
      {
        id: 76,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'YT',
      city: 'Calverton',
    },
  },
  {
    index: 180,
    name: 'Imaginart',
    company_relationship: [
      {
        id: 53,
      },
      {
        id: 56,
      },
      {
        id: 80,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NT',
      city: 'Snowville',
    },
  },
  {
    index: 181,
    name: 'Honotron',
    company_relationship: [
      {
        id: 50,
      },
      {
        id: 64,
      },
      {
        id: 18,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 1,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'ON',
      city: 'Vale',
    },
  },
  {
    index: 182,
    name: 'Aclima',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 50,
      },
      {
        id: 43,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 5,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'YT',
      city: 'Worcester',
    },
  },
  {
    index: 183,
    name: 'Pearlessa',
    company_relationship: [
      {
        id: 98,
      },
      {
        id: 69,
      },
      {
        id: 18,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 10,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'AB',
      city: 'Rose',
    },
  },
  {
    index: 184,
    name: 'Photobin',
    company_relationship: [
      {
        id: 54,
      },
      {
        id: 75,
      },
      {
        id: 43,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 6,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'ON',
      city: 'Crayne',
    },
  },
  {
    index: 185,
    name: 'Techtrix',
    company_relationship: [
      {
        id: 14,
      },
      {
        id: 40,
      },
      {
        id: 91,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NB',
      city: 'Galesville',
    },
  },
  {
    index: 186,
    name: 'Letpro',
    company_relationship: [
      {
        id: 19,
      },
      {
        id: 94,
      },
      {
        id: 18,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 4,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NB',
      city: 'Fairfield',
    },
  },
  {
    index: 187,
    name: 'Musanpoly',
    company_relationship: [
      {
        id: 79,
      },
      {
        id: 34,
      },
      {
        id: 11,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 3,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'ON',
      city: 'Coinjock',
    },
  },
  {
    index: 188,
    name: 'Idetica',
    company_relationship: [
      {
        id: 20,
      },
      {
        id: 66,
      },
      {
        id: 71,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 0,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NB',
      city: 'Dunbar',
    },
  },
  {
    index: 189,
    name: 'Kenegy',
    company_relationship: [
      {
        id: 29,
      },
      {
        id: 16,
      },
      {
        id: 45,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'MB',
      city: 'Heil',
    },
  },
  {
    index: 190,
    name: 'Rubadub',
    company_relationship: [
      {
        id: 41,
      },
      {
        id: 82,
      },
      {
        id: 6,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'ON',
      city: 'Grandview',
    },
  },
  {
    index: 191,
    name: 'Spherix',
    company_relationship: [
      {
        id: 27,
      },
      {
        id: 83,
      },
      {
        id: 63,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 4,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NB',
      city: 'Vandiver',
    },
  },
  {
    index: 192,
    name: 'Austex',
    company_relationship: [
      {
        id: 23,
      },
      {
        id: 79,
      },
      {
        id: 78,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NS',
      city: 'Whitmer',
    },
  },
  {
    index: 193,
    name: 'Recrisys',
    company_relationship: [
      {
        id: 60,
      },
      {
        id: 63,
      },
      {
        id: 59,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 9,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'MB',
      city: 'Titanic',
    },
  },
  {
    index: 194,
    name: 'Datagene',
    company_relationship: [
      {
        id: 14,
      },
      {
        id: 24,
      },
      {
        id: 62,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NU',
      city: 'Welda',
    },
  },
  {
    index: 195,
    name: 'Ontagene',
    company_relationship: [
      {
        id: 23,
      },
      {
        id: 71,
      },
      {
        id: 53,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 9,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'MB',
      city: 'Harleigh',
    },
  },
  {
    index: 196,
    name: 'Balooba',
    company_relationship: [
      {
        id: 83,
      },
      {
        id: 19,
      },
      {
        id: 1,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 9,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'YT',
      city: 'Temperanceville',
    },
  },
  {
    index: 197,
    name: 'Isoplex',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 95,
      },
      {
        id: 51,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 8,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NS',
      city: 'Churchill',
    },
  },
  {
    index: 198,
    name: 'Softmicro',
    company_relationship: [
      {
        id: 60,
      },
      {
        id: 100,
      },
      {
        id: 4,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 10,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NU',
      city: 'Ahwahnee',
    },
  },
  {
    index: 199,
    name: 'Inquala',
    company_relationship: [
      {
        id: 40,
      },
      {
        id: 13,
      },
      {
        id: 73,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 6,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'SK',
      city: 'Slovan',
    },
  },
  {
    index: 200,
    name: 'Eyeris',
    company_relationship: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 5,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NT',
      city: 'Emison',
    },
  },
  {
    index: 201,
    name: 'Flotonic',
    company_relationship: [
      {
        id: 61,
      },
      {
        id: 14,
      },
      {
        id: 15,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 5,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'ON',
      city: 'Dola',
    },
  },
  {
    index: 202,
    name: 'Isoternia',
    company_relationship: [
      {
        id: 98,
      },
      {
        id: 32,
      },
      {
        id: 75,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'QC',
      city: 'Fedora',
    },
  },
  {
    index: 203,
    name: 'Kog',
    company_relationship: [
      {
        id: 65,
      },
      {
        id: 32,
      },
      {
        id: 57,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NB',
      city: 'Tecolotito',
    },
  },
  {
    index: 204,
    name: 'Nurali',
    company_relationship: [
      {
        id: 65,
      },
      {
        id: 62,
      },
      {
        id: 51,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 7,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NB',
      city: 'Oretta',
    },
  },
  {
    index: 205,
    name: 'Zidant',
    company_relationship: [
      {
        id: 72,
      },
      {
        id: 31,
      },
      {
        id: 25,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'YT',
      city: 'Carlos',
    },
  },
  {
    index: 206,
    name: 'Reversus',
    company_relationship: [
      {
        id: 28,
      },
      {
        id: 19,
      },
      {
        id: 66,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'SK',
      city: 'Richford',
    },
  },
  {
    index: 207,
    name: 'Dogtown',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 92,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NU',
      city: 'Springdale',
    },
  },
  {
    index: 208,
    name: 'Kegular',
    company_relationship: [
      {
        id: 4,
      },
      {
        id: 95,
      },
      {
        id: 30,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NS',
      city: 'Gilmore',
    },
  },
  {
    index: 209,
    name: 'Hydrocom',
    company_relationship: [
      {
        id: 43,
      },
      {
        id: 67,
      },
      {
        id: 97,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 6,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'SK',
      city: 'Northridge',
    },
  },
  {
    index: 210,
    name: 'Polarium',
    company_relationship: [
      {
        id: 57,
      },
      {
        id: 51,
      },
      {
        id: 94,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 0,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'BC',
      city: 'Wells',
    },
  },
  {
    index: 211,
    name: 'Fangold',
    company_relationship: [
      {
        id: 13,
      },
      {
        id: 26,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'YT',
      city: 'Cornfields',
    },
  },
  {
    index: 212,
    name: 'Zilodyne',
    company_relationship: [
      {
        id: 87,
      },
      {
        id: 7,
      },
      {
        id: 65,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NL',
      city: 'Cherokee',
    },
  },
  {
    index: 213,
    name: 'Bristo',
    company_relationship: [
      {
        id: 8,
      },
      {
        id: 89,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'SK',
      city: 'Brazos',
    },
  },
  {
    index: 214,
    name: 'Zosis',
    company_relationship: [
      {
        id: 12,
      },
      {
        id: 93,
      },
      {
        id: 99,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 7,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'SK',
      city: 'Trail',
    },
  },
  {
    index: 215,
    name: 'Cofine',
    company_relationship: [
      {
        id: 12,
      },
      {
        id: 13,
      },
      {
        id: 23,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 3,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'AB',
      city: 'Sanford',
    },
  },
  {
    index: 216,
    name: 'Tellifly',
    company_relationship: [
      {
        id: 20,
      },
      {
        id: 98,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 8,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NS',
      city: 'Lemoyne',
    },
  },
  {
    index: 217,
    name: 'Obliq',
    company_relationship: [
      {
        id: 86,
      },
      {
        id: 62,
      },
      {
        id: 11,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NU',
      city: 'Macdona',
    },
  },
  {
    index: 218,
    name: 'Stockpost',
    company_relationship: [
      {
        id: 70,
      },
      {
        id: 36,
      },
      {
        id: 24,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 2,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'PE',
      city: 'Mapletown',
    },
  },
  {
    index: 219,
    name: 'Mixers',
    company_relationship: [
      {
        id: 12,
      },
      {
        id: 49,
      },
      {
        id: 59,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 5,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NB',
      city: 'Breinigsville',
    },
  },
  {
    index: 220,
    name: 'Kiggle',
    company_relationship: [
      {
        id: 87,
      },
      {
        id: 22,
      },
      {
        id: 62,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 8,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'AB',
      city: 'Clarksburg',
    },
  },
  {
    index: 221,
    name: 'Zolavo',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 1,
      },
      {
        id: 69,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 3,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NT',
      city: 'Nash',
    },
  },
  {
    index: 222,
    name: 'Trollery',
    company_relationship: [
      {
        id: 59,
      },
      {
        id: 41,
      },
      {
        id: 64,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 3,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'BC',
      city: 'Stouchsburg',
    },
  },
  {
    index: 223,
    name: 'Adornica',
    company_relationship: [
      {
        id: 68,
      },
      {
        id: 25,
      },
      {
        id: 88,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 0,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'YT',
      city: 'Templeton',
    },
  },
  {
    index: 224,
    name: 'Eclipsent',
    company_relationship: [
      {
        id: 27,
      },
      {
        id: 23,
      },
      {
        id: 14,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'ON',
      city: 'Tonopah',
    },
  },
  {
    index: 225,
    name: 'Luxuria',
    company_relationship: [
      {
        id: 36,
      },
      {
        id: 8,
      },
      {
        id: 93,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 8,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'PE',
      city: 'Dunlo',
    },
  },
  {
    index: 226,
    name: 'Qiao',
    company_relationship: [
      {
        id: 40,
      },
      {
        id: 84,
      },
      {
        id: 38,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 7,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'SK',
      city: 'Devon',
    },
  },
  {
    index: 227,
    name: 'Enervate',
    company_relationship: [
      {
        id: 55,
      },
      {
        id: 30,
      },
      {
        id: 43,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'MB',
      city: 'Sattley',
    },
  },
  {
    index: 228,
    name: 'Genesynk',
    company_relationship: [
      {
        id: 99,
      },
      {
        id: 63,
      },
      {
        id: 96,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 5,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NB',
      city: 'Brutus',
    },
  },
  {
    index: 229,
    name: 'Fuelton',
    company_relationship: [
      {
        id: 72,
      },
      {
        id: 46,
      },
      {
        id: 89,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 3,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NB',
      city: 'Abiquiu',
    },
  },
  {
    index: 230,
    name: 'Peticular',
    company_relationship: [
      {
        id: 33,
      },
      {
        id: 10,
      },
      {
        id: 83,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 6,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'PE',
      city: 'Wolcott',
    },
  },
  {
    index: 231,
    name: 'Vendblend',
    company_relationship: [
      {
        id: 36,
      },
      {
        id: 36,
      },
      {
        id: 74,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 7,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NT',
      city: 'Smeltertown',
    },
  },
  {
    index: 232,
    name: 'Assurity',
    company_relationship: [
      {
        id: 19,
      },
      {
        id: 68,
      },
      {
        id: 59,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 10,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'AB',
      city: 'Fresno',
    },
  },
  {
    index: 233,
    name: 'Waab',
    company_relationship: [
      {
        id: 19,
      },
      {
        id: 21,
      },
      {
        id: 93,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'BC',
      city: 'Haring',
    },
  },
  {
    index: 234,
    name: 'Poochies',
    company_relationship: [
      {
        id: 40,
      },
      {
        id: 14,
      },
      {
        id: 82,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 1,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'PE',
      city: 'Omar',
    },
  },
  {
    index: 235,
    name: 'Gorganic',
    company_relationship: [
      {
        id: 87,
      },
      {
        id: 64,
      },
      {
        id: 87,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 10,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'MB',
      city: 'Makena',
    },
  },
  {
    index: 236,
    name: 'Memora',
    company_relationship: [
      {
        id: 86,
      },
      {
        id: 32,
      },
      {
        id: 63,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 0,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NS',
      city: 'Allendale',
    },
  },
  {
    index: 237,
    name: 'Cowtown',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 35,
      },
      {
        id: 64,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NL',
      city: 'Barclay',
    },
  },
  {
    index: 238,
    name: 'Fitcore',
    company_relationship: [
      {
        id: 4,
      },
      {
        id: 95,
      },
      {
        id: 85,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 3,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'MB',
      city: 'Vallonia',
    },
  },
  {
    index: 239,
    name: 'Verton',
    company_relationship: [
      {
        id: 17,
      },
      {
        id: 89,
      },
      {
        id: 73,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'ON',
      city: 'Fostoria',
    },
  },
  {
    index: 240,
    name: 'Panzent',
    company_relationship: [
      {
        id: 72,
      },
      {
        id: 48,
      },
      {
        id: 71,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 8,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'BC',
      city: 'Wildwood',
    },
  },
  {
    index: 241,
    name: 'Zounds',
    company_relationship: [
      {
        id: 87,
      },
      {
        id: 86,
      },
      {
        id: 92,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 8,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NS',
      city: 'Bennett',
    },
  },
  {
    index: 242,
    name: 'Viagreat',
    company_relationship: [
      {
        id: 59,
      },
      {
        id: 30,
      },
      {
        id: 76,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 0,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'ON',
      city: 'Onton',
    },
  },
  {
    index: 243,
    name: 'Fortean',
    company_relationship: [
      {
        id: 35,
      },
      {
        id: 77,
      },
      {
        id: 1,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'SK',
      city: 'Bellfountain',
    },
  },
  {
    index: 244,
    name: 'Dymi',
    company_relationship: [
      {
        id: 4,
      },
      {
        id: 41,
      },
      {
        id: 19,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 8,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NS',
      city: 'Cucumber',
    },
  },
  {
    index: 245,
    name: 'Pushcart',
    company_relationship: [
      {
        id: 9,
      },
      {
        id: 72,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 7,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NB',
      city: 'Richmond',
    },
  },
  {
    index: 246,
    name: 'Cytrak',
    company_relationship: [
      {
        id: 88,
      },
      {
        id: 9,
      },
      {
        id: 70,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 4,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'SK',
      city: 'Ruckersville',
    },
  },
  {
    index: 247,
    name: 'Hotcakes',
    company_relationship: [
      {
        id: 82,
      },
      {
        id: 15,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 2,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'ON',
      city: 'Century',
    },
  },
  {
    index: 248,
    name: 'Cogentry',
    company_relationship: [
      {
        id: 34,
      },
      {
        id: 16,
      },
      {
        id: 13,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 2,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'MB',
      city: 'Carrsville',
    },
  },
  {
    index: 249,
    name: 'Empirica',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 18,
      },
      {
        id: 73,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 7,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NS',
      city: 'Choctaw',
    },
  },
  {
    index: 250,
    name: 'Retrack',
    company_relationship: [
      {
        id: 28,
      },
      {
        id: 23,
      },
      {
        id: 36,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 8,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'YT',
      city: 'Albrightsville',
    },
  },
  {
    index: 251,
    name: 'Dadabase',
    company_relationship: [
      {
        id: 90,
      },
      {
        id: 59,
      },
      {
        id: 74,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 9,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'PE',
      city: 'Manitou',
    },
  },
  {
    index: 252,
    name: 'Arctiq',
    company_relationship: [
      {
        id: 45,
      },
      {
        id: 46,
      },
      {
        id: 0,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 10,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'SK',
      city: 'Darlington',
    },
  },
  {
    index: 253,
    name: 'Bleeko',
    company_relationship: [
      {
        id: 38,
      },
      {
        id: 91,
      },
      {
        id: 92,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 4,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'YT',
      city: 'Fruitdale',
    },
  },
  {
    index: 254,
    name: 'Synkgen',
    company_relationship: [
      {
        id: 65,
      },
      {
        id: 74,
      },
      {
        id: 98,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 3,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'PE',
      city: 'Joes',
    },
  },
  {
    index: 255,
    name: 'Nipaz',
    company_relationship: [
      {
        id: 70,
      },
      {
        id: 12,
      },
      {
        id: 92,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'MB',
      city: 'Chloride',
    },
  },
  {
    index: 256,
    name: 'Geekosis',
    company_relationship: [
      {
        id: 19,
      },
      {
        id: 56,
      },
      {
        id: 56,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 6,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'QC',
      city: 'Floriston',
    },
  },
  {
    index: 257,
    name: 'Kneedles',
    company_relationship: [
      {
        id: 8,
      },
      {
        id: 78,
      },
      {
        id: 39,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'PE',
      city: 'Rodman',
    },
  },
  {
    index: 258,
    name: 'Virva',
    company_relationship: [
      {
        id: 93,
      },
      {
        id: 82,
      },
      {
        id: 60,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 10,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NT',
      city: 'Gordon',
    },
  },
  {
    index: 259,
    name: 'Extragene',
    company_relationship: [
      {
        id: 25,
      },
      {
        id: 21,
      },
      {
        id: 27,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 9,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'MB',
      city: 'Roderfield',
    },
  },
  {
    index: 260,
    name: 'Geekmosis',
    company_relationship: [
      {
        id: 37,
      },
      {
        id: 0,
      },
      {
        id: 79,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 4,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'AB',
      city: 'Williston',
    },
  },
  {
    index: 261,
    name: 'Isbol',
    company_relationship: [
      {
        id: 32,
      },
      {
        id: 92,
      },
      {
        id: 29,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 3,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'QC',
      city: 'Shepardsville',
    },
  },
  {
    index: 262,
    name: 'Dentrex',
    company_relationship: [
      {
        id: 3,
      },
      {
        id: 3,
      },
      {
        id: 88,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 9,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'BC',
      city: 'Kula',
    },
  },
  {
    index: 263,
    name: 'Momentia',
    company_relationship: [
      {
        id: 91,
      },
      {
        id: 14,
      },
      {
        id: 33,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 7,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'PE',
      city: 'Shrewsbury',
    },
  },
  {
    index: 264,
    name: 'Frosnex',
    company_relationship: [
      {
        id: 0,
      },
      {
        id: 83,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 10,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'ON',
      city: 'Aguila',
    },
  },
  {
    index: 265,
    name: 'Locazone',
    company_relationship: [
      {
        id: 20,
      },
      {
        id: 56,
      },
      {
        id: 48,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'SK',
      city: 'Vivian',
    },
  },
  {
    index: 266,
    name: 'Zedalis',
    company_relationship: [
      {
        id: 75,
      },
      {
        id: 84,
      },
      {
        id: 66,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'SK',
      city: 'Kaka',
    },
  },
  {
    index: 267,
    name: 'Brainclip',
    company_relationship: [
      {
        id: 5,
      },
      {
        id: 14,
      },
      {
        id: 94,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 2,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NL',
      city: 'Avalon',
    },
  },
  {
    index: 268,
    name: 'Buzzmaker',
    company_relationship: [
      {
        id: 6,
      },
      {
        id: 46,
      },
      {
        id: 12,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 10,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'ON',
      city: 'Greenbush',
    },
  },
  {
    index: 269,
    name: 'Qimonk',
    company_relationship: [
      {
        id: 7,
      },
      {
        id: 77,
      },
      {
        id: 69,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 2,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NL',
      city: 'Fivepointville',
    },
  },
  {
    index: 270,
    name: 'Quailcom',
    company_relationship: [
      {
        id: 14,
      },
      {
        id: 68,
      },
      {
        id: 20,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 0,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'MB',
      city: 'Leyner',
    },
  },
  {
    index: 271,
    name: 'Suretech',
    company_relationship: [
      {
        id: 11,
      },
      {
        id: 89,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 8,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'MB',
      city: 'Whitestone',
    },
  },
  {
    index: 272,
    name: 'Comveyor',
    company_relationship: [
      {
        id: 54,
      },
      {
        id: 54,
      },
      {
        id: 19,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 4,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NB',
      city: 'Glenshaw',
    },
  },
  {
    index: 273,
    name: 'Calcu',
    company_relationship: [
      {
        id: 96,
      },
      {
        id: 62,
      },
      {
        id: 20,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 8,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NS',
      city: 'Vaughn',
    },
  },
  {
    index: 274,
    name: 'Bugsall',
    company_relationship: [
      {
        id: 36,
      },
      {
        id: 8,
      },
      {
        id: 75,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 10,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NB',
      city: 'Oberlin',
    },
  },
  {
    index: 275,
    name: 'Digifad',
    company_relationship: [
      {
        id: 37,
      },
      {
        id: 91,
      },
      {
        id: 45,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 9,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NL',
      city: 'Veyo',
    },
  },
  {
    index: 276,
    name: 'Eventex',
    company_relationship: [
      {
        id: 61,
      },
      {
        id: 68,
      },
      {
        id: 80,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 7,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NB',
      city: 'Cashtown',
    },
  },
  {
    index: 277,
    name: 'Zilphur',
    company_relationship: [
      {
        id: 37,
      },
      {
        id: 67,
      },
      {
        id: 22,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 3,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'AB',
      city: 'Grapeview',
    },
  },
  {
    index: 278,
    name: 'Geeketron',
    company_relationship: [
      {
        id: 56,
      },
      {
        id: 87,
      },
      {
        id: 73,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 7,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'MB',
      city: 'Harold',
    },
  },
  {
    index: 279,
    name: 'Ceprene',
    company_relationship: [
      {
        id: 16,
      },
      {
        id: 92,
      },
      {
        id: 26,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 8,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NS',
      city: 'Hardyville',
    },
  },
  {
    index: 280,
    name: 'Velity',
    company_relationship: [
      {
        id: 50,
      },
      {
        id: 64,
      },
      {
        id: 64,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 6,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'SK',
      city: 'Cliffside',
    },
  },
  {
    index: 281,
    name: 'Bezal',
    company_relationship: [
      {
        id: 51,
      },
      {
        id: 31,
      },
      {
        id: 51,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 2,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'YT',
      city: 'Malott',
    },
  },
  {
    index: 282,
    name: 'Zork',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 8,
      },
      {
        id: 44,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 4,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'BC',
      city: 'Machias',
    },
  },
  {
    index: 283,
    name: 'Hinway',
    company_relationship: [
      {
        id: 21,
      },
      {
        id: 54,
      },
      {
        id: 39,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NB',
      city: 'Osmond',
    },
  },
  {
    index: 284,
    name: 'Emtrac',
    company_relationship: [
      {
        id: 32,
      },
      {
        id: 64,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 5,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NB',
      city: 'Hegins',
    },
  },
  {
    index: 285,
    name: 'Insurety',
    company_relationship: [
      {
        id: 10,
      },
      {
        id: 47,
      },
      {
        id: 55,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 3,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'SK',
      city: 'Sunnyside',
    },
  },
  {
    index: 286,
    name: 'Motovate',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 13,
      },
      {
        id: 60,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 2,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'PE',
      city: 'Saranap',
    },
  },
  {
    index: 287,
    name: 'Gogol',
    company_relationship: [
      {
        id: 86,
      },
      {
        id: 92,
      },
      {
        id: 92,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'YT',
      city: 'Hamilton',
    },
  },
  {
    index: 288,
    name: 'Zillanet',
    company_relationship: [
      {
        id: 82,
      },
      {
        id: 97,
      },
      {
        id: 88,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 8,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'PE',
      city: 'Winesburg',
    },
  },
  {
    index: 289,
    name: 'Daycore',
    company_relationship: [
      {
        id: 48,
      },
      {
        id: 5,
      },
      {
        id: 74,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 3,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NL',
      city: 'Utting',
    },
  },
  {
    index: 290,
    name: 'Rooforia',
    company_relationship: [
      {
        id: 59,
      },
      {
        id: 35,
      },
      {
        id: 29,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 8,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NL',
      city: 'Moquino',
    },
  },
  {
    index: 291,
    name: 'Xoggle',
    company_relationship: [
      {
        id: 84,
      },
      {
        id: 16,
      },
      {
        id: 59,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 8,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NL',
      city: 'Chalfant',
    },
  },
  {
    index: 292,
    name: 'Automon',
    company_relationship: [
      {
        id: 91,
      },
      {
        id: 87,
      },
      {
        id: 72,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 0,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NS',
      city: 'Siglerville',
    },
  },
  {
    index: 293,
    name: 'Protodyne',
    company_relationship: [
      {
        id: 70,
      },
      {
        id: 58,
      },
      {
        id: 15,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 8,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'ON',
      city: 'Thomasville',
    },
  },
  {
    index: 294,
    name: 'Anocha',
    company_relationship: [
      {
        id: 86,
      },
      {
        id: 21,
      },
      {
        id: 65,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 9,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'AB',
      city: 'Clayville',
    },
  },
  {
    index: 295,
    name: 'Sultrax',
    company_relationship: [
      {
        id: 12,
      },
      {
        id: 57,
      },
      {
        id: 4,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 0,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'SK',
      city: 'Monument',
    },
  },
  {
    index: 296,
    name: 'Talae',
    company_relationship: [
      {
        id: 53,
      },
      {
        id: 40,
      },
      {
        id: 61,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 5,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'YT',
      city: 'Idledale',
    },
  },
  {
    index: 297,
    name: 'Fishland',
    company_relationship: [
      {
        id: 57,
      },
      {
        id: 12,
      },
      {
        id: 18,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 6,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'BC',
      city: 'Virgie',
    },
  },
  {
    index: 298,
    name: 'Oceanica',
    company_relationship: [
      {
        id: 87,
      },
      {
        id: 39,
      },
      {
        id: 9,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 6,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'PE',
      city: 'Welch',
    },
  },
  {
    index: 299,
    name: 'Amril',
    company_relationship: [
      {
        id: 91,
      },
      {
        id: 52,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 10,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NB',
      city: 'Sutton',
    },
  },
  {
    index: 300,
    name: 'Centree',
    company_relationship: [
      {
        id: 82,
      },
      {
        id: 21,
      },
      {
        id: 22,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 2,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'BC',
      city: 'Cowiche',
    },
  },
  {
    index: 301,
    name: 'Portica',
    company_relationship: [
      {
        id: 97,
      },
      {
        id: 60,
      },
      {
        id: 56,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 3,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'BC',
      city: 'Osage',
    },
  },
  {
    index: 302,
    name: 'Obones',
    company_relationship: [
      {
        id: 69,
      },
      {
        id: 16,
      },
      {
        id: 88,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NL',
      city: 'Maury',
    },
  },
  {
    index: 303,
    name: 'Decratex',
    company_relationship: [
      {
        id: 30,
      },
      {
        id: 75,
      },
      {
        id: 38,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 8,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'QC',
      city: 'Enoree',
    },
  },
  {
    index: 304,
    name: 'Ohmnet',
    company_relationship: [
      {
        id: 53,
      },
      {
        id: 60,
      },
      {
        id: 1,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 6,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'MB',
      city: 'Frierson',
    },
  },
  {
    index: 305,
    name: 'Pheast',
    company_relationship: [
      {
        id: 76,
      },
      {
        id: 63,
      },
      {
        id: 55,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'YT',
      city: 'Boykin',
    },
  },
  {
    index: 306,
    name: 'Plasmosis',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 20,
      },
      {
        id: 56,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 7,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'AB',
      city: 'Frank',
    },
  },
  {
    index: 307,
    name: 'Animalia',
    company_relationship: [
      {
        id: 11,
      },
      {
        id: 38,
      },
      {
        id: 80,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 1,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'QC',
      city: 'Fidelis',
    },
  },
  {
    index: 308,
    name: 'Sloganaut',
    company_relationship: [
      {
        id: 21,
      },
      {
        id: 22,
      },
      {
        id: 99,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'YT',
      city: 'Retsof',
    },
  },
  {
    index: 309,
    name: 'Datagen',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 44,
      },
      {
        id: 38,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 6,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'SK',
      city: 'Brooktrails',
    },
  },
  {
    index: 310,
    name: 'Extro',
    company_relationship: [
      {
        id: 14,
      },
      {
        id: 6,
      },
      {
        id: 46,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 4,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'PE',
      city: 'Ballico',
    },
  },
  {
    index: 311,
    name: 'Ronelon',
    company_relationship: [
      {
        id: 69,
      },
      {
        id: 82,
      },
      {
        id: 69,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 0,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'PE',
      city: 'Ruffin',
    },
  },
  {
    index: 312,
    name: 'Zerbina',
    company_relationship: [
      {
        id: 37,
      },
      {
        id: 9,
      },
      {
        id: 56,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 7,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NU',
      city: 'Wauhillau',
    },
  },
  {
    index: 313,
    name: 'Typhonica',
    company_relationship: [
      {
        id: 2,
      },
      {
        id: 15,
      },
      {
        id: 77,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 2,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'QC',
      city: 'Rushford',
    },
  },
  {
    index: 314,
    name: 'Vidto',
    company_relationship: [
      {
        id: 7,
      },
      {
        id: 48,
      },
      {
        id: 43,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 10,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NB',
      city: 'Fontanelle',
    },
  },
  {
    index: 315,
    name: 'Idealis',
    company_relationship: [
      {
        id: 38,
      },
      {
        id: 3,
      },
      {
        id: 65,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 6,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'MB',
      city: 'Woodlake',
    },
  },
  {
    index: 316,
    name: 'Comcur',
    company_relationship: [
      {
        id: 52,
      },
      {
        id: 95,
      },
      {
        id: 62,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'BC',
      city: 'Chestnut',
    },
  },
  {
    index: 317,
    name: 'Ewaves',
    company_relationship: [
      {
        id: 67,
      },
      {
        id: 26,
      },
      {
        id: 26,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 0,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'AB',
      city: 'Sheatown',
    },
  },
  {
    index: 318,
    name: 'Geeky',
    company_relationship: [
      {
        id: 23,
      },
      {
        id: 70,
      },
      {
        id: 12,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 10,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'MB',
      city: 'Tuttle',
    },
  },
  {
    index: 319,
    name: 'Terrasys',
    company_relationship: [
      {
        id: 57,
      },
      {
        id: 87,
      },
      {
        id: 33,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 5,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NS',
      city: 'Iberia',
    },
  },
  {
    index: 320,
    name: 'Hometown',
    company_relationship: [
      {
        id: 78,
      },
      {
        id: 66,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 1,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NB',
      city: 'Cascades',
    },
  },
  {
    index: 321,
    name: 'Wazzu',
    company_relationship: [
      {
        id: 82,
      },
      {
        id: 28,
      },
      {
        id: 14,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'MB',
      city: 'Hartsville/Hartley',
    },
  },
  {
    index: 322,
    name: 'Genmy',
    company_relationship: [
      {
        id: 9,
      },
      {
        id: 30,
      },
      {
        id: 10,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 8,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'PE',
      city: 'Coleville',
    },
  },
  {
    index: 323,
    name: 'Ovium',
    company_relationship: [
      {
        id: 77,
      },
      {
        id: 56,
      },
      {
        id: 61,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 10,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NT',
      city: 'Wadsworth',
    },
  },
  {
    index: 324,
    name: 'Remold',
    company_relationship: [
      {
        id: 70,
      },
      {
        id: 77,
      },
      {
        id: 6,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 8,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'AB',
      city: 'Dalton',
    },
  },
  {
    index: 325,
    name: 'Extrawear',
    company_relationship: [
      {
        id: 95,
      },
      {
        id: 25,
      },
      {
        id: 82,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 9,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'QC',
      city: 'Ebro',
    },
  },
  {
    index: 326,
    name: 'Manufact',
    company_relationship: [
      {
        id: 17,
      },
      {
        id: 54,
      },
      {
        id: 29,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 10,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'MB',
      city: 'Wedgewood',
    },
  },
  {
    index: 327,
    name: 'Cujo',
    company_relationship: [
      {
        id: 45,
      },
      {
        id: 96,
      },
      {
        id: 85,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NS',
      city: 'Mathews',
    },
  },
  {
    index: 328,
    name: 'Nexgene',
    company_relationship: [
      {
        id: 19,
      },
      {
        id: 3,
      },
      {
        id: 76,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 0,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'PE',
      city: 'Fulford',
    },
  },
  {
    index: 329,
    name: 'Medmex',
    company_relationship: [
      {
        id: 25,
      },
      {
        id: 61,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 4,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'BC',
      city: 'Croom',
    },
  },
  {
    index: 330,
    name: 'Netility',
    company_relationship: [
      {
        id: 8,
      },
      {
        id: 93,
      },
      {
        id: 56,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 7,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NL',
      city: 'Floris',
    },
  },
  {
    index: 331,
    name: 'Vitricomp',
    company_relationship: [
      {
        id: 75,
      },
      {
        id: 45,
      },
      {
        id: 71,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 0,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'PE',
      city: 'Rutherford',
    },
  },
  {
    index: 332,
    name: 'Xixan',
    company_relationship: [
      {
        id: 66,
      },
      {
        id: 58,
      },
      {
        id: 64,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 7,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'PE',
      city: 'Munjor',
    },
  },
  {
    index: 333,
    name: 'Ultrimax',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 14,
      },
      {
        id: 60,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 6,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NS',
      city: 'Juarez',
    },
  },
  {
    index: 334,
    name: 'Isologia',
    company_relationship: [
      {
        id: 40,
      },
      {
        id: 52,
      },
      {
        id: 69,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 2,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'BC',
      city: 'Dorneyville',
    },
  },
  {
    index: 335,
    name: 'Entropix',
    company_relationship: [
      {
        id: 93,
      },
      {
        id: 43,
      },
      {
        id: 87,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 6,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'AB',
      city: 'Kenmar',
    },
  },
  {
    index: 336,
    name: 'Aquafire',
    company_relationship: [
      {
        id: 10,
      },
      {
        id: 76,
      },
      {
        id: 54,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'SK',
      city: 'Bison',
    },
  },
  {
    index: 337,
    name: 'Squish',
    company_relationship: [
      {
        id: 7,
      },
      {
        id: 5,
      },
      {
        id: 63,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 8,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'BC',
      city: 'Websterville',
    },
  },
  {
    index: 338,
    name: 'Zaggles',
    company_relationship: [
      {
        id: 43,
      },
      {
        id: 55,
      },
      {
        id: 57,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'QC',
      city: 'Freelandville',
    },
  },
  {
    index: 339,
    name: 'Radiantix',
    company_relationship: [
      {
        id: 19,
      },
      {
        id: 57,
      },
      {
        id: 42,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 0,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NL',
      city: 'Elbert',
    },
  },
  {
    index: 340,
    name: 'Virxo',
    company_relationship: [
      {
        id: 96,
      },
      {
        id: 18,
      },
      {
        id: 54,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 10,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NU',
      city: 'Alden',
    },
  },
  {
    index: 341,
    name: 'Interodeo',
    company_relationship: [
      {
        id: 91,
      },
      {
        id: 51,
      },
      {
        id: 91,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'AB',
      city: 'Tuskahoma',
    },
  },
  {
    index: 342,
    name: 'Scentric',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 30,
      },
      {
        id: 22,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 2,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NL',
      city: 'Rew',
    },
  },
  {
    index: 343,
    name: 'Exiand',
    company_relationship: [
      {
        id: 42,
      },
      {
        id: 95,
      },
      {
        id: 40,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 8,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NB',
      city: 'Santel',
    },
  },
  {
    index: 344,
    name: 'Liquidoc',
    company_relationship: [
      {
        id: 45,
      },
      {
        id: 95,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 4,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'BC',
      city: 'Cressey',
    },
  },
  {
    index: 345,
    name: 'Kineticut',
    company_relationship: [
      {
        id: 61,
      },
      {
        id: 42,
      },
      {
        id: 1,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'SK',
      city: 'Clinton',
    },
  },
  {
    index: 346,
    name: 'Zizzle',
    company_relationship: [
      {
        id: 1,
      },
      {
        id: 27,
      },
      {
        id: 54,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 7,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'SK',
      city: 'Hayden',
    },
  },
  {
    index: 347,
    name: 'Mobildata',
    company_relationship: [
      {
        id: 45,
      },
      {
        id: 98,
      },
      {
        id: 16,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 10,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NB',
      city: 'Longbranch',
    },
  },
  {
    index: 348,
    name: 'Ecolight',
    company_relationship: [
      {
        id: 43,
      },
      {
        id: 98,
      },
      {
        id: 89,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 9,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'ON',
      city: 'Bartley',
    },
  },
  {
    index: 349,
    name: 'Anivet',
    company_relationship: [
      {
        id: 41,
      },
      {
        id: 30,
      },
      {
        id: 50,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 6,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'PE',
      city: 'Ryderwood',
    },
  },
  {
    index: 350,
    name: 'Permadyne',
    company_relationship: [
      {
        id: 52,
      },
      {
        id: 96,
      },
      {
        id: 14,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 3,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'QC',
      city: 'Spokane',
    },
  },
  {
    index: 351,
    name: 'Frenex',
    company_relationship: [
      {
        id: 90,
      },
      {
        id: 67,
      },
      {
        id: 25,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 5,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NS',
      city: 'Kieler',
    },
  },
  {
    index: 352,
    name: 'Nikuda',
    company_relationship: [
      {
        id: 72,
      },
      {
        id: 73,
      },
      {
        id: 95,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 0,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'MB',
      city: 'Alleghenyville',
    },
  },
  {
    index: 353,
    name: 'Imperium',
    company_relationship: [
      {
        id: 7,
      },
      {
        id: 81,
      },
      {
        id: 71,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 10,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'ON',
      city: 'Escondida',
    },
  },
  {
    index: 354,
    name: 'Gushkool',
    company_relationship: [
      {
        id: 75,
      },
      {
        id: 69,
      },
      {
        id: 85,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 8,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'MB',
      city: 'Wawona',
    },
  },
  {
    index: 355,
    name: 'Scenty',
    company_relationship: [
      {
        id: 48,
      },
      {
        id: 58,
      },
      {
        id: 23,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 7,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NU',
      city: 'Stevens',
    },
  },
  {
    index: 356,
    name: 'Portaline',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 66,
      },
      {
        id: 49,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 7,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NS',
      city: 'Chelsea',
    },
  },
  {
    index: 357,
    name: 'Zentia',
    company_relationship: [
      {
        id: 10,
      },
      {
        id: 7,
      },
      {
        id: 46,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 2,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NB',
      city: 'Chamberino',
    },
  },
  {
    index: 358,
    name: 'Exodoc',
    company_relationship: [
      {
        id: 39,
      },
      {
        id: 49,
      },
      {
        id: 37,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 3,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'AB',
      city: 'Islandia',
    },
  },
  {
    index: 359,
    name: 'Netropic',
    company_relationship: [
      {
        id: 17,
      },
      {
        id: 47,
      },
      {
        id: 100,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 10,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NU',
      city: 'Eagleville',
    },
  },
  {
    index: 360,
    name: 'Enerforce',
    company_relationship: [
      {
        id: 55,
      },
      {
        id: 42,
      },
      {
        id: 62,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NS',
      city: 'Felt',
    },
  },
  {
    index: 361,
    name: 'Everest',
    company_relationship: [
      {
        id: 42,
      },
      {
        id: 7,
      },
      {
        id: 19,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 9,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'PE',
      city: 'Salunga',
    },
  },
  {
    index: 362,
    name: 'Xerex',
    company_relationship: [
      {
        id: 82,
      },
      {
        id: 48,
      },
      {
        id: 40,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 6,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NB',
      city: 'Skyland',
    },
  },
  {
    index: 363,
    name: 'Eventage',
    company_relationship: [
      {
        id: 83,
      },
      {
        id: 79,
      },
      {
        id: 18,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 6,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NU',
      city: 'Belvoir',
    },
  },
  {
    index: 364,
    name: 'Qot',
    company_relationship: [
      {
        id: 76,
      },
      {
        id: 17,
      },
      {
        id: 61,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 6,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NT',
      city: 'Jessie',
    },
  },
  {
    index: 365,
    name: 'Pyramis',
    company_relationship: [
      {
        id: 4,
      },
      {
        id: 99,
      },
      {
        id: 62,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NS',
      city: 'Hampstead',
    },
  },
  {
    index: 366,
    name: 'Collaire',
    company_relationship: [
      {
        id: 70,
      },
      {
        id: 91,
      },
      {
        id: 94,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 0,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'YT',
      city: 'Herlong',
    },
  },
  {
    index: 367,
    name: 'Furnafix',
    company_relationship: [
      {
        id: 94,
      },
      {
        id: 97,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 8,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NL',
      city: 'Mayfair',
    },
  },
  {
    index: 368,
    name: 'Megall',
    company_relationship: [
      {
        id: 29,
      },
      {
        id: 38,
      },
      {
        id: 12,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'PE',
      city: 'Eggertsville',
    },
  },
  {
    index: 369,
    name: 'Ovation',
    company_relationship: [
      {
        id: 39,
      },
      {
        id: 96,
      },
      {
        id: 22,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 8,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NU',
      city: 'Garfield',
    },
  },
  {
    index: 370,
    name: 'Idego',
    company_relationship: [
      {
        id: 56,
      },
      {
        id: 83,
      },
      {
        id: 14,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 6,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'ON',
      city: 'Ola',
    },
  },
  {
    index: 371,
    name: 'Hopeli',
    company_relationship: [
      {
        id: 82,
      },
      {
        id: 70,
      },
      {
        id: 60,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 5,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'AB',
      city: 'Elizaville',
    },
  },
  {
    index: 372,
    name: 'Digique',
    company_relationship: [
      {
        id: 36,
      },
      {
        id: 17,
      },
      {
        id: 49,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 6,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'QC',
      city: 'Hinsdale',
    },
  },
  {
    index: 373,
    name: 'Optique',
    company_relationship: [
      {
        id: 19,
      },
      {
        id: 55,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NS',
      city: 'Newcastle',
    },
  },
  {
    index: 374,
    name: 'Eyewax',
    company_relationship: [
      {
        id: 54,
      },
      {
        id: 31,
      },
      {
        id: 10,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 7,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'YT',
      city: 'Jardine',
    },
  },
  {
    index: 375,
    name: 'Teraprene',
    company_relationship: [
      {
        id: 44,
      },
      {
        id: 96,
      },
      {
        id: 98,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'YT',
      city: 'Darrtown',
    },
  },
  {
    index: 376,
    name: 'Equitax',
    company_relationship: [
      {
        id: 45,
      },
      {
        id: 1,
      },
      {
        id: 68,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 2,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NS',
      city: 'Mammoth',
    },
  },
  {
    index: 377,
    name: 'Immunics',
    company_relationship: [
      {
        id: 34,
      },
      {
        id: 8,
      },
      {
        id: 53,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NB',
      city: 'Caln',
    },
  },
  {
    index: 378,
    name: 'Bunga',
    company_relationship: [
      {
        id: 95,
      },
      {
        id: 80,
      },
      {
        id: 66,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 3,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NB',
      city: 'Blodgett',
    },
  },
  {
    index: 379,
    name: 'Zentury',
    company_relationship: [
      {
        id: 75,
      },
      {
        id: 22,
      },
      {
        id: 5,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 6,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'BC',
      city: 'Elliston',
    },
  },
  {
    index: 380,
    name: 'Mantro',
    company_relationship: [
      {
        id: 19,
      },
      {
        id: 88,
      },
      {
        id: 25,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 7,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'ON',
      city: 'Cedarville',
    },
  },
  {
    index: 381,
    name: 'Biospan',
    company_relationship: [
      {
        id: 7,
      },
      {
        id: 100,
      },
      {
        id: 7,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'BC',
      city: 'Sena',
    },
  },
  {
    index: 382,
    name: 'Toyletry',
    company_relationship: [
      {
        id: 42,
      },
      {
        id: 83,
      },
      {
        id: 94,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 1,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'PE',
      city: 'Bordelonville',
    },
  },
  {
    index: 383,
    name: 'Quonk',
    company_relationship: [
      {
        id: 97,
      },
      {
        id: 60,
      },
      {
        id: 29,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NS',
      city: 'Rockingham',
    },
  },
  {
    index: 384,
    name: 'Avenetro',
    company_relationship: [
      {
        id: 86,
      },
      {
        id: 40,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 0,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'BC',
      city: 'Rivers',
    },
  },
  {
    index: 385,
    name: 'Koffee',
    company_relationship: [
      {
        id: 8,
      },
      {
        id: 50,
      },
      {
        id: 56,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 1,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'QC',
      city: 'Thornport',
    },
  },
  {
    index: 386,
    name: 'Kongle',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 89,
      },
      {
        id: 29,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NT',
      city: 'Brogan',
    },
  },
  {
    index: 387,
    name: 'Accupharm',
    company_relationship: [
      {
        id: 39,
      },
      {
        id: 93,
      },
      {
        id: 49,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 5,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'MB',
      city: 'Navarre',
    },
  },
  {
    index: 388,
    name: 'Earthmark',
    company_relationship: [
      {
        id: 17,
      },
      {
        id: 98,
      },
      {
        id: 83,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 6,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NT',
      city: 'Kanauga',
    },
  },
  {
    index: 389,
    name: 'Sulfax',
    company_relationship: [
      {
        id: 39,
      },
      {
        id: 53,
      },
      {
        id: 7,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 10,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'AB',
      city: 'Efland',
    },
  },
  {
    index: 390,
    name: 'Zinca',
    company_relationship: [
      {
        id: 30,
      },
      {
        id: 40,
      },
      {
        id: 6,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 0,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NT',
      city: 'Sanborn',
    },
  },
  {
    index: 391,
    name: 'Aquasure',
    company_relationship: [
      {
        id: 20,
      },
      {
        id: 33,
      },
      {
        id: 72,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 8,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NS',
      city: 'Salvo',
    },
  },
  {
    index: 392,
    name: 'Inear',
    company_relationship: [
      {
        id: 46,
      },
      {
        id: 76,
      },
      {
        id: 40,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 7,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'ON',
      city: 'Bend',
    },
  },
  {
    index: 393,
    name: 'Helixo',
    company_relationship: [
      {
        id: 4,
      },
      {
        id: 74,
      },
      {
        id: 32,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'AB',
      city: 'Warren',
    },
  },
  {
    index: 394,
    name: 'Fuelworks',
    company_relationship: [
      {
        id: 94,
      },
      {
        id: 70,
      },
      {
        id: 14,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 7,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NL',
      city: 'Levant',
    },
  },
  {
    index: 395,
    name: 'Electonic',
    company_relationship: [
      {
        id: 54,
      },
      {
        id: 36,
      },
      {
        id: 20,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 9,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'PE',
      city: 'Finzel',
    },
  },
  {
    index: 396,
    name: 'Zilladyne',
    company_relationship: [
      {
        id: 91,
      },
      {
        id: 66,
      },
      {
        id: 64,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 6,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NT',
      city: 'Catherine',
    },
  },
  {
    index: 397,
    name: 'Snacktion',
    company_relationship: [
      {
        id: 36,
      },
      {
        id: 45,
      },
      {
        id: 76,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 3,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'PE',
      city: 'Sandston',
    },
  },
  {
    index: 398,
    name: 'Medesign',
    company_relationship: [
      {
        id: 82,
      },
      {
        id: 24,
      },
      {
        id: 69,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 9,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NL',
      city: 'Sardis',
    },
  },
  {
    index: 399,
    name: 'Aquacine',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 44,
      },
      {
        id: 72,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 4,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'SK',
      city: 'Deercroft',
    },
  },
  {
    index: 400,
    name: 'Ozean',
    company_relationship: [
      {
        id: 86,
      },
      {
        id: 58,
      },
      {
        id: 48,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'SK',
      city: 'Bayview',
    },
  },
  {
    index: 401,
    name: 'Paragonia',
    company_relationship: [
      {
        id: 95,
      },
      {
        id: 43,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 8,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'AB',
      city: 'Worton',
    },
  },
  {
    index: 402,
    name: 'Krag',
    company_relationship: [
      {
        id: 40,
      },
      {
        id: 25,
      },
      {
        id: 8,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 9,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NB',
      city: 'Teasdale',
    },
  },
  {
    index: 403,
    name: 'Sustenza',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 11,
      },
      {
        id: 75,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 1,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'BC',
      city: 'Allison',
    },
  },
  {
    index: 404,
    name: 'Sentia',
    company_relationship: [
      {
        id: 56,
      },
      {
        id: 3,
      },
      {
        id: 33,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NU',
      city: 'Grantville',
    },
  },
  {
    index: 405,
    name: 'Deviltoe',
    company_relationship: [
      {
        id: 99,
      },
      {
        id: 76,
      },
      {
        id: 44,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 4,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'MB',
      city: 'Nadine',
    },
  },
  {
    index: 406,
    name: 'Furnigeer',
    company_relationship: [
      {
        id: 90,
      },
      {
        id: 27,
      },
      {
        id: 64,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'YT',
      city: 'Leroy',
    },
  },
  {
    index: 407,
    name: 'Daido',
    company_relationship: [
      {
        id: 67,
      },
      {
        id: 19,
      },
      {
        id: 24,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 7,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'QC',
      city: 'Lowell',
    },
  },
  {
    index: 408,
    name: 'Kangle',
    company_relationship: [
      {
        id: 25,
      },
      {
        id: 28,
      },
      {
        id: 13,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 1,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NL',
      city: 'Abrams',
    },
  },
  {
    index: 409,
    name: 'Isosphere',
    company_relationship: [
      {
        id: 89,
      },
      {
        id: 83,
      },
      {
        id: 92,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 7,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NT',
      city: 'Byrnedale',
    },
  },
  {
    index: 410,
    name: 'Tetak',
    company_relationship: [
      {
        id: 53,
      },
      {
        id: 79,
      },
      {
        id: 18,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 0,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NB',
      city: 'Holtville',
    },
  },
  {
    index: 411,
    name: 'Zolar',
    company_relationship: [
      {
        id: 73,
      },
      {
        id: 91,
      },
      {
        id: 44,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 0,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'BC',
      city: 'Healy',
    },
  },
  {
    index: 412,
    name: 'Eargo',
    company_relationship: [
      {
        id: 92,
      },
      {
        id: 12,
      },
      {
        id: 92,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 0,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'PE',
      city: 'Lawrence',
    },
  },
  {
    index: 413,
    name: 'Stralum',
    company_relationship: [
      {
        id: 93,
      },
      {
        id: 76,
      },
      {
        id: 18,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 7,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'ON',
      city: 'Delco',
    },
  },
  {
    index: 414,
    name: 'Unia',
    company_relationship: [
      {
        id: 70,
      },
      {
        id: 45,
      },
      {
        id: 64,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 4,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'PE',
      city: 'Guthrie',
    },
  },
  {
    index: 415,
    name: 'Talendula',
    company_relationship: [
      {
        id: 94,
      },
      {
        id: 37,
      },
      {
        id: 59,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 2,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NT',
      city: 'Robbins',
    },
  },
  {
    index: 416,
    name: 'Orbalix',
    company_relationship: [
      {
        id: 62,
      },
      {
        id: 19,
      },
      {
        id: 91,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 1,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'ON',
      city: 'Herald',
    },
  },
  {
    index: 417,
    name: 'Gracker',
    company_relationship: [
      {
        id: 86,
      },
      {
        id: 10,
      },
      {
        id: 19,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 10,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NS',
      city: 'Imperial',
    },
  },
  {
    index: 418,
    name: 'Quinex',
    company_relationship: [
      {
        id: 33,
      },
      {
        id: 64,
      },
      {
        id: 56,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NS',
      city: 'Strykersville',
    },
  },
  {
    index: 419,
    name: 'Bullzone',
    company_relationship: [
      {
        id: 69,
      },
      {
        id: 87,
      },
      {
        id: 83,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 7,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'NB',
      city: 'Hemlock',
    },
  },
  {
    index: 420,
    name: 'Housedown',
    company_relationship: [
      {
        id: 92,
      },
      {
        id: 38,
      },
      {
        id: 63,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'AB',
      city: 'Boomer',
    },
  },
  {
    index: 421,
    name: 'Genmom',
    company_relationship: [
      {
        id: 40,
      },
      {
        id: 81,
      },
      {
        id: 26,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 5,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'QC',
      city: 'Rehrersburg',
    },
  },
  {
    index: 422,
    name: 'Uncorp',
    company_relationship: [
      {
        id: 91,
      },
      {
        id: 15,
      },
      {
        id: 59,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 8,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'ON',
      city: 'Ernstville',
    },
  },
  {
    index: 423,
    name: 'Gallaxia',
    company_relationship: [
      {
        id: 69,
      },
      {
        id: 71,
      },
      {
        id: 100,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 4,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'PE',
      city: 'Woodlands',
    },
  },
  {
    index: 424,
    name: 'Prowaste',
    company_relationship: [
      {
        id: 83,
      },
      {
        id: 85,
      },
      {
        id: 27,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 3,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NT',
      city: 'Saticoy',
    },
  },
  {
    index: 425,
    name: 'Valpreal',
    company_relationship: [
      {
        id: 96,
      },
      {
        id: 82,
      },
      {
        id: 22,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 6,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'QC',
      city: 'Gardners',
    },
  },
  {
    index: 426,
    name: 'Steelfab',
    company_relationship: [
      {
        id: 18,
      },
      {
        id: 17,
      },
      {
        id: 97,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 8,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'ON',
      city: 'Concho',
    },
  },
  {
    index: 427,
    name: 'Pathways',
    company_relationship: [
      {
        id: 64,
      },
      {
        id: 79,
      },
      {
        id: 50,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 8,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'MB',
      city: 'Zeba',
    },
  },
  {
    index: 428,
    name: 'Slumberia',
    company_relationship: [
      {
        id: 94,
      },
      {
        id: 99,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 9,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NT',
      city: 'Vernon',
    },
  },
  {
    index: 429,
    name: 'Vicon',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 26,
      },
      {
        id: 62,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 7,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'MB',
      city: 'Wheaton',
    },
  },
  {
    index: 430,
    name: 'Endicil',
    company_relationship: [
      {
        id: 92,
      },
      {
        id: 28,
      },
      {
        id: 45,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 5,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'ON',
      city: 'Jugtown',
    },
  },
  {
    index: 431,
    name: 'Primordia',
    company_relationship: [
      {
        id: 78,
      },
      {
        id: 31,
      },
      {
        id: 31,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'PE',
      city: 'Westboro',
    },
  },
  {
    index: 432,
    name: 'Uxmox',
    company_relationship: [
      {
        id: 96,
      },
      {
        id: 63,
      },
      {
        id: 78,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 2,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'BC',
      city: 'Orick',
    },
  },
  {
    index: 433,
    name: 'Sybixtex',
    company_relationship: [
      {
        id: 25,
      },
      {
        id: 6,
      },
      {
        id: 48,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'PE',
      city: 'Echo',
    },
  },
  {
    index: 434,
    name: 'Cipromox',
    company_relationship: [
      {
        id: 96,
      },
      {
        id: 31,
      },
      {
        id: 69,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 8,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'PE',
      city: 'Drummond',
    },
  },
  {
    index: 435,
    name: 'Petigems',
    company_relationship: [
      {
        id: 42,
      },
      {
        id: 6,
      },
      {
        id: 93,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 1,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'BC',
      city: 'Courtland',
    },
  },
  {
    index: 436,
    name: 'Shadease',
    company_relationship: [
      {
        id: 25,
      },
      {
        id: 39,
      },
      {
        id: 72,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'YT',
      city: 'Clarktown',
    },
  },
  {
    index: 437,
    name: 'Overplex',
    company_relationship: [
      {
        id: 85,
      },
      {
        id: 96,
      },
      {
        id: 15,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 9,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NS',
      city: 'Ypsilanti',
    },
  },
  {
    index: 438,
    name: 'Tribalog',
    company_relationship: [
      {
        id: 47,
      },
      {
        id: 23,
      },
      {
        id: 31,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 5,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'MB',
      city: 'Coldiron',
    },
  },
  {
    index: 439,
    name: 'Orbean',
    company_relationship: [
      {
        id: 22,
      },
      {
        id: 30,
      },
      {
        id: 72,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 3,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'QC',
      city: 'Orin',
    },
  },
  {
    index: 440,
    name: 'Zeam',
    company_relationship: [
      {
        id: 6,
      },
      {
        id: 46,
      },
      {
        id: 26,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'ON',
      city: 'Denio',
    },
  },
  {
    index: 441,
    name: 'Zaj',
    company_relationship: [
      {
        id: 30,
      },
      {
        id: 4,
      },
      {
        id: 9,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 4,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NS',
      city: 'Chesterfield',
    },
  },
  {
    index: 442,
    name: 'Proflex',
    company_relationship: [
      {
        id: 16,
      },
      {
        id: 3,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 3,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'MB',
      city: 'Elrama',
    },
  },
  {
    index: 443,
    name: 'Cormoran',
    company_relationship: [
      {
        id: 45,
      },
      {
        id: 67,
      },
      {
        id: 97,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 7,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'AB',
      city: 'Malo',
    },
  },
  {
    index: 444,
    name: 'Duflex',
    company_relationship: [
      {
        id: 44,
      },
      {
        id: 70,
      },
      {
        id: 81,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 2,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'MB',
      city: 'Westphalia',
    },
  },
  {
    index: 445,
    name: 'Firewax',
    company_relationship: [
      {
        id: 12,
      },
      {
        id: 26,
      },
      {
        id: 85,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 8,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'MB',
      city: 'Darbydale',
    },
  },
  {
    index: 446,
    name: 'Flyboyz',
    company_relationship: [
      {
        id: 75,
      },
      {
        id: 95,
      },
      {
        id: 51,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 0,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'ON',
      city: 'Fairhaven',
    },
  },
  {
    index: 447,
    name: 'Geoform',
    company_relationship: [
      {
        id: 54,
      },
      {
        id: 59,
      },
      {
        id: 82,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 6,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'PE',
      city: 'Umapine',
    },
  },
  {
    index: 448,
    name: 'Silodyne',
    company_relationship: [
      {
        id: 31,
      },
      {
        id: 15,
      },
      {
        id: 24,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 6,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'QC',
      city: 'Bluetown',
    },
  },
  {
    index: 449,
    name: 'Bizmatic',
    company_relationship: [
      {
        id: 7,
      },
      {
        id: 54,
      },
      {
        id: 96,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 8,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NS',
      city: 'Winfred',
    },
  },
  {
    index: 450,
    name: 'Pyramia',
    company_relationship: [
      {
        id: 7,
      },
      {
        id: 92,
      },
      {
        id: 100,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 9,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'NL',
      city: 'Marshall',
    },
  },
  {
    index: 451,
    name: 'Exosis',
    company_relationship: [
      {
        id: 83,
      },
      {
        id: 3,
      },
      {
        id: 1,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 9,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NU',
      city: 'Gardiner',
    },
  },
  {
    index: 452,
    name: 'Polaria',
    company_relationship: [
      {
        id: 54,
      },
      {
        id: 57,
      },
      {
        id: 54,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 10,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NT',
      city: 'Boonville',
    },
  },
  {
    index: 453,
    name: 'Medifax',
    company_relationship: [
      {
        id: 22,
      },
      {
        id: 72,
      },
      {
        id: 95,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'ON',
      city: 'Fingerville',
    },
  },
  {
    index: 454,
    name: 'Snowpoke',
    company_relationship: [
      {
        id: 38,
      },
      {
        id: 9,
      },
      {
        id: 38,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 1,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'ON',
      city: 'Wattsville',
    },
  },
  {
    index: 455,
    name: 'Cedward',
    company_relationship: [
      {
        id: 100,
      },
      {
        id: 32,
      },
      {
        id: 65,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 5,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NB',
      city: 'Alamo',
    },
  },
  {
    index: 456,
    name: 'Zolarity',
    company_relationship: [
      {
        id: 12,
      },
      {
        id: 84,
      },
      {
        id: 93,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 4,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'ON',
      city: 'Gibsonia',
    },
  },
  {
    index: 457,
    name: 'Flumbo',
    company_relationship: [
      {
        id: 8,
      },
      {
        id: 96,
      },
      {
        id: 13,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'MB',
      city: 'Kohatk',
    },
  },
  {
    index: 458,
    name: 'Skinserve',
    company_relationship: [
      {
        id: 14,
      },
      {
        id: 22,
      },
      {
        id: 85,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 4,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NU',
      city: 'Jamestown',
    },
  },
  {
    index: 459,
    name: 'Austech',
    company_relationship: [
      {
        id: 20,
      },
      {
        id: 51,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 2,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'BC',
      city: 'Bluffview',
    },
  },
  {
    index: 460,
    name: 'Earbang',
    company_relationship: [
      {
        id: 38,
      },
      {
        id: 0,
      },
      {
        id: 16,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 0,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'NS',
      city: 'Coaldale',
    },
  },
  {
    index: 461,
    name: 'Isotronic',
    company_relationship: [
      {
        id: 92,
      },
      {
        id: 42,
      },
      {
        id: 17,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 7,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'NU',
      city: 'Rivera',
    },
  },
  {
    index: 462,
    name: 'Infotrips',
    company_relationship: [
      {
        id: 1,
      },
      {
        id: 68,
      },
      {
        id: 15,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'YT',
      city: 'Jenkinsville',
    },
  },
  {
    index: 463,
    name: 'Vantage',
    company_relationship: [
      {
        id: 54,
      },
      {
        id: 88,
      },
      {
        id: 28,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 9,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'QC',
      city: 'Brule',
    },
  },
  {
    index: 464,
    name: 'Geekular',
    company_relationship: [
      {
        id: 79,
      },
      {
        id: 72,
      },
      {
        id: 4,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'BC',
      city: 'Farmington',
    },
  },
  {
    index: 465,
    name: 'Senmao',
    company_relationship: [
      {
        id: 14,
      },
      {
        id: 85,
      },
      {
        id: 22,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 7,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'ON',
      city: 'Wanship',
    },
  },
  {
    index: 466,
    name: 'Sonique',
    company_relationship: [
      {
        id: 71,
      },
      {
        id: 77,
      },
      {
        id: 31,
      },
    ],
    projects: [
      {
        id: 8,
      },
      {
        id: 9,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'PE',
      city: 'Bellamy',
    },
  },
  {
    index: 467,
    name: 'Lovepad',
    company_relationship: [
      {
        id: 83,
      },
      {
        id: 15,
      },
      {
        id: 11,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 1,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NU',
      city: 'Robinson',
    },
  },
  {
    index: 468,
    name: 'Geekko',
    company_relationship: [
      {
        id: 33,
      },
      {
        id: 87,
      },
      {
        id: 97,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 1,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'NL',
      city: 'Blanford',
    },
  },
  {
    index: 469,
    name: 'Golistic',
    company_relationship: [
      {
        id: 60,
      },
      {
        id: 86,
      },
      {
        id: 97,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 8,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'NU',
      city: 'Matthews',
    },
  },
  {
    index: 470,
    name: 'Intergeek',
    company_relationship: [
      {
        id: 75,
      },
      {
        id: 74,
      },
      {
        id: 63,
      },
    ],
    projects: [
      {
        id: 3,
      },
      {
        id: 2,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'AB',
      city: 'Evergreen',
    },
  },
  {
    index: 471,
    name: 'Gynko',
    company_relationship: [
      {
        id: 10,
      },
      {
        id: 71,
      },
      {
        id: 61,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 7,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'YT',
      city: 'Beechmont',
    },
  },
  {
    index: 472,
    name: 'Confrenzy',
    company_relationship: [
      {
        id: 8,
      },
      {
        id: 55,
      },
      {
        id: 85,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 2,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NU',
      city: 'Chesapeake',
    },
  },
  {
    index: 473,
    name: 'Visualix',
    company_relationship: [
      {
        id: 40,
      },
      {
        id: 11,
      },
      {
        id: 7,
      },
    ],
    projects: [
      {
        id: 10,
      },
      {
        id: 0,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'YT',
      city: 'Norvelt',
    },
  },
  {
    index: 474,
    name: 'Quintity',
    company_relationship: [
      {
        id: 10,
      },
      {
        id: 62,
      },
      {
        id: 94,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 10,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'QC',
      city: 'Selma',
    },
  },
  {
    index: 475,
    name: 'Entality',
    company_relationship: [
      {
        id: 76,
      },
      {
        id: 61,
      },
      {
        id: 73,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 8,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'PE',
      city: 'Edinburg',
    },
  },
  {
    index: 476,
    name: 'Zillatide',
    company_relationship: [
      {
        id: 3,
      },
      {
        id: 71,
      },
      {
        id: 73,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 7,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'NL',
      city: 'Warsaw',
    },
  },
  {
    index: 477,
    name: 'Medalert',
    company_relationship: [
      {
        id: 49,
      },
      {
        id: 24,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 7,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'AB',
      city: 'Norfolk',
    },
  },
  {
    index: 478,
    name: 'Cinaster',
    company_relationship: [
      {
        id: 88,
      },
      {
        id: 82,
      },
      {
        id: 53,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 3,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'SK',
      city: 'Thermal',
    },
  },
  {
    index: 479,
    name: 'Quiltigen',
    company_relationship: [
      {
        id: 84,
      },
      {
        id: 30,
      },
      {
        id: 43,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 0,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'MB',
      city: 'Enlow',
    },
  },
  {
    index: 480,
    name: 'Kinetica',
    company_relationship: [
      {
        id: 75,
      },
      {
        id: 8,
      },
      {
        id: 69,
      },
    ],
    projects: [
      {
        id: 7,
      },
      {
        id: 7,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'SK',
      city: 'Spelter',
    },
  },
  {
    index: 481,
    name: 'Zyple',
    company_relationship: [
      {
        id: 76,
      },
      {
        id: 86,
      },
      {
        id: 86,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 10,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NT',
      city: 'Crucible',
    },
  },
  {
    index: 482,
    name: 'Eternis',
    company_relationship: [
      {
        id: 75,
      },
      {
        id: 92,
      },
      {
        id: 2,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 4,
      },
      {
        id: 8,
      },
    ],
    location: {
      province: 'QC',
      city: 'Martell',
    },
  },
  {
    index: 483,
    name: 'Zolarex',
    company_relationship: [
      {
        id: 64,
      },
      {
        id: 67,
      },
      {
        id: 14,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 7,
      },
      {
        id: 3,
      },
    ],
    location: {
      province: 'BC',
      city: 'Baker',
    },
  },
  {
    index: 484,
    name: 'Bluegrain',
    company_relationship: [
      {
        id: 24,
      },
      {
        id: 34,
      },
      {
        id: 92,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 0,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'BC',
      city: 'Dixie',
    },
  },
  {
    index: 485,
    name: 'Farmage',
    company_relationship: [
      {
        id: 74,
      },
      {
        id: 87,
      },
      {
        id: 71,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 1,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'QC',
      city: 'Jennings',
    },
  },
  {
    index: 486,
    name: 'Affluex',
    company_relationship: [
      {
        id: 41,
      },
      {
        id: 53,
      },
      {
        id: 14,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 3,
      },
      {
        id: 6,
      },
    ],
    location: {
      province: 'QC',
      city: 'Dennard',
    },
  },
  {
    index: 487,
    name: 'Codact',
    company_relationship: [
      {
        id: 19,
      },
      {
        id: 100,
      },
      {
        id: 46,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 6,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'BC',
      city: 'Wacissa',
    },
  },
  {
    index: 488,
    name: 'Medicroix',
    company_relationship: [
      {
        id: 48,
      },
      {
        id: 62,
      },
      {
        id: 15,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 7,
      },
      {
        id: 10,
      },
    ],
    location: {
      province: 'BC',
      city: 'Brandermill',
    },
  },
  {
    index: 489,
    name: 'Cosmosis',
    company_relationship: [
      {
        id: 93,
      },
      {
        id: 90,
      },
      {
        id: 61,
      },
    ],
    projects: [
      {
        id: 6,
      },
      {
        id: 7,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'NS',
      city: 'Lewis',
    },
  },
  {
    index: 490,
    name: 'Zappix',
    company_relationship: [
      {
        id: 94,
      },
      {
        id: 34,
      },
      {
        id: 47,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 10,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'PE',
      city: 'Accoville',
    },
  },
  {
    index: 491,
    name: 'Slambda',
    company_relationship: [
      {
        id: 32,
      },
      {
        id: 75,
      },
      {
        id: 46,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 7,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'NB',
      city: 'Cartwright',
    },
  },
  {
    index: 492,
    name: 'Ronbert',
    company_relationship: [
      {
        id: 40,
      },
      {
        id: 10,
      },
      {
        id: 85,
      },
    ],
    projects: [
      {
        id: 4,
      },
      {
        id: 10,
      },
      {
        id: 5,
      },
    ],
    location: {
      province: 'SK',
      city: 'Bendon',
    },
  },
  {
    index: 493,
    name: 'Pholio',
    company_relationship: [
      {
        id: 38,
      },
      {
        id: 79,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 5,
      },
      {
        id: 7,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'BC',
      city: 'Lookingglass',
    },
  },
  {
    index: 494,
    name: 'Neurocell',
    company_relationship: [
      {
        id: 77,
      },
      {
        id: 70,
      },
      {
        id: 5,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 7,
      },
      {
        id: 4,
      },
    ],
    location: {
      province: 'NS',
      city: 'Loretto',
    },
  },
  {
    index: 495,
    name: 'Equitox',
    company_relationship: [
      {
        id: 59,
      },
      {
        id: 80,
      },
      {
        id: 50,
      },
    ],
    projects: [
      {
        id: 9,
      },
      {
        id: 6,
      },
      {
        id: 1,
      },
    ],
    location: {
      province: 'SK',
      city: 'Belfair',
    },
  },
  {
    index: 496,
    name: 'Diginetic',
    company_relationship: [
      {
        id: 66,
      },
      {
        id: 15,
      },
      {
        id: 41,
      },
    ],
    projects: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 9,
      },
    ],
    location: {
      province: 'BC',
      city: 'Woodruff',
    },
  },
  {
    index: 497,
    name: 'Zytrek',
    company_relationship: [
      {
        id: 91,
      },
      {
        id: 84,
      },
      {
        id: 52,
      },
    ],
    projects: [
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 2,
      },
    ],
    location: {
      province: 'NU',
      city: 'Vincent',
    },
  },
  {
    index: 498,
    name: 'Comtrek',
    company_relationship: [
      {
        id: 21,
      },
      {
        id: 24,
      },
      {
        id: 75,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 8,
      },
      {
        id: 0,
      },
    ],
    location: {
      province: 'BC',
      city: 'Neahkahnie',
    },
  },
  {
    index: 499,
    name: 'Edecine',
    company_relationship: [
      {
        id: 15,
      },
      {
        id: 0,
      },
      {
        id: 48,
      },
    ],
    projects: [
      {
        id: 0,
      },
      {
        id: 9,
      },
      {
        id: 7,
      },
    ],
    location: {
      province: 'QC',
      city: 'Chautauqua',
    },
  },
];


const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const canadianProvinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

const calcRayLegendData = () => {
  const WheelRayLegendData = [];
  for (let i = 0; i < companyDataSample.length; i += 1) {
    WheelRayLegendData.push({
      legend: alphabet[i],
      count: companyDataSample.filter(company => company.name.lastIndexOf(alphabet[i], 0) === 0)
        .length,
    });
  }
  return WheelRayLegendData;
};

function groupByProperty(collection, property) {
  let i = 0;
  const values = [];
  const result = [];
  for (i; i < collection.length; i += 1) {
    if (values.indexOf(collection[i].location[property]) === -1) {
      values.push(collection[i].location[property]);
      // eslint-disable-next-line no-loop-func
      result.push({
        count: collection.filter(v => v.location[property] === collection[i].location[property]).length,
        legend: collection[i].location[property],
      });
    }
  }
  return result;
}

const companyWheelData = calcRayLegendData();


const locationWheelData = groupByProperty(companyDataSample, 'province');
const locationWheelItems = companyDataSample.length;

export { companyWheelData, locationWheelData, locationWheelItems };
