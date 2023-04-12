import { CreateUserController } from '../../../adapter/controllers/user/CreateUserController';
import { GenericCreatedResponse } from '../../../adapter/responses/GenericCreatedResponse';
import { CreateUser } from '../../../application/use-cases/user/CreateUser';
import { CryptoPasswordEncryption } from '../../../common/CryptoPasswordEncryption';
import { CryptoUUIDGeneration } from '../../../common/CryptoUUIDGeneration';
import { User } from '../../../domain/models/user/User';
import { createUserRepository, findUserByEmailRepository } from '../../../infrastructure/repositories/UserDefaultRepository';
import { CreateUserValidation } from '../../../infrastructure/validators/user/CreateUserValidation';

export const createUserControllerFactory = () => {
  const createUserValidation = new CreateUserValidation();
  const cryptoPasswordEncryption = new CryptoPasswordEncryption();
  const cryptoUUIDGeneration = new CryptoUUIDGeneration();

  const createUserUseCase = new CreateUser(
    createUserValidation,
    createUserRepository,
    findUserByEmailRepository,
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
