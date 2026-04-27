import './App.css'
import { Navbar, ErrorBoundary } from './components';
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
            <Navbar/>
            <AppRoutes/>
          </SearchProvider>
        </HashRouter>
      </AppThemeProvider>
    </ErrorBoundary>
  )
}

export default App
