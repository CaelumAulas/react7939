import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal';

class App extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: 'um tweet dsudashdashu',
            tweets: [],
            tweetAtivo: {}
        }
        //   this.adicionaTweet = this.adic÷ionaTweet.bind(this)
    }

    // Mostrar uma mensagem enquanto os tweets carregam...
    componentDidMount() {
        window.store.subscribe(() => {
            this.setState({
                tweets: window.store.getState() 
            })
        })
        fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        .then((respostaDoServer)  => {
            return respostaDoServer.json()
        })
        .then((tweetsVindosDoServer) => {
            window.store.dispatch({ type: 'CARREGA_TWEETS', tweets: tweetsVindosDoServer })
            // this.setState({
            //     tweets: tweetsVindosDoServer
            // })
        })
    }

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()

        const novoTweet = this.state.novoTweet
        // this.state.tweets.push(novoTweet)
        if (novoTweet) {
            fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                    method: 'POST',
                    body: JSON.stringify({ conteudo: novoTweet })
                })
                .then((respostaDoServer) => {
                    console.log('Tentou fazer algo no server...')
                    return respostaDoServer.json()
                })
                .then((tweetMontadoNoServer) => {
                    console.log('dadoQueVeioDoServer', tweetMontadoNoServer)
                    this.setState({
                        tweets: [tweetMontadoNoServer, ...this.state.tweets],
                        novoTweet: ''
                    })
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

    removeTweet = (idDoTweetQueVaiSumir) => {
        // console.log('removendo o tweet!', idDoTweetQueVaiSumir)
        // console.log('lista antes', this.state.tweets)
        const listaAtualizada = this.state.tweets.filter((tweetAtual) => {
            return tweetAtual._id !== idDoTweetQueVaiSumir
        })
        // console.log('listaAtualizada', listaAtualizada)
        fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweetQueVaiSumir}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
        .then((resposta) => resposta.json())
        .then((respostaConvertida) => {
            this.setState({
                tweets: listaAtualizada
            })
            this.fechaModal()
        })
    }

    fechaModal = () => {
        this.setState({
            tweetAtivo: {}
        })
    }

    abreModalDeTweet = (idDoTweetQueVaiFicarAtivo) => {
        const tweetClicado = this.state.tweets.find((tweetAtual) => {
            return tweetAtual._id === idDoTweetQueVaiFicarAtivo
        })
        this.setState({
            tweetAtivo: tweetClicado
        })
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
                                        return <Tweet
                                            key={tweetAtual._id}
                                            id={tweetAtual._id}
                                            texto={tweetAtual.conteudo}
                                            usuario={tweetAtual.usuario}
                                            totalLikes={tweetAtual.totalLikes}
                                            likeado={tweetAtual.likeado}
                                            removivel={tweetAtual.removivel}
                                            removeHandler={() => { this.removeTweet(tweetAtual._id) } }
                                            abreModalHandler={() => {
                                                this.abreModalDeTweet(tweetAtual._id) } }
                                            />
                                    })
                                }
                                {
                                    this.state.tweets.length === 0
                                    ? <Tweet
                                        texto="Carregando..."
                                        isLoading={true}
                                        usuario={ { foto: 'https://placehold.it/50x50' } }  />
                                    : ''
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>

                <Modal isAberto={Boolean(this.state.tweetAtivo._id)} onFechandoOModal={this.fechaModal}>
                    {/* 
                        # Desafio
                        - Quando remover o tweet, fechar o modal!
                     */}
                    <Widget>
                        <Tweet 
                            id={ this.state.tweetAtivo._id }
                            texto={ this.state.tweetAtivo.conteudo }
                            usuario={ this.state.tweetAtivo.usuario }
                            totalLikes={ this.state.tweetAtivo.totalLikes }
                            likeado={this.state.tweetAtivo.likeado}
                            removivel={this.state.tweetAtivo.removivel}
                            removeHandler={() => {
                                this.removeTweet(this.state.tweetAtivo._id) } }
                        />
                    </Widget>
                </Modal>
            </Fragment>
        );
    }
}

export default App;

