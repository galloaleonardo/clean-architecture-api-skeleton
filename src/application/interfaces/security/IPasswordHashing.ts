/* eslint-disable no-unused-vars */
export interface IPasswordHashing {
  hash(password: string): string;
  compare(password: string, hash: string): boolean;
}
