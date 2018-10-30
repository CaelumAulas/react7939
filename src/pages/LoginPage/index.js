import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {

    // - mostrar via console.log, os dados do input login e senha
    // - Após o console.log, fazer um:
        // this.props.history.push('/')

    state = {
        login: '',
        senha: ''
    }
    
    fazLogin = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        console.log('capturando o login')
        const dadosDoLogin = {
            login: this.refs.inputLogin.value,
            senha: this.refs.inputSenha.value
        }
        fetch('http://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(dadosDoLogin)
        })
        .then((respostaDoServidor) => {
            return respostaDoServidor.json()
        })
        .then((objetoComOToken) => {
            localStorage.setItem('TOKEN', objetoComOToken.token)
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" action="/" onSubmit={this.fazLogin}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label> 
                                <input ref="inputLogin" className="loginPage__input" type="text" id="login" name="login"/>
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input ref="inputSenha" className="loginPage__input" type="password" id="senha" name="senha"/>
                            </div>
                            {/* <div className="loginPage__errorBox">
                                Mensagem de erro!
                            </div> */}
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage