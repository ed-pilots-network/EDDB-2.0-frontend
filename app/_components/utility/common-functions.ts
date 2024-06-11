const compareNumbers = (
  a: number,
  b: number,
  filter: string,
  ascending: boolean,
) => {
  if (filter === 'sellPrice' || filter === 'supply') {
    if (ascending) return b - a;
    return a - b;
  }
  if (filter === 'buyPrice' || filter === 'demand') {
    if (ascending) return b - a;
    return a - b;
  }
  if (ascending) return b - a;
  return a - b;
};

// calculate when the response was last updated
const calculateTimeDifference = (then: string): string => {
  const now = new Date().toISOString();
  const timeDifferenceMilliseconds = Math.abs(
    new Date(now).getTime() - new Date(then).getTime(),
  );
  const timeDifferenceHours = Math.ceil(
    timeDifferenceMilliseconds / (1000 * 3600),
  );

  if (timeDifferenceHours >= 24) {
    const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);
    if (timeDifferenceDays > 1) {
      return `${timeDifferenceDays} days ago`;
    }
    return `${timeDifferenceHours} day ago`;
  }
  if (timeDifferenceHours === 1) {
    return `${timeDifferenceHours} hour ago`;
  }
  return `${timeDifferenceHours} hours ago`;
};

export { compareNumbers, calculateTimeDifference };
