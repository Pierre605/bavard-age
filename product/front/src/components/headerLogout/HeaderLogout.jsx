// import "./HeaderLogout.css";
import Logout from "../logout/Logout";
import './HeaderLogout.css'

export default function HeaderLogout(props) {

  // const getHref = () => {
  //   let a = `/${props.user}/conversation-list`
  //   // let x = document.getElementById('home')
  //   // x.setAttribute('href', a)
  //   // console.log(x)
  //   return (
  //     a
  //   )
  // }

  let a = `/${props.user}/conversation-list`
 

  return (
    <>
      <div className='inline-blocks'>
        <div>
          <a id="home" href={a}>
            <img src='/logoblanc.png' width='100px' alt='logo-provisoire' />
          </a>
        </div>
        <div id='logout-button'>
          <Logout user={props.user}/>
        </div>
      </div>
    </>
  );
}
