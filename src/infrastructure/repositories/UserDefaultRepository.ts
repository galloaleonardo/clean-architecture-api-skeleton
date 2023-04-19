import { ICreateUserRepository } from '../../application/interfaces/repositories/ICreateUserRepository';
import { IFindUserByEmailRepository } from '../../application/interfaces/repositories/IFindUserByEmailRepository';
import { UserSQLRepository } from './sql/repositories/user/UserSQLRepository';

const userSQLRepository = new UserSQLRepository();

const createUserRepository: ICreateUserRepository = userSQLRepository;
const findUserByEmailRepository: IFindUserByEmailRepository = userSQLRepository;

export {
  createUserRepository,
  findUserByEmailRepository,
};
