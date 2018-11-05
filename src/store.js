import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

const stateInicial = { listaDeTweets: [], tweetAtivo: {} }
function tweetsReducer(stateDaStore = stateInicial, acaoPassada) {
    if(acaoPassada.type === 'CARREGA_TWEETS') {
        return {
            ...stateDaStore,
            listaDeTweets: acaoPassada.tweets
        }
    }
    
    if(acaoPassada.type === 'ADD_TWEET') {
        return {
            ...stateDaStore,
            listaDeTweets: [acaoPassada.tweet, ...stateDaStore.listaDeTweets]
        }
    }
    
    if(acaoPassada.type === 'REMOVE_TWEET') {
        const listaDeTweets = stateDaStore.listaDeTweets
        const idDoTweetQueVaiSumir = acaoPassada.idDoTweet
        const listaAtualizada = listaDeTweets.filter((tweetAtual) => {
            return tweetAtual._id !== idDoTweetQueVaiSumir
        })
        return {
            ...stateDaStore,
            listaDeTweets: listaAtualizada
        }
    }

    if(acaoPassada.type === 'ABRE_MODAL') {
        const tweetClicado = stateDaStore.listaDeTweets.find((tweetAtual) => {
            return tweetAtual._id === acaoPassada.idDoTweet
        })

        return {
            ...stateDaStore, // spread
            tweetAtivo: tweetClicado
        }
    }

    if(acaoPassada.type === 'FECHA_MODAL') {
        return {
            ...stateDaStore,
            tweetAtivo: stateInicial.tweetAtivo
        }
    }

    if(acaoPassada.type === 'LIKE') {
        const listaNova = stateDaStore.listaDeTweets.map((tweetAtual) => {
            if(tweetAtual._id === acaoPassada.idDoTweet) {
                let likeado = tweetAtual.likeado;
                let totalLikes = tweetAtual.totalLikes;
                
                if(likeado) {
                    totalLikes = totalLikes - 1
                } else {
                    totalLikes = totalLikes + 1
                }

                tweetAtual.likeado = !likeado
                tweetAtual.totalLikes = totalLikes
            }

            return tweetAtual
        })
        return {
            ...stateDaStore,
            listaDeTweets: listaNova
        }
    }
    
    return stateDaStore
}

// store.dispatch({ type: 'ADD_NOTIFICACAO', msg: 'alo alo' })
// store.dispatch({ type: 'REMOVE_NOTIFICACAO' })

function notificacaoReducer(state = '', action = {}) {
    if(action.type === 'ADD_NOTIFICACAO') {
        return action.msg
    }
    if(action.type === 'REMOVE_NOTIFICACAO') {
        return ''
    }
    return state
}
const store = createStore(combineReducers({
        tweets: tweetsReducer,
        notificacao: notificacaoReducer
    }),
    applyMiddleware( thunk ))

window.store = store

console.log(window.store.getState())
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
//         if(typeof objAcaoOuAction === 'function') {
//             return objAcaoOuAction(dispatch)
//         } else {
//             state = reducer(state, objAcaoOuAction)
//             subscribers.forEach((funcao) => {
//                 funcao()
//             })
//         }
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

