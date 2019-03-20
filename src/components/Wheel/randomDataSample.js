import randomProjects from './randomProjects';

const companyDataSample = [
  {
    _id: '5433ce88-f40d-4e90-84f9-980849a26910',
    company_name: 'Keengenaskjdfjhaslkdjkjlashfjashdfkjashdf',
    location: {
      province: 'ON',
      city: 'Brazos',
    },
  },
  {
    _id: '30678fc4-8b43-4c7b-a8c3-2b8b94fe5782',
    company_name: 'Yurture',
    location: {
      province: 'NL',
      city: 'Loveland',
    },
  },
  {
    _id: '0d36b987-2a76-43a3-8c84-fdb2eb57649d',
    company_name: 'Columella',
    location: {
      province: 'PE',
      city: 'Keyport',
    },
  },
  {
    _id: '05696ffc-2251-49da-86e7-ff6805f15566',
    company_name: 'Bugsall',
    location: {
      province: 'ON',
      city: 'Dragoon',
    },
  },
  {
    _id: 'fbb18a8b-a651-4e85-955d-abe9e0c246c9',
    company_name: 'Zenthall',
    location: {
      province: 'MB',
      city: 'Bridgetown',
    },
  },
  {
    _id: '3c946d42-f547-4855-9009-09b24dcc2f42',
    company_name: 'Uneeq',
    location: {
      province: 'SK',
      city: 'Jacksonwald',
    },
  },
  {
    _id: '90e70b5b-6474-4993-9f26-5b27aae31385',
    company_name: 'Digique',
    location: {
      province: 'PE',
      city: 'Colton',
    },
  },
  {
    _id: '70ae8479-4ca3-436d-bc70-1b7c95497596',
    company_name: 'Keeg',
    location: {
      province: 'ON',
      city: 'Thomasville',
    },
  },
  {
    _id: 'a501966d-f078-4a45-b9c8-88752bfef61d',
    company_name: 'Orbalix',
    location: {
      province: 'ON',
      city: 'Gracey',
    },
  },
  {
    _id: 'ed96c840-4198-49b7-863f-dc05a1eb855a',
    company_name: 'Cyclonica',
    location: {
      province: 'MB',
      city: 'Brutus',
    },
  },
  {
    _id: 'c1716932-c038-4db4-9ec5-72af2a4fdcc4',
    company_name: 'Imaginart',
    location: {
      province: 'NU',
      city: 'Vandiver',
    },
  },
  {
    _id: '098b12a1-ee66-4c88-90ec-bdfbbcdb44a0',
    company_name: 'Exoswitch',
    location: {
      province: 'ON',
      city: 'Wintersburg',
    },
  },
  {
    _id: '6973750d-1a3f-4de3-87bc-474000f8f753',
    company_name: 'Voipa',
    location: {
      province: 'NU',
      city: 'Cliff',
    },
  },
  {
    _id: 'a6b0aed9-89f0-4932-a5a1-548dac9fe66e',
    company_name: 'Scenty',
    location: {
      province: 'PE',
      city: 'Century',
    },
  },
  {
    _id: 'f0933b89-6a6e-4800-bb88-a65635408bb2',
    company_name: 'Entogrok',
    location: {
      province: 'NB',
      city: 'Belfair',
    },
  },
  {
    _id: 'c11d2bf0-2759-4221-bdfd-d47e5c3c8b38',
    company_name: 'Zogak',
    location: {
      province: 'YT',
      city: 'Kylertown',
    },
  },
  {
    _id: '6bda74a8-28f5-4238-86c7-c446d9b550e3',
    company_name: 'Dreamia',
    location: {
      province: 'BC',
      city: 'Fairview',
    },
  },
  {
    _id: 'a3004e7e-33db-4f91-b135-a62990f83d20',
    company_name: 'Cinaster',
    location: {
      province: 'MB',
      city: 'Toftrees',
    },
  },
  {
    _id: 'd8ebe6a2-eed5-463e-92c1-0597ec19a788',
    company_name: 'Adornica has more chars to test borders',
    location: {
      province: 'NB',
      city: 'Brady',
    },
  },
  {
    _id: '63666c88-a286-4a60-a8e1-1b3ac7001feb',
    company_name: 'Austex',
    location: {
      province: 'ON',
      city: 'Riceville',
    },
  },
  {
    _id: '7559e518-4db2-4be7-b28e-20295d2e3808',
    company_name: 'Hivedom',
    location: {
      province: 'BC',
      city: 'Abiquiu',
    },
  },
  {
    _id: 'd8bc06b1-0119-4493-8706-3a7ac9b9a4b7',
    company_name: 'Steelfab',
    location: {
      province: 'AB',
      city: 'Shepardsville',
    },
  },
  {
    _id: '8af93748-0200-40c7-a0f9-61dbcf82997f',
    company_name: 'Callflex',
    location: {
      province: 'NL',
      city: 'Adamstown',
    },
  },
  {
    _id: 'fff24ebd-0ea7-49f6-9e93-5aad1ca4c9b4',
    company_name: 'Zentix',
    location: {
      province: 'NL',
      city: 'Coventry',
    },
  },
  {
    _id: '777ee640-2176-4c2e-acb3-db0ce96cadd7',
    company_name: 'Orbixtar',
    location: {
      province: 'NB',
      city: 'Blandburg',
    },
  },
  {
    _id: 'b9d51ac8-ad0e-4040-85d6-26a7be4a2725',
    company_name: 'Geostele',
    location: {
      province: 'SK',
      city: 'National',
    },
  },
  {
    _id: '0ffd6cfa-cc39-421f-902b-394dae274922',
    company_name: 'Qnekt',
    location: {
      province: 'NS',
      city: 'Johnsonburg',
    },
  },
  {
    _id: '3ed7e6c0-40a5-4337-a8b8-b1794b45f949',
    company_name: 'Stralum',
    location: {
      province: 'NU',
      city: 'Eagletown',
    },
  },
  {
    _id: '08682296-0843-4aa0-96a2-4c440a98a079',
    company_name: 'Quadeebo',
    location: {
      province: 'QC',
      city: 'Islandia',
    },
  },
  {
    _id: 'e9f07fae-570b-401a-8d47-f7633dce8fbe',
    company_name: 'Powernet',
    location: {
      province: 'NB',
      city: 'Hartsville/Hartley',
    },
  },
  {
    _id: '0e07def2-1fb9-4dae-a05f-998d90948c63',
    company_name: 'Tetak',
    projects: [],
    location: {
      province: 'NB',
      city: 'Nanafalia',
    },
  },
  {
    _id: '5175c45d-b707-4fe6-8591-0f20ae479288',
    company_name: 'Savvy',
    location: {
      province: 'NL',
      city: 'Brenton',
    },
  },
  {
    _id: '3c6625e5-3b44-4883-a737-fc367361fddf',
    company_name: 'Tellifly',
    location: {
      province: 'NB',
      city: 'Edgewater',
    },
  },
  {
    _id: '169e3d47-d3f0-403c-8f4a-62471dd3fa22',
    company_name: 'Biospan',
    location: {
      province: 'NT',
      city: 'Rockbridge',
    },
  },
  {
    _id: '8fa0d1b2-b720-4736-ad70-5ad768e2260d',
    company_name: 'Geekology',
    location: {
      province: 'NS',
      city: 'Riviera',
    },
  },
  {
    _id: '9835503b-1cfc-4910-87d5-ee1fe017f076',
    company_name: 'Virva',
    location: {
      province: 'YT',
      city: 'Jennings',
    },
  },
  {
    _id: '55b43031-66db-40db-b5c7-44b42ab872e8',
    company_name: 'Zytrac',
    location: {
      province: 'NU',
      city: 'Malo',
    },
  },
  {
    _id: 'f768ec3e-26de-4ee8-a7bc-dfb5484aea9b',
    company_name: 'Acrodance has more than 26 chars so far we are up to 55',
    location: {
      province: 'PE',
      city: 'Clara',
    },
  },
  {
    _id: '9a0918d5-b90b-4e80-908b-9747daf93686',
    company_name: 'Koogle',
    location: {
      province: 'QC',
      city: 'Muse',
    },
  },
  {
    _id: '944d1a2c-e0e8-4af5-8ecc-96901be5b35b',
    company_name: 'Xoggle',
    location: {
      province: 'SK',
      city: 'Osage',
    },
  },
  {
    _id: 'f6aa8d14-322b-4644-b56b-0c78c01b7ee1',
    company_name: 'Pheast',
    location: {
      province: 'PE',
      city: 'Tivoli',
    },
  },
  {
    _id: '98bebdbf-96b7-4a71-855b-a202c5f4c0d8',
    company_name: 'Electonic',
    location: {
      province: 'NU',
      city: 'Hackneyville',
    },
  },
  {
    _id: '3d8d7998-c4dd-4196-845a-c6fd9af942bf',
    company_name: 'Earthwax',
    location: {
      province: 'NL',
      city: 'Vincent',
    },
  },
  {
    _id: '72a8bad4-a18f-4f9a-9101-eea1959c3446',
    company_name: 'Sustenza',
    location: {
      province: 'NT',
      city: 'Ernstville',
    },
  },
  {
    _id: 'b4869637-b623-4089-81ed-f444fffa066d',
    company_name: 'Insuron',
    location: {
      province: 'ON',
      city: 'Worcester',
    },
  },
  {
    _id: 'a3399133-e8b8-44f2-85ea-f6684325b6b7',
    company_name: 'Essensia',
    location: {
      province: 'NL',
      city: 'Callaghan',
    },
  },
  {
    _id: 'ac19f419-4bd1-4419-8d2a-1addc4a92c79',
    company_name: 'Imperium',
    location: {
      province: 'BC',
      city: 'Cumberland',
    },
  },
  {
    _id: '14e47ab5-8e91-4360-863f-30eb0bc593a1',
    company_name: 'Musix',
    location: {
      province: 'ON',
      city: 'Staples',
    },
  },
  {
    _id: '939cf432-3c30-4c30-a4b7-cee28f7b80dc',
    company_name: 'Zolar',
    location: {
      province: 'PE',
      city: 'Disautel',
    },
  },
  {
    _id: '58ba3fbe-d57d-473a-bc13-d202d22fe2a1',
    company_name: 'Zoinage',
    location: {
      province: 'NT',
      city: 'Celeryville',
    },
  },
  {
    _id: 'bf5623a7-8258-42b8-96d0-b68c34088863',
    company_name: 'Assistia',
    location: {
      province: 'SK',
      city: 'Siglerville',
    },
  },
  {
    _id: 'a1ba7a08-9606-42ab-9a7c-7bdc1ffc80eb',
    company_name: 'Sunclipse',
    location: {
      province: 'SK',
      city: 'Canoochee',
    },
  },
  {
    _id: 'd5a7b6d4-7395-4a3c-b01c-e22738311531',
    company_name: 'Mediot',
    location: {
      province: 'AB',
      city: 'Kent',
    },
  },
  {
    _id: '20b14e11-a003-4980-8c3a-082a44fd15a1',
    company_name: 'Premiant',
    location: {
      province: 'QC',
      city: 'Whitehaven',
    },
  },
  {
    _id: '449cb29f-8679-42c3-8c36-a6f29d122bd6',
    company_name: 'Centrexin',
    location: {
      province: 'YT',
      city: 'Camptown',
    },
  },
  {
    _id: 'cc92612c-512e-488c-86c7-dda051e59f53',
    company_name: 'Memora',
    location: {
      province: 'NU',
      city: 'Crawfordsville',
    },
  },
  {
    _id: 'eb1df3ee-bbeb-4275-be84-cc205359abf4',
    company_name: 'Pearlesex',
    location: {
      province: 'PE',
      city: 'Warren',
    },
  },
  {
    _id: '956e0a72-0a46-4e39-99eb-bc7549d631a9',
    company_name: 'Ginkogene',
    location: {
      province: 'YT',
      city: 'Coyote',
    },
  },
  {
    _id: '1601a3b8-f06d-4ea9-9ca3-446f9adb4ee7',
    company_name: 'Anixang',
    location: {
      province: 'NL',
      city: 'Hickory',
    },
  },
  {
    _id: 'a4955f19-58b6-4d4c-a629-d35f72a90b2a',
    company_name: 'Exostream',
    location: {
      province: 'NB',
      city: 'Longoria',
    },
  },
  {
    _id: '865f44ba-d398-4324-b99e-275f554cab7a',
    company_name: 'Ovolo',
    location: {
      province: 'YT',
      city: 'Dyckesville',
    },
  },
  {
    _id: '3b4b6238-5c20-49b1-9546-ce5c3cc868fc',
    company_name: 'Xymonk',
    location: {
      province: 'QC',
      city: 'Dana',
    },
  },
  {
    _id: 'c9f25563-e716-4147-8c7f-27da5e638ca5',
    company_name: 'Flotonic',
    location: {
      province: 'NS',
      city: 'Blanford',
    },
  },
  {
    _id: '25e4f4e6-8a8e-4916-9310-e6d14841b919',
    company_name: 'Voratak',
    location: {
      province: 'PE',
      city: 'Hoagland',
    },
  },
  {
    _id: '8390f83e-779a-414a-bcfa-e0df558e62f9',
    company_name: 'Dadabase',
    location: {
      province: 'SK',
      city: 'Westerville',
    },
  },
  {
    _id: 'dbc6a049-146d-4e6e-b74b-613ea5a74aa3',
    company_name: 'Genmex',
    location: {
      province: 'NT',
      city: 'Sena',
    },
  },
  {
    _id: '96ed0c52-c61b-42bb-a7d2-3c8b4a5db2ba',
    company_name: 'Quotezart',
    location: {
      province: 'PE',
      city: 'Stevens',
    },
  },
  {
    _id: '2c63aabe-f4f0-4ae9-8d4f-b9e9ab4b4f8d',
    company_name: 'Zepitope',
    location: {
      province: 'BC',
      city: 'Clay',
    },
  },
  {
    _id: '68e39a17-2a0f-426a-9a94-7c025161487e',
    company_name: 'Emergent',
    location: {
      province: 'QC',
      city: 'Veguita',
    },
  },
  {
    _id: 'fbbb6414-506e-4a90-b8cd-a5775b777398',
    company_name: 'Tripsch',
    location: {
      province: 'AB',
      city: 'Orovada',
    },
  },
  {
    _id: 'b9838a95-e1bf-4180-9704-d58f9bb2306d',
    company_name: 'Ezentia',
    location: {
      province: 'AB',
      city: 'Macdona',
    },
  },
  {
    _id: 'ad7f49ee-ea8e-4746-af05-b7a4b5fb1a19',
    company_name: 'Limage',
    location: {
      province: 'NL',
      city: 'Forestburg',
    },
  },
  {
    _id: '929a6b4c-529e-4ec0-a661-162945ce77fe',
    company_name: 'Zboo',
    location: {
      province: 'NS',
      city: 'Villarreal',
    },
  },
  {
    _id: 'eb96629a-ac16-404d-b037-0107ab4705d5',
    company_name: 'Endicil',
    location: {
      province: 'NU',
      city: 'Orason',
    },
  },
  {
    _id: '5e92e31d-97be-4c69-9cb5-9f3afa19db88',
    company_name: 'Shepard',
    location: {
      province: 'YT',
      city: 'Berlin',
    },
  },
  {
    _id: '50581b0b-6d2e-4e10-8103-538551a86311',
    company_name: 'Eplode',
    location: {
      province: 'NU',
      city: 'Laurelton',
    },
  },
  {
    _id: '0345b999-cfe4-45c2-aa41-c11301452e61',
    company_name: 'Genmy',
    location: {
      province: 'YT',
      city: 'Norris',
    },
  },
  {
    _id: '68f5340e-ce54-415f-adc4-1e0462c83f0a',
    company_name: 'Insectus',
    location: {
      province: 'NB',
      city: 'Fulford',
    },
  },
  {
    _id: 'c8c46650-e8c3-46a0-84d5-f2796bd14dc2',
    company_name: 'Applideck',
    projects: [],
    location: {
      province: 'ON',
      city: 'Homeworth',
    },
  },
  {
    _id: 'b3713c05-a028-4ffc-a8c5-5ba460c82b66',
    company_name: 'Newcube',
    location: {
      province: 'NT',
      city: 'Herald',
    },
  },
  {
    _id: 'cd79de34-9fa9-48b6-be2c-9c850dfac812',
    company_name: 'Biotica',
    location: {
      province: 'MB',
      city: 'Singer',
    },
  },
  {
    _id: '80e7cfb2-8234-4997-9584-cd00ec399803',
    company_name: 'Geekko',
    location: {
      province: 'YT',
      city: 'Weeksville',
    },
  },
  {
    _id: '3b49d8a0-142a-477d-8736-35c78ebd7538',
    company_name: 'Veraq',
    location: {
      province: 'BC',
      city: 'Chesterfield',
    },
  },
  {
    _id: 'edfd00bb-a2f6-4d71-954e-fb4a64b819fb',
    company_name: 'Pulze',
    location: {
      province: 'QC',
      city: 'Avalon',
    },
  },
  {
    _id: '5dfc4a83-0859-4d6b-a58d-1ac9a9ddd327',
    company_name: 'Deviltoe',
    location: {
      province: 'PE',
      city: 'Wyano',
    },
  },
  {
    _id: '191eda76-0753-4531-aeca-8f8ef0e045d0',
    company_name: 'Capscreen',
    location: {
      province: 'NB',
      city: 'Allentown',
    },
  },
  {
    _id: '2fbcd77e-5bc6-4d11-8067-54e0e9c8fd1f',
    company_name: 'Obliq',
    location: {
      province: 'QC',
      city: 'Freetown',
    },
  },
  {
    _id: 'c9fcfecf-deaf-438d-bb9b-de3769a679b7',
    company_name: 'Paragonia',
    location: {
      province: 'AB',
      city: 'Hampstead',
    },
  },
  {
    _id: '75775ce0-d7a3-4160-bfad-32ea0b4b9c1e',
    company_name: 'Gynk',
    location: {
      province: 'QC',
      city: 'Sunwest',
    },
  },
  {
    _id: '858fd41f-7264-4bcb-a6e4-e026e9c1e620',
    company_name: 'Plasmox',
    location: {
      province: 'NS',
      city: 'Chamberino',
    },
  },
  {
    _id: 'd65cad32-1928-416f-bc6b-78c82f469b99',
    company_name: 'Andershun also has more chars to test',
    location: {
      province: 'NU',
      city: 'Fidelis',
    },
  },
  {
    _id: '6984e6ed-6cb1-4240-a0fb-c4997d921692',
    company_name: 'Rotodyne',
    location: {
      province: 'PE',
      city: 'Rew',
    },
  },
  {
    _id: '26b839f3-d64f-4bb9-b231-9b3bed7988b9',
    company_name: 'Genekom',
    location: {
      province: 'BC',
      city: 'Kimmell',
    },
  },
  {
    _id: 'a174f2ab-51e2-4379-814f-82c0fa140a6e',
    company_name: 'Roughies',
    location: {
      province: 'MB',
      city: 'Biehle',
    },
  },
  {
    _id: '53be9839-680d-4bf7-bfd3-f27ab5887d0a',
    company_name: 'Datagen',
    location: {
      province: 'AB',
      city: 'Magnolia',
    },
  },
  {
    _id: '7ef4ace6-d1a7-4515-b9a5-a44b421bba91',
    company_name: 'Kraggle',
    location: {
      province: 'NT',
      city: 'Cedarville',
    },
  },
  {
    _id: '39571687-386f-4e76-b188-cc1a8f8e249d',
    company_name: 'Speedbolt',
    location: {
      province: 'NB',
      city: 'Bedias',
    },
  },
  {
    _id: 'fc5b4db7-94e1-44ac-9058-40a4bdc3f68c',
    company_name: 'Bunga',
    location: {
      province: 'NB',
      city: 'Bennett',
    },
  },
  {
    _id: 'cd2808b3-f232-4a97-b046-0962f5f3d45e',
    company_name: 'Ohmnet',
    location: {
      province: 'QC',
      city: 'Calpine',
    },
  },
  {
    _id: '9f100352-f39f-4060-90fd-8f5dae4d02e5',
    company_name: 'Sportan',
    location: {
      province: 'YT',
      city: 'Connerton',
    },
  },
];

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const canadianProvinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

const addSampleProjects = (company, idx) => {
  company.projects = randomProjects[idx % randomProjects.length];
};

const calcRayLegendData = () => {
  const WheelRayLegendData = {
    legendData: [],
    items: [...companyDataSample],
  };
  alphabet.forEach((letter) => {
    WheelRayLegendData.legendData.push({
      classifier: letter,
      count: companyDataSample.filter(
        company => company.company_name === letter,
      ).length,
    });
  });
  WheelRayLegendData.items.sort((a, b) => (a.company_name < b.company_name ? -1 : 1));
  WheelRayLegendData.items.forEach((company, idx) => addSampleProjects(company, idx));
  return WheelRayLegendData;
};

const calcRayLegendDataLocation = () => {
  const WheelLocationData = {
    legendData: [],
    // eslint-disable-next-line no-return-assign
    items: companyDataSample.map((company) => {
      const o = { ...company, region_name: company.location.city };
      return o;
    }),
  };
  canadianProvinces.forEach((province) => {
    WheelLocationData.legendData.push({
      classifier: province,
      count: companyDataSample.filter(
        company => company.location.province === province,
      ).length,
    });
  });
  WheelLocationData.items = WheelLocationData.items
    .sort((a, b) => (a.location.province < b.location.province ? -1 : 1));
  return WheelLocationData;
};

const companyWheelData = calcRayLegendData();
const locationData = calcRayLegendDataLocation();
locationData.items.sort((a, b) => (a.location.province < b.location.province ? -1 : 1));
export { companyWheelData, locationData };
