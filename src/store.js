import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
function tweetsReducer(stateDaStore = [], acaoPassada) {
    if(acaoPassada.type === 'CARREGA_TWEETS') {
        return acaoPassada.tweets
    }
    if(acaoPassada.type === 'ADD_TWEET') {
        return [acaoPassada.tweet, ...stateDaStore]
    }
    if(acaoPassada.type === 'REMOVE_TWEET') {
        const listaDeTweets = stateDaStore
        const idDoTweetQueVaiSumir = acaoPassada.idDoTweet
        const listaAtualizada = listaDeTweets.filter((tweetAtual) => {
            return tweetAtual._id !== idDoTweetQueVaiSumir
        })
        return listaAtualizada
    }
    return stateDaStore
}
const store = createStore(tweetsReducer, applyMiddleware( thunk ))
export default store


// console.log(window.store.getState())
// window.store.dispatch({ type: 'CARREGA_TWEETS', tweets: [{ conteudo: 'tanana' }, { conteudo: 'pegando' }] })
// console.log(window.store.getState())


// function createStore (reducer) {
//     let state;
//     const subscribers = []

//     function subscribe (funcao) {
//         subscribers.push(funcao)
//     }

//     function dispatch (objAcaoOuAction) {
//         state = reducer(state, objAcaoOuAction)
//         subscribers.forEach((funcao) => {
//             funcao()
//         })
//     }

//     function getState () {
//         return state
//     }

//     return {
//         dispatch: dispatch,
//         getState: getState,
//         subscribe: subscribe
//     }
// }

