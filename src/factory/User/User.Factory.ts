import { UserRepository } from "../../repository/User/user.repository";
import { UserService } from "../../service/User/user.service";
import { UserController } from "../../controller/User/user.controller";

export const userFactory = () => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userControlle = new UserController(userService);

  return userControlle;
};
