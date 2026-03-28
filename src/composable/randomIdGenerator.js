/**
 * This is just a mock up id generator because I don't have backend.
 */
export const RANDOM_ID = () => {
    const min = 300;
    const max = 10000;

    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNum
}