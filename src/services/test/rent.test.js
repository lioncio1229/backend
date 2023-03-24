const { parseVideos } = require('../rents.js');


test('Testing parseVideos', () => {
    const videos = [
        {
          _id: "641cea53eb9abdd7550e8312",
          title: 'Zilzo the action',
          description: 'Baby love zilzo',
          price: '100',
          category: 'DVD'
        },
        { _id: "641c2469aa00b327673653c1", category: 'DVD' },
        {
          _id: "641cf4f96a4167b25aacd08d",
          title: 'Zilzo the action',
          description: 'Baby love zilzo',
          price: '100'
        }
    ]

    const rents = ['641cf4f96a4167b25aacd08d', '641c2469aa00b327673653c1'];

    const output = [
        {
          _id: "641cea53eb9abdd7550e8312",
          title: 'Zilzo the action',
          description: 'Baby love zilzo',
          price: '100',
          category: 'DVD',
          isRenting: false
        },
        { _id: "641c2469aa00b327673653c1", category: 'DVD', isRenting: true },
        {
          _id: "641cf4f96a4167b25aacd08d",
          title: 'Zilzo the action',
          description: 'Baby love zilzo',
          price: '100',
          isRenting: true
        }
    ]

    expect(parseVideos(videos, rents)).toEqual(output);
});


test('Testing parseVideos 2', () => {
  const videos = [
      {
        _id: "641cea53eb9abdd7550e8312",
        title: 'Zilzo the action',
        description: 'Baby love zilzo',
        price: '100',
        category: 'DVD'
      },
      {
        _id: "641cf4f96a4167b25aacd08d",
        title: 'Zilzo the action',
        description: 'Baby love zilzo',
        price: '100'
      },
      {
        _id: "641cf4f96a4267325aacd08d",
        title: 'Zilzo Movies',
        description: 'Baby the girl of love',
        price: '200'
      },
  ]

  const rents = [];

  const output = [
    {
      _id: "641cea53eb9abdd7550e8312",
      title: 'Zilzo the action',
      description: 'Baby love zilzo',
      price: '100',
      category: 'DVD',
      isRenting: false,
    },
    {
      _id: "641cf4f96a4167b25aacd08d",
      title: 'Zilzo the action',
      description: 'Baby love zilzo',
      price: '100',
      isRenting: false,
    },
    {
      _id: "641cf4f96a4267325aacd08d",
      title: 'Zilzo Movies',
      description: 'Baby the girl of love',
      price: '200',
      isRenting: false,
    },
  ]

  expect(parseVideos(videos, rents)).toEqual(output);
});

test('Testing parseVideos 3', () => {
  const videos = []

  const rents = [];

  const output = []

  expect(parseVideos(videos, rents)).toEqual(output);
});

test('Testing parseVideos 4', () => {
  const videos = []

  const rents = ['641cf4f96a4167b25aacd08d', '641c2469aa00b327673653c1'];

  const output = [];

  expect(parseVideos(videos, rents)).toEqual(output);
});