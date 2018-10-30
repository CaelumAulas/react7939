import React, { Component } from 'react'
// const Component = React.Component
import './cabecalho.css'
import './navMenu.css'

export default class Cabecalho extends Component {
    render() {
        console.log(this)
        console.log(this.props.children.props.usuario)
    return (
<header className="cabecalho">
    <div className="cabecalho__container container">
        <h1 className="cabecalho__logo">
            <a href="/">Twitelum</a>
        </h1>
        { this.props.children }
    </div>
</header>
        )
        
    }
}

// - CSS


// - JavaScript
// - HTML

// React.createElement('header', { class: 'header-global' },
//     React.createElement('ul'))
