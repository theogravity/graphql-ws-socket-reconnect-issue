import { Client, createClient } from 'graphql-ws';

import { WsLink } from './WsLink';

interface ApolloSubscriptionClient {
  url: string;
  connectionParams?: Record<string, string> | (() => Promise<Record<string, string>>);
  onReconnected?: () => void;
  onConnected: (socket: unknown) => void;
  webSocketImpl?: unknown;
}

export function createApolloSubscriptionClient({
  url,
  onReconnected,
  onConnected,
  webSocketImpl,
}: ApolloSubscriptionClient): {
  wsSubscriptionLink: WsLink;
  subscriptionClient: Client;
} {
  // https://github.com/enisdenjo/graphql-ws/discussions/312
  let disconnected = false;

  const subscriptionClient = createClient({
    url,
    retryAttempts: 30,
    keepAlive: 60 * 60 * 1000,
    lazy: true,
    webSocketImpl,
    on: {
      closed: () => {
        disconnected = true;
      },
      connected: (socket) => {
        if (onConnected) {
          onConnected(socket);
        }

        if (disconnected) {
          disconnected = false;

          if (onReconnected) {
            onReconnected();
          }
        }
      },
    },
  });

  const wsSubscriptionLink = new WsLink(subscriptionClient);

  return {
    wsSubscriptionLink,
    subscriptionClient,
  };
}
