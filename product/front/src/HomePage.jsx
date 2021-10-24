import './HomePage.css';
import reactDom from 'react-dom';
import * as React from 'react';
// Composants enfants
import SimpleModal from './Modal';
import Login from './Login';



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    }
  }


// Rendu React du composant 
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

export default HomePage;
