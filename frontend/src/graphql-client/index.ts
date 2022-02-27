import {ApolloLink, InMemoryCache} from '@apollo/client';
import {createApolloSubscriptionClient} from "./create-client";
import {ApolloClientWS} from "./ApolloClientWS";
import {RetryLink} from "@apollo/client/link/retry";
export type OnRefreshRefType = { current: () => void };

export function getSubscriptionClient() {
  const onRefreshRef: OnRefreshRefType = {
    current: () => {
      // intentionally empty
    },
  };

  const { wsSubscriptionLink } = createApolloSubscriptionClient({
    url: 'ws://localhost:4000/graphql',
    onConnected: (socket: any) => {
      console.log('Connected to subscription server... waiting 10s to refresh')
      onRefreshRef.current = () => {
        console.log(`socket readyState: ${socket.readyState}`)

        if (socket.readyState === WebSocket.OPEN) {
          // https://github.com/enisdenjo/graphql-ws/discussions/319
          socket.close(4205, 'Client Restart');
        }
      };
    },
  });

  const retryLink = new RetryLink({
    delay: {
      initial: 250,
      // 30 seconds is the maximum amount of time we should ever wait between calls
      max: 30 * 1000,
      jitter: true,
    },
  });

  return new ApolloClientWS({
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
    link: ApolloLink.from([retryLink, wsSubscriptionLink]),
    cache: new InMemoryCache({
      resultCaching: false,
    }),
    name: 'test',
    onRefreshRef,
    assumeImmutableResults: false,
  });
}
