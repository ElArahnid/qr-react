import { Routes, Route } from "react-router-dom"
import { QRCodeGenerator } from "../Generate/QRCodeGenerator" 
import { QRCodeScanner } from "../Scanning/QRCodeScanner"
import { Navigator } from "../Navigate/Navigation"
import { QRGenHistory } from "../QRHistory/QRGenHistory"
import { QRScanHistory } from "../QRHistory/QRScanHistory"
import s from './Layout.module.css'

export const Layout = () => {

    return  (
        <div className={s.container}>
            <Navigator />          
            <div>
                <Routes>
                    <Route path="/"                 element={<QRCodeGenerator />} />
                    <Route path="/generate"         element={<QRCodeGenerator />} />
                    <Route path="/scan"             element={<QRCodeScanner />} />
                    <Route path="/generate-history" element={<QRGenHistory />} />
                    <Route path="/scan-history"     element={<QRScanHistory />} />
                </Routes>
            </div>
        </div>
    )
}