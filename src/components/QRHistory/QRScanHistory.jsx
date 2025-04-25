import { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Linkify from 'react-linkify'
import { SCAN_DATA } from '../../constants'
import s from './QRHistories.module.css'

export const QRScanHistory = () => {
    const svgContainerRef = useRef(null)
        const handlConvertToPng = () => {
        const svg = svgContainerRef.current?.querySelector('svg')
        if (!svg) return

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
    
        canvas.width = svg.width.baseVal.value;
        canvas.height = svg.height.baseVal.value;
    
        img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = 'qrcode.png';
        link.click();
        };
    
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
    return (
        <div className={s.container}>
            <h1 className={s.container__title}>История сканирования QR-кодов</h1>
            <div className={s["container__history"]}>
                {JSON.parse(localStorage.getItem(SCAN_DATA) || '[]').slice(0, 1000).map((item, index) => (
                    <div key={index} className={s["container__history-item"]} ref={svgContainerRef}>
                        <Linkify>{item}</Linkify>
                        <QRCodeSVG value={item} style={{minWidth: "100px", width: "100px"}} onClick={handlConvertToPng} />
                    </div>
                ))}
            </div>
        </div>
    )
}