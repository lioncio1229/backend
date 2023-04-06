
exports.addTime = function(millis)
{
    const date = new Date();
    const v = {
        'h': 60 * 60,
        'm': 60,
        's': 1, 
    }

    millis.split(',').forEach(t => {
        let val = parseInt(t.replace(/[a-z]/g, ''));
        let sym = t.replace(/\d/g, '');

        switch(sym)
        {
            case 'D': date.setDate(date.getDate() + val); break;
            case 'M': date.setMonth(date.getMonth() + val); break;
            case 'Y': date.setFullYear(date.getFullYear() + val); break;
            default: date.setTime(date.getTime() + (v[sym] * val * 1000));
        }
    });

    return date;
}

