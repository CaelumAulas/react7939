import React, { Component } from 'react'
import Tweet from '../components/Tweet'
import PropTypes from 'prop-types'
import * as TweetsActions from '../actions/TweetsActions'

class TweetContainer extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    likeHandler = () => {
        this.context
            .store.dispatch({ type: 'LIKE', idDoTweet: this.props.id })

                //         // this.props.totalLikes = this.props.totalLikes + 1


                //         // Processo do AJAX
                //         const idDoTweet = this.props.id
                //         fetch(`
                // http://twitelum-api.herokuapp.com/tweets/${idDoTweet}/
                // like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}
                // `, {
                //             method: 'POST'
                //         })
                //         .then((resposta) => {
                //             return resposta.json()
                //         })
                //         .then((respostaConvertida) => {
                //             console.log(respostaConvertida)
                //         })
    }

    removeTweet = (idDoTweetQueVaiSumir) => {
        this.context.store.dispatch(TweetsActions.remove(idDoTweetQueVaiSumir))
        .then(() => {
            if(this.props.onRemoveTweet) this.props.onRemoveTweet()
            this.context.store.dispatch({ type: 'ADD_NOTIFICACAO', msg: 'Tweet removido!' })
        })
    }

    render() {
        console.log(this)
        return (
            <Tweet
                { ...this.props }
                removeHandler={() => { this.removeTweet(this.props.id) }}
                likeHandler={() => { this.likeHandler(this.props.id) }}
            />
        )
    }
}
export default TweetContainer