import Users from '../../database/models/Users';

import UsersService from '../../services/UsersService';
import UsersController from '../../controllers/UsersController';

const usersController = (): UsersController => {
  const usersService = new UsersService(Users);

  return new UsersController(usersService);
};

export default usersController();
