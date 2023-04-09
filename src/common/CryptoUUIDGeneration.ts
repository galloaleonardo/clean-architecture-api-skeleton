import { randomUUID } from 'crypto';
import { UUIDGenerator } from '../application/interfaces/helpers/UUIDGenerator';

export class CryptoUUIDGeneration implements UUIDGenerator {
  make(): string {
    return randomUUID();
  }
}
