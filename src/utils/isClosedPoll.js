const ISOStringToNormalDate = (oldDate) => {
    return oldDate.split('T')[0] + ' ' + oldDate.split('T')[1].split('.')[0];
};

const isClosedPoll = (limitDatePoll) => {
    const limitDate = limitDatePoll.toString();
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISODate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    const actualDate = ISOStringToNormalDate(localISODate);

    const date1Updated = new Date(actualDate.replace(/-/g,'/'));
    return date1Updated.toString() > limitDate;
};

module.exports = {
    isClosedPoll,
};
