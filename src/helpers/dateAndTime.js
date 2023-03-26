

exports.addDaytoCurrentTime = (numberOfDays) =>
{
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + numberOfDays)
    return currentDate;
}

