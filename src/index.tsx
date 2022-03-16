import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './App';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const store = createStore(rootReducer, composeWithDevTools()); // 스토어 생성

// react query 를 사용하기 위해서는 client 를 만들어야한다.
const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </RecoilRoot>
  </BrowserRouter>,

  document.getElementById('root')
);
