import { useState, useRef } from 'react'
import {QRCodeSVG} from 'qrcode.react'
import s from './QRCodeGenerator.module.css'
import { GENERATE_DATA } from '../../constants'

export const QRCodeGenerator = () => {
    const [value, setValue] = useState('')
    const [result, setResult] = useState('')
    const [placeholder, setPlaceholder] = useState('Введите текст...')  

    const svgContainerRef = useRef(null)
    
    const handleClick = () => {
        setResult(value)
        setPlaceholder('Введите текст...')
        const prevData = JSON.parse(localStorage.getItem(GENERATE_DATA) || '[]')
        if(prevData.some(item => item === value)) {
            alert('Этот QR-код уже был сгенерирован!')
            return
        } else {
            localStorage.setItem(
                GENERATE_DATA, 
                JSON.stringify([...prevData, value])
            )
      }
    }

    const handleChange = (event) => {
        setValue(event.target.value)
        setResult('')
    }

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
            <h1 className={s.container__title}>Генератор QR-кодов</h1>
            <div className={result == '' ? s["qr-code-hidden"] : s["qr-code"]} ref={svgContainerRef}>
            {result !== '' && (
                <QRCodeSVG 
                value={value} 
                onClick={handlConvertToPng}
                size={200} 
                style={{ cursor: 'pointer' }}
                />
            )}{value}
            </div>
            <p className={s.container__description}>Введите текст и нажмите кнопку, чтобы сгенерировать QR-код.</p>
            <div className={s.form}>
            <textarea type="text" value={value} onChange={handleChange} className={s.input} placeholder={placeholder} />
            <button type="button" className={s.button} onClick={handleClick}>
                Сгенерировать QR-код 
            </button>
            </div>
        </div>
    )
}
