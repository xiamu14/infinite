const fetcher = <T>(...args: any) =>
  // @ts-ignore
  fetch(...args).then((res) => res.json() as Promise<{ data: T }>);
export default fetcher;
