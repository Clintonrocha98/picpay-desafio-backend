import { UserRepository } from "../../repository/User/User.Repository";
import { UserService } from "../../service/User/User.Service";
import { UserController } from "../../controller/User/User.Controller";

export const userFactory = () => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userControlle = new UserController(userService);

  return userControlle;
};
