import React, { Component } from 'react'
import Tweet from '../components/Tweet'
import PropTypes from 'prop-types'
import * as TweetsActions from '../actions/TweetsActions'
class TweetContainer extends Component {
    static contextTypes = {
        store: PropTypes.object
    }
    removeTweet = (idDoTweetQueVaiSumir) => {
        this.context.store.dispatch(TweetsActions.remove(idDoTweetQueVaiSumir))
        .then(() => {
            if(this.props.onRemoveTweet) this.props.onRemoveTweet()
        })
    }
    render() {
        console.log(this)
        return (
            <Tweet
                { ...this.props }
                removeHandler={() => { this.removeTweet(this.props.id) }}
            />
        )
    }
}
export default TweetContainer