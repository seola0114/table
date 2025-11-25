import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LicenseInfo } from '@mui/x-license'
import './index.css'
import App from './App.jsx'

// MUI DataGridPro 라이선스 키 설정
LicenseInfo.setLicenseKey('23a4af03264bb53257a52ebb3097705eTz0xMTI5MDgsRT0xNzY2NzA3MTk5MDAwLFM9cHJlbWl1bSxMTT1zdWJzY3JpcHRpb24sUFY9aW5pdGlhbCxLVj0y')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
