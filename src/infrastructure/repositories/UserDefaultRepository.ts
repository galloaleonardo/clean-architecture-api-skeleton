import { CreateUserRepository } from '../../application/interfaces/repositories/CreateUserRepository';
import { FindUserByEmailRepository } from '../../application/interfaces/repositories/FindUserByEmailRepository';
import { UserSQLRepository } from './sql/repositories/user/UserSQLRepository';

const userSQLRepository = new UserSQLRepository();

const createUserRepository: CreateUserRepository = userSQLRepository;
const findUserByEmailRepository: FindUserByEmailRepository = userSQLRepository;

export {
  createUserRepository,
  findUserByEmailRepository,
};
