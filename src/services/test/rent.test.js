import { parsedVideos } from '../rents.js';


test('Testing parsedVideos', () => {
    const videos = [
        {
          _id: ObjectId("641cea53eb9abdd7550e8312"),
          title: 'Zilzo the action',
          description: 'Baby love zilzo',
          price: '100',
          category: 'DVD'
        },
        { _id: ObjectId("641c2469aa00b327673653c1"), category: 'DVD' },
        {
          _id: ObjectId("641cf4f96a4167b25aacd08d"),
          title: 'Zilzo the action',
          description: 'Baby love zilzo',
          price: '100'
        }
    ]

    const rents = ['641cf4f96a4167b25aacd08d', '641c2469aa00b327673653c1'];

    const result = [
        {
          _id: ObjectId("641cea53eb9abdd7550e8312"),
          title: 'Zilzo the action',
          description: 'Baby love zilzo',
          price: '100',
          category: 'DVD'
        },
        { _id: ObjectId("641c2469aa00b327673653c1"), category: 'DVD', isRenting: true },
        {
          _id: ObjectId("641cf4f96a4167b25aacd08d"),
          title: 'Zilzo the action',
          description: 'Baby love zilzo',
          price: '100',
          isRenting: true
        }
    ]

    expect(parsedVideos(videos, rents)).toBe(result);
});