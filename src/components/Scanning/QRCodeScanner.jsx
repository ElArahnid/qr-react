import { Scanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import Linkify from 'react-linkify';
import s from './QRCodeScanner.module.css'
import { SCAN_DATA } from '../../constants'

export const QRCodeScanner = () => {

    const [scanResult, setScanResult] = useState(false)
    const [toggleAllowMultiple, setToggleAllowMultiple] = useState(true)

    const handleScan = (result) => {
        setScanResult(<Linkify>{result[0].rawValue}</Linkify>)
        setToggleAllowMultiple(false)
        
        const prevData = JSON.parse(localStorage.getItem(SCAN_DATA) || '[]')
        const newData = result[0].rawValue
        
        if(prevData.some(item => item === newData)) {
            alert('Этот QR-код уже был отсканирован!')
            return
        } else {
            localStorage.setItem(
                SCAN_DATA, 
                JSON.stringify([...prevData, newData])
            )
        }

    }

    const clearResult = () => {
        setToggleAllowMultiple(true)
        setScanResult(false)
    }

    return (
    <div className={s.container__scan}>
        <div className={s["container__scan-camera"]}>
        <Scanner 
            onScan={handleScan} 
            allowMultiple={toggleAllowMultiple}
            components={{ audio: false, finder: true, }} 
            styles={{container: {width: 290, height: 290}}}
        />
        </div>
        <div className={s["container__scan-result"]}>
            {scanResult 
                ?   
                    <>
                        <div>
                            <h1>Результат сканирования:</h1>
                        </div>
                        <div>
                            {scanResult}
                            <span className={s.clear} onClick={clearResult}>
                                [стереть]
                            </span>
                        </div>
                    </>
                :
                <>
                    <div>
                        <h1>Отсканируйте QR-код</h1>
                    </div>
                    <div></div>
                </>
            }
        </div>
    </div>
)
}