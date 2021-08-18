export const formatDate = (date, options = { month: 'long', day: 'numeric' }) =>
  date.toLocaleDateString('en', options);