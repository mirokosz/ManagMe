import type { User } from "@/types/User";

const USERS: User[] = [
  {
    id: "1",
    firstName: "Michał",
    lastName: "Rokosz",
    role: "admin",
  },
  {
    id: "2",
    firstName: "Anna",
    lastName: "Developer",
    role: "developer",
  },
  {
    id: "3",
    firstName: "Kamil",
    lastName: "DevOps",
    role: "devops",
  },
];

class UserService {
  static getAll(): User[] {
    return USERS;
  }

  static getLoggedUser(): User {
    return USERS[0]; // Admin jest zalogowany
  }

  static getAssignableUsers(): User[] {
    return USERS.filter((u) => u.role === "developer" || u.role === "devops");
  }

  static getById(id: string): User | undefined {
    return USERS.find((u) => u.id === id);
  }
}

export default UserService;