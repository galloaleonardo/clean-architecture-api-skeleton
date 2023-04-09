import { randomBytes, pbkdf2 } from 'crypto';
import { PasswordHashing } from '../application/interfaces/security/PasswordHashing';

export class CryptoPasswordEncryption implements PasswordHashing {
  private readonly saltSize: number = 16;

  private readonly iterations: number = 100000;

  private readonly keylen: number = 64;

  private readonly digest: string = 'sha512';

  async hash(password: string): Promise<string> {
    const salt = randomBytes(this.saltSize).toString('hex');

    const hash = await new Promise<string>((resolve, reject) => {
      pbkdf2(password, salt, this.iterations, this.keylen, this.digest, (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        resolve(derivedKey.toString('hex'));
      });
    });

    return `${salt}:${hash}`;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const [salt, originalHash] = hash.split(':');

    const hashedPassword = await new Promise<string>((resolve, reject) => {
      pbkdf2(password, salt, this.iterations, this.keylen, this.digest, (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        resolve(derivedKey.toString('hex'));
      });
    });

    return originalHash === hashedPassword;
  }
}
