import { ApolloLink, FetchResult, Observable, Operation } from '@apollo/client/core';
import { print } from 'graphql';
import { Client } from 'graphql-ws';

// Websocket Link
export class WsLink extends ApolloLink {
  private client: Client;

  constructor(client: Client) {
    super();
    this.client = client;
  }

  request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        },
      );
    });
  }
}
