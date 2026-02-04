// Entry point for deployment environments (e.g., cPanel) that expect a server.js file.
// Loads environment variables and boots the compiled server from ./dist/index.js.

require('dotenv').config();

try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require('./dist/index.js');
} catch (err) {
  console.error('Failed to start backend from dist/index.js', err);
  process.exit(1);
}
