

exports.getRecordsByMovie = (movies, rents) =>
{
    return movies.map(movie => {
        const movieId = movie._id.toString();
        const renters = rents.filter(rent => rent.movieId === movieId)
        .map(rent => {
            delete rent.movieId;
            return rent;
        });

        return {
            ...movie,
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