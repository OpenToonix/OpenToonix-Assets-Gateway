# OpenToonix Assets Gateway

Gateway for static assets from Toonix World _(mostly known as **Mundo Toonix**)_.

## Requirements

- **[Node.js](https://nodejs.org/en)** - Version 20.x
- **[PNPM](https://pnpm.io/)** - Version 8.x
- **Environment variables**

    | Variable              | Type    | Description                      | Default | Required                                                               | Example                     |
    |-----------------------|---------|----------------------------------|---------|------------------------------------------------------------------------|-----------------------------|
    | `CDN_PATH`            | String  | Path to the CDN                  | None    | Yes                                                                    | `https://cdn.toonix.com`    |
    | `HTTP_SERVER_ADDRESS` | String  | Address to HTTP server           | None    | Yes                                                                    | `https://toonix.com`        |
    | `HTTPS_CA_FILEPATH`   | String  | Path to the SSL CA file          | None    | Yes, when the environment variable `SHOULD_USE_HTTPS` is set to `true` | `<Path to SSL CA>`          |
    | `HTTPS_CERT_FILEPATH` | String  | Path to the SSL certificate file | None    | Yes, when the environment variable `SHOULD_USE_HTTPS` is set to `true` | `<Path to SSL certificate>` |
    | `HTTPS_KEY_FILEPATH`  | String  | Path to the SSL key file         | None    | Yes, when the environment variable `SHOULD_USE_HTTPS` is set to `true` | `<Path to SSL key>`         |
    | `PORT`                | Number  | Port to run the server           | 80      | No                                                                     | `3000`                      |
    | `SHOULD_USE_HTTPS`    | Boolean | Use HTTPS protocol               | None    | No                                                                     | `true`                      |

### Development Tools

- [EditorConfig](https://editorconfig.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Running

### Using Node.js

For running the application with Node.js,
you will need to either clone the repository
or download the zip file from the [releases page](https://github.com/OpenToonix/OpenToonix-Assets-Gateway/releases).

#### For Development

1. Clone the repository.
2. Install the dependencies with `pnpm install`.
3. Run the application with `pnpm run dev`.

#### For Production

1. Download the zip file from the [releases page](https://github.com/OpenToonix/OpenToonix-Assets-Gateway/releases).
2. Extract the zip file.
3. Install the dependencies with `pnpm install --prod`.
4. Run the application with `pnpm start`.
