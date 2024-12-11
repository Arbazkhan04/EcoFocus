
import { PERMISSIONS } from '../../Utils/permission';

export function usePermissions(page,role) {
    const rolePermissions = PERMISSIONS[role] || {};
    const pagePermissions = rolePermissions[page] || {};
    return pagePermissions;
}
