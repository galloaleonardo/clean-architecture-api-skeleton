import { randomBytes, pbkdf2Sync } from 'crypto';
import { IPasswordHashing } from '../application/interfaces/security/IPasswordHashing';

export class CryptoPasswordEncryption implements IPasswordHashing {
  private readonly saltSize: number = 16;

  private readonly iterations: number = 100000;

  private readonly keylen: number = 64;

  private readonly digest: string = 'sha512';

  hash(password: string): string {
    const salt = randomBytes(this.saltSize).toString('hex');

    const derivedKey = pbkdf2Sync(password, salt, this.iterations, this.keylen, this.digest);

    return `${salt}:${derivedKey.toString('hex')}`;
  }

  compare(password: string, hash: string): boolean {
    const [salt, originalHash] = hash.split(':');

    const derivedKey = pbkdf2Sync(password, salt, this.iterations, this.keylen, this.digest);

    const hashedPassword = derivedKey.toString('hex');

    return originalHash === hashedPassword;
  }
}
