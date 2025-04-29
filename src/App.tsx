import './App.css'
import { Navbar } from './components';
import { SearchProvider } from './contexts';
import { AppThemeProvider } from './contexts/ThemeContext';
import { AppRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <AppThemeProvider>
      <BrowserRouter>
        <SearchProvider>
          <Navbar/>
          <AppRoutes/>
        </SearchProvider>
      </BrowserRouter>
    </AppThemeProvider>
  )
}

export default App
