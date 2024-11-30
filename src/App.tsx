import { Navbar } from './components/layout/Navbar';
import { UserList } from './components/users/UserList';
import { RoleList } from './components/roles/RoleList';
import { UserProvider } from './context/UserContext';
import { RoleProvider } from './context/RoleContext';

export default function App() {
  return (
    <UserProvider>
      <RoleProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Manage User Roles and Permissions</h1>
              <p className="text-gray-600 max-w-3xl">
                The admin dashboard provides a secure and user-friendly interface for managing users,
                roles, and permissions. Control access levels and maintain security with our comprehensive RBAC system.
              </p>
            </div>

            <div className="grid gap-8">
              <UserList />
              <RoleList />
            </div>
          </main>
        </div>
      </RoleProvider>
    </UserProvider>
  );
}