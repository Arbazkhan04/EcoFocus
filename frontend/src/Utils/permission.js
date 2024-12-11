// permissions.js
export const PERMISSIONS = {
  user: {
    agencyPage: {
      canViewAgencyClients: true,
      canManageAgencyClients: false,
      canInviteUsers: false,
      canRemoveUsers: false,
    },
    dashboardPage: {
      canViewStatistics: true,
      canEditStatistics: false,
    }
  },
  admin: {
    agencyPage: {
      canViewAgencyClients: true,
      canManageAgencyClients: true,
      canInviteUsers: true,
      canRemoveUsers: true,
    },
    dashboardPage: {
      canViewStatistics: true,
      canEditStatistics: true,
    }
  },
  contactPerson: {
    agencyPage: {
      canViewAgencyClients: true,
      canManageAgencyClients: true,
      canInviteUsers: true,
      canRemoveUsers: true,
    },
    dashboardPage: {
      canViewStatistics: true,
      canEditStatistics: true,
    }
  }
};
