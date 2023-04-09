import { CreateUserController } from '../../../adapter/controllers/user/CreateUserController';
import { GenericCreatedResponse } from '../../../adapter/responses/GenericCreatedResponse';
import { CreateUser } from '../../../application/use-cases/user/CreateUser';
import { CryptoPasswordEncryption } from '../../../common/CryptoPasswordEncryption';
import { CryptoUUIDGeneration } from '../../../common/CryptoUUIDGeneration';
import { User } from '../../../domain/models/user/User';
import { createUserRepository } from '../../../infrastructure/repositories/UserDefaultRepository';

export const createUserControllerFactory = () => {
  const cryptoPasswordEncryption = new CryptoPasswordEncryption();
  const cryptoUUIDGeneration = new CryptoUUIDGeneration();

  const createUserUseCase = new CreateUser(
    createUserRepository,
    cryptoUUIDGeneration,
    cryptoPasswordEncryption,
  );

  const createdUserAdapter = new GenericCreatedResponse<User>();

  const createUserCreateController = new CreateUserController(createUserUseCase, createdUserAdapter);

  return {
    cryptoPasswordEncryption,
    cryptoUUIDGeneration,
    createUserUseCase,
    createdUserAdapter,
    createUserCreateController,
  };
};
