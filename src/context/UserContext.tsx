import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: number) => void;
  updateUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@vrv.com', role: 'Admin', status: 'Active', lastLogin: '2024-03-10' },
  { id: 2, name: 'Jane Smith', email: 'jane@vrv.com', role: 'Editor', status: 'Active', lastLogin: '2024-03-09' },
  { id: 3, name: 'Mike Johnson', email: 'mike@vrv.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-03-01' },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addUser = (newUser: Omit<User, 'id'>) => {
    const id = Math.max(...users.map(u => u.id), 0) + 1;
    setUsers([...users, { ...newUser, id }]);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUsers must be used within a UserProvider');
  return context;
};