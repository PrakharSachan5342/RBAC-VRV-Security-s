import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useRoles } from '../../context/RoleContext';
import { Button } from '../common/Button';
import { Permission } from '../../types';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const availablePermissions: Permission[] = [
  { id: 1, name: 'Create', description: 'Can create resources', module: 'Users' },
  { id: 2, name: 'Read', description: 'Can read resources', module: 'Users' },
  { id: 3, name: 'Update', description: 'Can update resources', module: 'Users' },
  { id: 4, name: 'Delete', description: 'Can delete resources', module: 'Users' },
];

export function AddRoleModal({ isOpen, onClose }: AddRoleModalProps) {
  const { addRole } = useRoles();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as Permission[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRole(formData);
    onClose();
    setFormData({ name: '', description: '', permissions: [] });
  };

  const togglePermission = (permission: Permission) => {
    const exists = formData.permissions.some(p => p.id === permission.id);
    if (exists) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p.id !== permission.id),
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permission],
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Create New Role</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Name
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Content Editor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the role's responsibilities"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="space-y-2">
              {availablePermissions.map(permission => (
                <div
                  key={permission.id}
                  className="flex items-center p-2 border rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.some(p => p.id === permission.id)}
                    onChange={() => togglePermission(permission)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{permission.name}</p>
                    <p className="text-xs text-gray-500">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">
              Create Role
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}