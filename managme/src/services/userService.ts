import type { User } from "@/types/User";

const mockUser: User = {
  id: "user-1",
  firstName: "Michał",
  lastName: "Rokosz",
};

class UserService {
  static getLoggedUser(): User {
    return mockUser;
  }
}

export default UserService;
