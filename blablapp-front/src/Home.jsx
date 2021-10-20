import './Home.css';
import reactDom from 'react-dom';
import * as React from 'react';
import SimpleModal from './Modal';
import Login from './Login';



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    }
  }



render() {

return (
    <>
    <section>
      <Login />
      <SimpleModal />
    </section>
    </>
  );
}
}

export default Home;
