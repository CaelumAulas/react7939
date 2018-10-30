import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
  constructor() {
      super()
      this.state = {
        novoTweet: 'um tweet dsudashdashu',        
        tweets: ['alo alo', 'w brazil']
      }
      
    //   this.adicionaTweet = this.adic÷ionaTweet.bind(this)
  }
  
  adicionaTweet = (infosDoEvento) => {
    infosDoEvento.preventDefault()

    const novoTweet = this.state.novoTweet
    // this.state.tweets.push(novoTweet)
    if(novoTweet) {
        this.setState({
            tweets: [novoTweet, ...this.state.tweets],
            novoTweet: ''
        })
    }
    /*
        ** Mini desafio: Limpar o campo do formulário depois de criar
        um tweet novo
    */
    // Tela atualizando com react
    // - setState faz isso tudo :)
        // - state mudou
        // - render() é chamado
  }

  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={this.adicionaTweet}>
                        <div className="novoTweet__editorArea">
                            {/* Faxer o <span> ter a classe: novoTweet__status somente quando
                            o this.state.novoTweet.length for maior que 140 caracteres */}
                            {/* <span className={
                                (this.state.novoTweet.length > 140
                                    ? 'novoTweet__status novoTweet__status--invalido'
                                    : 'novoTweet__status'
                                )
                            }> */}
                            <span className={
                                `
                                    novoTweet__status ${
                                        this.state.novoTweet.length > 140
                                        ? 'novoTweet__status--invalido'
                                        : ''
                                    }
                                `
                            }>
                                {this.state.novoTweet.length}/140
                            </span>
                            <textarea className="novoTweet__editor"
                                placeholder="O que está acontecendo?"
                                value={this.state.novoTweet}
                                onChange={(eventoDisparado) => {
                                    // this.state.novoTweet = 'o valor vai aqui'
                                    // this.render()
                                    this.setState({
                                        novoTweet: eventoDisparado.target.value
                                    })
                                }}
                            ></textarea>
                        </div>
                        <button type="submit" disabled={
                        this.state.novoTweet.length === 0 || this.state.novoTweet.length > 140
                        }
                        className="novoTweet__envia">Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        {
                            this.state.tweets.map((tweetAtual, indice) => {
                                return <Tweet key={indice} texto={tweetAtual} />
                            })
                        }

                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
