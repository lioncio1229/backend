

exports.getRecordsByVideo = (videos, rents) =>
{
    return videos.map(video => {
        const videoId = video._id.toString();
        const renters = rents.filter(rent => rent.videoId === videoId)
        .map(rent => {
            delete rent.videoId;
            return rent;
        });

        return {
            ...video,
            renters,
        };
    });
}

exports.getRecordsByCustomers = (customers, rents) => {

    return customers.map(customer => {
        const username = customer.username;
        const rentList = rents.filter(rent => rent.username === username)
        .map(rent => {
            delete rent.username;
            return rent;
        });

        return{
            username,
            rents: rentList,
        }
    });
}