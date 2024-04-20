export function environmentVariablesChecker() {
  if (process.env.PORT) checkPort();
  checkHttpsConfig();
}

export function shouldUseHttps() {
  return process.env.SHOULD_USE_HTTPS === 'true';
}

function checkHttpsConfig() {
  if (!shouldUseHttps()) return;

  if (!process.env.HTTPS_CERT_FILEPATH)
    throw new Error('HTTPS_CERT_FILEPATH environment variable must be set');

  if (!process.env.HTTPS_KEY_FILEPATH)
    throw new Error('HTTPS_KEY_FILEPATH environment variable must be set');
}

function checkPort() {
  if (Number.isNaN(process.env.PORT))
    throw new Error('PORT environment variable must be a number');
}
