// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI) {
  process.exit(0);
}

try {
  const husky = (await import('husky')).default;
  if (typeof husky === 'function') {
    husky();
  }
} catch (error) {
  console.error('Failed to initialize Husky:', error.message);
  process.exit(1);
}
