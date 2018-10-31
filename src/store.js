
import { createStore } from 'redux'

function tweetsReducer(stateDaStore = [], acaoPassada) {
    console.log(acaoPassada)
    if(acaoPassada.type === 'CARREGA_TWEETS') {
        return acaoPassada.tweets
    }

    return stateDaStore
}

window.store = createStore(tweetsReducer)
// console.log(window.store.getState())
// window.store.dispatch({ type: 'CARREGA_TWEETS', tweets: [{ conteudo: 'tanana' }, { conteudo: 'pegando' }] })
// console.log(window.store.getState())

