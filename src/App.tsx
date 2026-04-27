import './App.css'
import { Navbar, ErrorBoundary, ScrollToTop } from './components';
import { SearchProvider } from './contexts';
import { AppThemeProvider } from './contexts/ThemeContext';
import { AppRoutes } from './routes'
import { HashRouter } from 'react-router-dom';

function App() {

  return (
    <ErrorBoundary>
      <AppThemeProvider>
        <HashRouter>
          <SearchProvider>
            <ScrollToTop/>
            <Navbar/>
            <AppRoutes/>
          </SearchProvider>
        </HashRouter>
      </AppThemeProvider>
    </ErrorBoundary>
  )
}

export default App
