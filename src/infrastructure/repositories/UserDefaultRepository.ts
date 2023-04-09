import { CreateUserRepository } from '../../application/interfaces/repositories/CreateUserRepository';
import { UserSQLRepository } from './sql/repositories/user/UserSQLRepository';

const userSQLRepository = new UserSQLRepository();

const createUserRepository: CreateUserRepository = userSQLRepository;

export {
  createUserRepository,
};
