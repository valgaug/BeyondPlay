# Back End: BeyondPlay Technical Assignment

This is the back-end part of the BeyondPlay Technical Assignment, developed using Node.js and GraphQL.

## Getting Started

To set up the back-end environment for the BeyondPlay Technical Assignment, follow these steps:

### Installation

1. **Install Dependencies**: Run `npm install` in the project directory to install the required dependencies.

### Starting the Application

2. **Start the Application**: Run `npm start` to launch the server. It will start the GraphQL server which can be accessed as per the configuration.

### Environment Variables

3. **Environment Configuration**: Create a `.env` file in the root of the project based on the `.env.example` template. This file should include necessary environment-specific variables like your OpenWeather API key.

## Additional Scripts

- **Testing**: Run `npm test` to execute the test suite. This will run all configured tests.
- **Building for Production**: Run `npm run build` to compile the TypeScript files for production. The compiled files will be placed in the `dist` folder.
- **Serve Production Build**: After building, you can serve the production build by using `npm run serve`.
- **Generate GraphQL Types**: Execute `npm run codegen` to generate GraphQL types, ensuring they remain in sync with your GraphQL schema.
