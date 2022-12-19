import 'reflect-metadata';

import '../styles/globals.css';

import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css';

import AppBar from '../components/AppBar';
import AppProvider from '../components/AppProvider';

export default function RootLayout({ children }: any) {
  return (
    <html>
      <head></head>
      <body>
        <AppProvider>
          <AppBar></AppBar>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
