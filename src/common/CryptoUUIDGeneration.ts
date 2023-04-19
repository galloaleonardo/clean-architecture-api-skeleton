import { randomUUID } from 'crypto';
import { IUUIDGenerator } from '../application/interfaces/helpers/IUUIDGenerator';

export class CryptoUUIDGeneration implements IUUIDGenerator {
  make(): string {
    return randomUUID();
  }
}
