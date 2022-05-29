import '../styles/index.css'
import { ChakraProvider } from '@chakra-ui/react';
import { ApiProvider } from '../context/apiContext';
import Header from '../components/header';

const App = ({ Component, pageProps }: any) => {
  return (
    <ApiProvider>
      <ChakraProvider cssVarsRoot={undefined}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApiProvider>
  );
}

export default App
