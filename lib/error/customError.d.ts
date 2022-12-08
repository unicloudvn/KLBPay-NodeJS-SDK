export default class CustomError extends Error {
    code: number;
    message: string;
    constructor(code: number, message: string);
}
