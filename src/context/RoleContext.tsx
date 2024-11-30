import { createContext, useContext, useState, ReactNode } from 'react';
import { Role, Permission } from '../types';

interface RoleContextType {
  roles: Role[];
  addRole: (role: Omit<Role, 'id'>) => void;
  deleteRole: (id: number) => void;
  updateRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const initialRoles: Role[] = [
  {
    id: 1,
    name: 'Admin',
    description: 'Full system access',
    permissions: [
      { id: 1, name: 'Create', description: 'Can create resources', module: 'Users' },
      { id: 2, name: 'Read', description: 'Can read resources', module: 'Users' },
      { id: 3, name: 'Update', description: 'Can update resources', module: 'Users' },
      { id: 4, name: 'Delete', description: 'Can delete resources', module: 'Users' },
    ],
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Can edit content',
    permissions: [
      { id: 2, name: 'Read', description: 'Can read resources', module: 'Users' },
      { id: 3, name: 'Update', description: 'Can update resources', module: 'Users' },
    ],
  },
];

export function RoleProvider({ children }: { children: ReactNode }) {
  const [roles, setRoles] = useState<Role[]>(initialRoles);

  const addRole = (newRole: Omit<Role, 'id'>) => {
    const id = Math.max(...roles.map(r => r.id), 0) + 1;
    setRoles([...roles, { ...newRole, id }]);
  };

  const deleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const updateRole = (updatedRole: Role) => {
    setRoles(roles.map(role => role.id === updatedRole.id ? updatedRole : role));
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, deleteRole, updateRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRoles must be used within a RoleProvider');
  return context;
};