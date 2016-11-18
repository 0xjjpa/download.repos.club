import React from 'react'

export const Navbar = ({loggedIn, onClick}) => {
  return (
    <nav className='pt-navbar pt-dark'>
      <div className='pt-navbar-group pt-align-left'>
        <div className='pt-navbar-heading'>Blunder Repos</div>
      </div>
      <div className='pt-navbar-group pt-align-right'>
        <button onClick={onClick()} className='pt-button pt-minimal pt-icon-user'>
          {
            loggedIn
            ? 'Logout'
            : 'Log in'
          }
        </button>
      </div>
    </nav>
  )
}
