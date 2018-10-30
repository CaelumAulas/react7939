import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './navMenu.css'

class NavMenu extends Component {
    logout = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        localStorage.removeItem('TOKEN')
        this.props.history.push('/login')
    }
    render() {
        return (
            <nav className="navMenu">
                <ul className="navMenu__lista">
                <li className="navMenu__item">
                    <a href="/" className="navMenu__link">
                        Bem vindo(a): <br />
                        <strong>{ this.props.usuario }</strong>
                    </a>
                </li>
                <li className="navMenu__item">
                    <a href="/" className="navMenu__link">Página Inicial</a>
                </li>
                <li className="navMenu__item">
                    <a href="/" className="navMenu__link">Hashtags</a>
                </li>
                <li className="navMenu__item">
                    <a href="/" onClick={this.logout} className="navMenu__link">Logout</a>
                </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(NavMenu)