const {ObjectId} = require('mongodb');
const getRecords = require('../../rentsRecords.js');


test('#1 - Testing getRecords', () => {
    const videos = [
        {
            _id : new ObjectId('64219e6ed3bcad1388ebb9e9'),
            title: 'Video 1',
            quantity: 23,
        },
        {
            _id : new ObjectId('64219e63d3bcad1388ebb9e9'),
            title: 'Video 2',
            quantity: 15
        }
    ];

    const rents = [
        {
            username: 'camilsmary',
            videoId: '64219e63d3bcad1388ebb9e9',
            dueDate: '3/30/2023'
        }
    ];

    const expected = [
        {
            _id : new ObjectId('64219e6ed3bcad1388ebb9e9'),
            title: 'Video 1',
            quantity: 23,
            outCounts: 0,
            renters: []
        },
        {
            _id : new ObjectId('64219e63d3bcad1388ebb9e9'),
            title: 'Video 2',
            quantity: 15,
            outCounts: 1,
            renters: [
                {
                    username: 'camilsmary',
                    dueDate: '3/30/2023'
                }
            ]
        }
    ];

    expect(getRecords.getRecordsByVideo(videos, rents)).toEqual(expected);
});

test('#2 - Testing getRecords', () => {
    const videos = [
        {
            _id : new ObjectId('64219e6ed3bcad1388ebb9e9'),
            title: 'Video 1',
            quantity: 23,
        },
        {
            _id : new ObjectId('64219e63d3bcad1388ebb9e9'),
            title: 'Video 2',
            quantity: 15
        }
    ];

    const rents = [
        {
            username: 'camilsmary',
            videoId: '64219e63d3bcad1388ebb9e9',
            dueDate: '3/30/2023'
        },
        {
            username: 'zilzoness',
            videoId: '64219e63d3bcad1388ebb9e9',
            dueDate: '3/32/2023'
        },
        {
            username: 'maryjane and Camilo',
            videoId: '64219e6ed3bcad1388ebb9e9',
            dueDate: '3/-1/2023'
        },
    ];

    const expected = [
        {
            _id : new ObjectId('64219e6ed3bcad1388ebb9e9'),
            title: 'Video 1',
            quantity: 23,
            outCounts: 1,
            renters: [{
                username: 'maryjane and Camilo',
                dueDate: '3/-1/2023'
            }]
        },
        {
            _id : new ObjectId('64219e63d3bcad1388ebb9e9'),
            title: 'Video 2',
            quantity: 15,
            outCounts: 2,
            renters: [
                {
                    username: 'camilsmary',
                    dueDate: '3/30/2023'
                },
                {
                    username: 'zilzoness',
                    dueDate: '3/32/2023'
                },
            ]
        }
    ];

    expect(getRecords.getRecordsByVideo(videos, rents)).toEqual(expected);
});


test('#3 - Testing getRecords', () => {
    const videos = [
        {
            _id : new ObjectId('64219e6ed3bcad1388ebb9e9'),
            title: 'Video 1',
            quantity: 23,
        },
        {
            _id : new ObjectId('64219e63d3bcad1388ebb9e9'),
            title: 'Video 2',
            quantity: 15
        }
    ];

    const rents = [];

    const expected = [
        {
            _id : new ObjectId('64219e6ed3bcad1388ebb9e9'),
            title: 'Video 1',
            quantity: 23,
            outCounts: 0,
            renters: []
        },
        {
            _id : new ObjectId('64219e63d3bcad1388ebb9e9'),
            title: 'Video 2',
            quantity: 15,
            outCounts: 0,
            renters: []
        }
    ];

    expect(getRecords.getRecordsByVideo(videos, rents)).toEqual(expected);
});