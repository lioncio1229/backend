

exports.getRecords = (videos, rents) =>
{
    return videos.map(video => {
        const videoId = video._id.toString();
        let renters = [];

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