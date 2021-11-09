// import "./HeaderLogout.css";
import Logout from "../logout/Logout";
import './HeaderLogout.css'

export default function HeaderLogout() {
  return (
    <>
      <div className='inline-blocks'>
        <div>
          <a href='/conversation-list'>
            <img src='/logoblanc.png' width='100px' alt='logo-provisoire' />
          </a>
        </div>
        <div id='logout-button'>
          <Logout />
        </div>
      </div>
    </>
  );
}
