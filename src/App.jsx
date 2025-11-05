import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom' // ← Importa BrowserRouter aquí
import { AuthProvider } from '../src/contexts/AuthContext' // ← Asegúrate de importar AuthProvider
import AppRoutes from '../src/routes/AppRouter' // ← Asegúrate de importar AppRoutes

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App