# NgSsr

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Deployment with Docker Compose

This project is configured for production deployment using Docker Compose, which orchestrates the Angular SSR application and an Nginx reverse proxy in separate containers.

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop).

### Architecture

The deployment consists of two services:
1.  **`app`**: A Node.js container that builds and runs the Angular Universal (SSR) application.
2.  **`nginx`**: An Nginx container that acts as a reverse proxy. It serves static files directly and forwards dynamic page requests to the `app` service.

### Configuration Files

This setup is defined by two key files:

- **`Dockerfile`**: This file is a blueprint for building the Docker image for our Angular SSR application (the `app` service). It performs the following steps:
    1.  Starts from an official `node` base image.
    2.  Copies `package.json` and installs all `npm` dependencies.
    3.  Copies the rest of the project source code into the image.
    4.  Runs `npm run build` to compile the application and generate the `dist` folder.
    5.  Sets the default command (`CMD`) to start the Node.js server.

You do not run this file directly. Docker Compose automatically uses it to build the `app` image when you run the `docker-compose up --build` command.

- **`docker-compose.yml`**: This is the main control file for orchestrating our multi-container environment. It tells Docker how to run and connect our services:
    1.  It defines the two services: `app` and `nginx`.
    2.  For the `app` service, it specifies to build the image using the `Dockerfile` in the current directory (`build: .`).
    3.  For the `nginx` service, it specifies to use the official `nginx:alpine` image from Docker Hub.
    4.  It sets up port mapping, forwarding traffic from `localhost:8080` on your machine to the `nginx` container's port `80`.
    5.  It manages `volumes` to mount your local `nginx.conf` and the static assets from `dist/ng-ssr/browser` into the `nginx` container.

This file is your primary interface for managing the entire application stack with commands like `docker-compose up` and `docker-compose down`.

### Execution Steps

Follow these steps to deploy the application:

**1. Build the Angular Application**

Before building the Docker images, you need to create the `dist` folder which contains the browser and server bundles. The Nginx container requires the browser assets from this folder.

```bash
npm run build
```

**2. Launch Services with Docker Compose**

With the `dist` folder in place, use Docker Compose to build the application image and start both services in the background.

```bash
docker-compose up --build -d
```
- `up`: Creates and starts the containers.
- `--build`: Forces a rebuild of the `app` image. Use this flag after making changes to your Angular code.
- `-d`: Runs the containers in detached mode (in the background).

**3. Verify the Application**

Once the containers are running, open your browser and navigate to:

[**http://localhost:8080**](http://localhost:8080)

The application should be fully functional. The initial page load is rendered on the server-side, and subsequent navigation is handled on the client-side.

### Managing the Deployment

- **To stop the services:**
  ```bash
  docker-compose down
  ```

- **To view logs:**
  ```bash
  # View logs for both services
  docker-compose logs -f

  # View logs for a specific service (e.g., app)
  docker-compose logs -f app
  ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.