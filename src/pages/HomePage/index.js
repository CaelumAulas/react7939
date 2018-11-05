import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../containers/TweetContainer'
import Modal from '../../components/Modal';
import PropTypes from 'prop-types'
import * as TweetsActions from '../../actions/TweetsActions'

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

    static contextTypes = {
        store: PropTypes.object
    }
    // import * as TweetsActions from '../../actions/TweetsActions'
    componentDidMount() {
        this.context.store.subscribe(() => {
            this.setState({
                tweets: this.context.store.getState().tweets.listaDeTweets,
                tweetAtivo: this.context.store.getState().tweets.tweetAtivo
            })
        })
        TweetsActions.carrega(this.context.store.dispatch)
    }

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        const novoTweet = this.state.novoTweet
        
        // TweetsActions.adiciona(novoTweet)(this.context.store.dispatch)
        this.context.store.dispatch(TweetsActions.adiciona(novoTweet))

        this.setState({
            novoTweet: ''
        })
    }

    fechaModal = () => {
        this.context.store.dispatch({ type: 'FECHA_MODAL' })
    }

    abreModalDeTweet = (idDoTweetQueVaiFicarAtivo) => {
        this.context.store.dispatch({ type: 'ABRE_MODAL', idDoTweet: idDoTweetQueVaiFicarAtivo })
    }

    // Tela atualizando com react
    // - setState faz isso tudo :)
    // - state mudou
    // - render() é chamado
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
                                            abreModalHandler={() => {
                                                this.abreModalDeTweet(tweetAtual._id)
                                            }}
                                        />
                                    })
                                }
                                {
                                    this.state.tweets.length === 0
                                        ? <Tweet
                                            texto="Carregando..."
                                            isLoading={true}
                                            usuario={{ foto: 'https://placehold.it/50x50' }} />
                                        : ''
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>

                <Modal isAberto={Boolean(this.state.tweetAtivo._id)} onFechandoOModal={this.fechaModal}>
                    <Widget>
                        <Tweet
                            id={this.state.tweetAtivo._id}
                            texto={this.state.tweetAtivo.conteudo}
                            usuario={this.state.tweetAtivo.usuario}
                            totalLikes={this.state.tweetAtivo.totalLikes}
                            likeado={this.state.tweetAtivo.likeado}
                            removivel={this.state.tweetAtivo.removivel}
                            onRemoveTweet={() => {
                                this.fechaModal()
                            }}
                        />
                    </Widget>
                </Modal>

                {
                    this.context.store.getState().notificacao &&
                    <div className="notificacaoMsg"
                        onAnimationEnd={
                            () => this.context
                                .store
                                .dispatch({ type: 'REMOVE_NOTIFICACAO' })
                    }>
                        { this.context.store.getState().notificacao }
                    </div>
                }
            </Fragment>
        );
    }
}

export default App;

