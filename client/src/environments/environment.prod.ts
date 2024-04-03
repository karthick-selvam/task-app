export const environment = {
  production: true,
  NODE_API_URL: '',
  FLASK_API_URL: (() => {
    const currentOrigin = window.location.origin;
    return currentOrigin.replace(':8000', ':8085');
  })(),
  solutionName: 'SMART_LOGISTICS',
};
