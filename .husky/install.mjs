// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0);
}

try {
  const husky = (await import('husky')).default;
  husky();
} catch (error) {
  console.error('Failed to initialize Husky:', error.message);
  process.exit(1);
}
