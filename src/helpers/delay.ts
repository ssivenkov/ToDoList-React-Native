// delay function for starting animation
export const delay = (time: number): Promise<any> =>
  new Promise((resolve) => setTimeout(resolve, time));
