/**
 * Waits for a given amount of time
 * @param ms - The duration to wait in milliseconds
 * @returns A promise that resolves to a confirmation message once the wait is done
 */
export const wait = (ms: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Finished waiting for ${ms} milliseconds`), ms);
  });
};
