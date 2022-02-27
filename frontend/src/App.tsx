import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {getSubscriptionClient} from "./graphql-client";
import gql from "graphql-tag";

const apolloClient = getSubscriptionClient();

export const postSubscription = gql`
  subscription postEvents {
    postEvents {
      ... on NewPostEvent {
        eventType
        id
        title
      }
    }
  }
`;


function App() {
  useEffect(() => {
    const observable = apolloClient.subscribe({
      query: postSubscription
    })

    observable.subscribe({
      next (result) {
        // ignore
      },
      error(err) {
        console.error('Got subscription error')
        console.error(err)
      }
    })

    setInterval(() => {
      apolloClient.refreshSubscription()
    }, 10000)
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
