import React from 'react'

export const Navbar = ({loaded}) => (
  <nav className='pt-navbar pt-dark'>
    <div className='pt-navbar-group pt-align-left'>
      <div className='pt-navbar-heading'>Blunder Repos</div>
    </div>
    <div className='pt-navbar-group pt-align-right'>
      <button className='pt-button pt-minimal pt-icon-user'>{ loaded ? 'Logout' : 'Log in'}</button>
    </div>
  </nav>
)
