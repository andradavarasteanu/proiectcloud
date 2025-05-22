import '@/styles/globals.css';
import Navbar from './Nav';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
