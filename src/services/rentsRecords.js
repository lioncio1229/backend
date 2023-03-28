

exports.getRecordsByVideo = (videos, rents) =>
{
    return videos.map(video => {
        const videoId = video._id.toString();
        const renters = [];

        rents.forEach(rent => {
            if(rent.videoId === videoId)
            {
                renters.push({username: rent.username, dueDate: rent.dueDate});
            }
        });

        return {
            ...video,
            outCounts: renters.length,
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