/* eslint-disable no-unused-vars */
export interface PasswordHashing {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
