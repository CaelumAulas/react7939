import React, { Component } from 'react'
import './modal.css'

export default class Modal extends Component {
    fechandoOModal  = (infosDoEvento) => {
        const estaClicandoNoModal = infosDoEvento.target.classList
        .contains('modal')
        if(estaClicandoNoModal) {
            this.props.onFechandoOModal()
        }
    }
    render() {
        return (
            <div className={
                `modal ${
                    this.props.isAberto
                    ? 'modal--active'
                    : ''
                }`
                }
                onClick={this.fechandoOModal}>

                { this.props.isAberto && this.props.children }

            </div>
        )
    }
}