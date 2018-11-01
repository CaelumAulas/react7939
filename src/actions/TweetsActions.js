export const carrega = function (dispatch) {
    fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then((respostaDoServer)  => {
                return respostaDoServer.json()
            })
            .then((tweetsVindosDoServer) => {
                dispatch({ type: 'CARREGA_TWEETS', tweets: tweetsVindosDoServer })
            })
}


export const adiciona = function (novoTweet) {
    return function(dispatch) {
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
                dispatch({ 
                    type: 'ADD_TWEET', tweet: tweetMontadoNoServer })
            })
        }
    }
}

export const remove = function(idDoTweetQueVaiSumir) {
    return function(dispatch) {
        return fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweetQueVaiSumir}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
        .then((resposta) => resposta.json())
        .then((respostaConvertida) => {
            dispatch({ type: 'REMOVE_TWEET', idDoTweet: idDoTweetQueVaiSumir })
        })
    }
}