import React, { Component } from 'react';

import userimg from '../assets/user.png';
import facebook from '../assets/facebook.jpg';


class Header extends Component {
  render() {
    return (
      <>
        <header>
          <img src={facebook} className="facebook"/>
          <div className="userdiv">
          <strong className="meuperfil">Meu perfil</strong>
          <img src={userimg} className="user"/>
          </div>
        </header>
      </>
    )

  }
}

export default Header;
