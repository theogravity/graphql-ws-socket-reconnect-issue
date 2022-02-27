import { ApolloClient, ApolloClientOptions } from '@apollo/client';
import {OnRefreshRefType} from "./index";

interface ApolloClientWSParams<T> extends ApolloClientOptions<T> {
  onRefreshRef: OnRefreshRefType;
}

export class ApolloClientWS<T> extends ApolloClient<T> {
  private onRefreshRef: OnRefreshRefType;

  constructor(params: ApolloClientWSParams<T>) {
    super(params);
    this.onRefreshRef = params.onRefreshRef;
  }

  async refreshSubscription() {
    this.onRefreshRef.current();
  }
}
