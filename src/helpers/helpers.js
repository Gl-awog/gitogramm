export const addLeadingZero = (value) => value < 10 ? `0${value}` : value

export const convertDateToReadable = (value) => new Date(value).toLocaleDateString()
