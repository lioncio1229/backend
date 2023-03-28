

exports.getRecords = (videos, rents) =>
{
    return videos.map(video => {
        const videoId = video._id.toString();
        let renter = [];

        rents.forEach(rent => {
            if(rent.videoId === videoId)
            {
                renter.push({username: rent.username, dueDate: rent.dueDate});
            }
        });

        return {
            ...video,
            outCounts: renter.length,
            renter,
        };
    });
}