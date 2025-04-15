import './App.css'
import { AppThemeProvider } from './contexts/ThemeContext';
import { AppRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </AppThemeProvider>
    
  )
}

export default App
