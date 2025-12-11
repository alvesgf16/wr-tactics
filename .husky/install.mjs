// Skip Husky install in production and CI
if (
  process.env.NODE_ENV === 'production' ||
  process.env.CI === 'true' ||
  process.env.CI === '1'
) {
  process.exit(0);
}

try {
  const husky = (await import('husky')).default;
  if (typeof husky === 'function') {
    husky();
  } else {
    console.warn(
      'Husky default export is not a function. Git hooks may not be installed.',
    );
  }
} catch (error) {
  console.error(
    'Failed to initialize Husky:',
    error instanceof Error ? error.message : String(error),
  );
  process.exit(1);
}
