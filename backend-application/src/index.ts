import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { FavoriteResolver } from "./FavoritesResolver";

import { connectDB } from "./db";

(async () => {
  const app = express();
  const port = process.env.PORT || 4000;

  try {
    await connectDB();
    const schema = await buildSchema({
      resolvers: [FavoriteResolver],
      validate: false,
    });

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(port, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
