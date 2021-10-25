import './Header.css'
import Logout from './Logout'


export default function Header() {
    return (
        <>
        <div className="inline-blocks">
            <div>
            <a href="/conversation-list"><img src="/logo2.png" width="100px" alt="logo-provisoire"/></a>
            </div>
            <div id="logout-button">
                <Logout />
            </div>
        </div>
        </>
    )
}

