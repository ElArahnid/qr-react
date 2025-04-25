import { Link } from "react-router-dom";
import s from './Navigator.module.css'

export const Navigator = () => {
    return (
            <>
                <div className={s.toggler}>
                    <span className={s.generator}><Link to="/generate">Генерировать QR-код</Link></span>
                    <span className={s.scanner}><Link  to="/scan">Сканировать QR-код</Link></span>
                </div>
                <div className={s.toggler}>
                    <span className={s.generator}><Link  to="/generate-history">История генераций</Link></span>
                    <span className={s.scanner}><Link  to="/scan-history">История сканирований</Link></span>
                </div>
            </>
    )
}