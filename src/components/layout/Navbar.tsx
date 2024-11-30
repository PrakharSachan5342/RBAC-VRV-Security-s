import { Shield, Settings, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from './Link';
import { Button } from '../common/Button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-indigo-400" />
          <span className="text-xl font-bold">VRV Security's</span>
        </div>
        
        {/* Mobile menu button */}
        <button
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-300" />
          ) : (
            <Menu className="h-6 w-6 text-gray-300" />
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden sm:flex items-center space-x-8">
          <Link href="/" active>Dashboard</Link>
          <Link href="/users">Users</Link>
          <Link href="/roles">Roles</Link>
          <Link href="/permissions">Permissions</Link>
          <Link href="/audit-logs">Audit Logs</Link>
          <Link href="/settings">Settings</Link>
          
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-gray-300 cursor-pointer hover:text-white" />
            <Button variant="primary">Settings</Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 space-y-4">
          <Link href="/" active>Dashboard</Link>
          <Link href="/users" className="block">Users</Link>
          <Link href="/roles" className="block">Roles</Link>
          <Link href="/permissions" className="block">Permissions</Link>
          <Link href="/audit-logs" className="block">Audit Logs</Link>
          <Link href="/settings" className="block">Settings</Link>
          <div className="flex items-center space-x-4 pt-4">
            <Bell className="h-5 w-5 text-gray-300 cursor-pointer hover:text-white" />
            <Button variant="primary" size="sm">Settings</Button>
          </div>
        </div>
      )}
    </nav>
  );
}