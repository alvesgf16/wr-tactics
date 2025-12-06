#!/usr/bin/env node
const { execSync } = require('node:child_process');
const path = require('node:path');
const os = require('node:os');

const files = process.argv.slice(2);

if (files.length === 0) {
  process.exit(0);
}

try {
  const apiDir = path.join(__dirname, 'api');
  const venvDir = path.join(apiDir, '.venv');

  // Determine the python executable path based on OS
  const isWindows = os.platform() === 'win32';
  const pythonPath = isWindows
    ? path.join(venvDir, 'Scripts', 'python.exe')
    : path.join(venvDir, 'bin', 'python');

  // Run linters using the venv python
  execSync(`"${pythonPath}" -m black ${files.join(' ')}`, {
    cwd: apiDir,
    stdio: 'inherit',
    shell: true,
  });

  execSync(`"${pythonPath}" -m ruff check --fix ${files.join(' ')}`, {
    cwd: apiDir,
    stdio: 'inherit',
    shell: true,
  });
} catch (error) {
  process.exit(error.status || 1);
}
