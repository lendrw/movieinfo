import './App.css'
import { Navbar } from './components';
import { SearchProvider } from './contexts';
import { AppThemeProvider } from './contexts/ThemeContext';
import { AppRoutes } from './routes'
import { HashRouter } from 'react-router-dom';

function App() {

  return (
    <AppThemeProvider>
      <HashRouter>
        <SearchProvider>
          <Navbar/>
          <AppRoutes/>
        </SearchProvider>
      </HashRouter>
    </AppThemeProvider>
  )
}

export default App
