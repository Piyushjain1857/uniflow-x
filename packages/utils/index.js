// Shared Utility Functions for UniFlow X

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const capitalize = (str) => {
  if (typeof str !== 'string' || !str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatRoleName = (role) => {
  if (!role) return '';
  return role.split('_').map(capitalize).join(' ');
};
