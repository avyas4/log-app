interface LogArray {
  ip_address?: string;
  url?: string;
}

export const filterUniqueIpCount = (list: LogArray[]) => {
  return list.reduce((result, { ip_address, url }, idx, arr) => {
    // To create a specific path, set and add the `ip_address` value
    (result[ip_address] ??= new Set()).add(url);

    // At the last iteration step transform the aggregated object into the final result
    // To show specific unique ip count along with ip address
    // For example: {177.71.128.21: 3, 168.41.191.40: 4, 168.41.191.41: 1, 168.41.191.9: 2, 168.41.191.34: 2, …}
    if (idx === arr.length - 1) {
      result = Object.entries(result).reduce(
        (obj, [path, set]) =>
          Object.assign(obj, {
            [path]: set.size,
          }),
        {}
      );
    }
    return result;
  }, {});
};
