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
    firstName: "Jan",
    lastName: "Kowalski",
    role: "developer",
  },
  {
    id: "3",
    firstName: "Piotr",
    lastName: "Wiśniewski",
    role: "devops",
  },
];

class UserService {
  static getAll(): User[] {
    return USERS;
  }

  static getLoggedUser(): User {
    return USERS[0]; //admin jest zalogowany
  }
//zwróćenie użytkowników z rolami dev lub devops
  static getAssignableUsers(): User[] {
    return USERS.filter((u) => u.role === "developer" || u.role === "devops");
  }

  static getById(id: string): User | undefined {
    return USERS.find((u) => u.id === id);
  }
}

export default UserService;