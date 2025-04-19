import './App.css'
import { Navbar } from './components';
import { AppThemeProvider } from './contexts/ThemeContext';
import { AppRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Navbar/>
        <AppRoutes/>
      </BrowserRouter>
    </AppThemeProvider>
    
  )
}

export default App
