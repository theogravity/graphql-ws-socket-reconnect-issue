import { init } from './app';

init({ gqlPort: 4000 })
  .then((server) => {
    console.log(`GraphQL server started on port 4000.\n`);
    console.log(`Endpoint: http://localhost:4000${server.graphqlPath}`);
    console.log(`Playground: http://localhost:4000/playground`);
    return server;
  })
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
