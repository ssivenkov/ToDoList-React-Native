// delayHelper function for starting animation
export const delayHelper = (time: number): Promise<any> =>
  new Promise((resolve) => setTimeout(resolve, time));
