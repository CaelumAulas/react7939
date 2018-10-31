## O que vocês esperam do React?
- "Quero fazer interfaces sexys! Animações e tal, não sei fazer isso, sei que da pra fazer com css, mas cara fico perdidão"
    - http://airbnb.io/lottie/
    - Bodymovin: (Checar essa fonte: https://aescripts.com/bodymovin/)
    - Draw SVG: https://css-tricks.com/svg-line-animation-works/
    - Filter SVG: https://www.youtube.com/watch?v=XtwGwOemE6w
    - https://cssanimationspocketguide.com/
    - GreenSock animações topster: https://greensock.com/react
- Curva de aprendizagem rápida
- Construir componentes reutilizaveis
    - https://www.polymer-project.org/

- Juqueri sob demanda:
    - https://polyfill.io/v2/docs/

## Ajuda em PWAs:
- https://developers.google.com/web/tools/workbox/

## Qual a diferença entre angular e react?
- React 
    - Mais pequenos trechos de código tudo misturado
    - 
- Angular
    - Uma parada monstruosa
    - Bazuca pra matar mosca
    - Usa componentização (forma evoluida das diretivas)
    - 

Pontos importantes
- Conhecer seu time

- Full-stack javascript com react é plenamente possível
- Back end as a service



## Quem está por tras do react?
- Facebook


<script src="react.js"></script>



## Dicas VsCódigo
- https://stackoverflow.com/questions/30203752/how-do-i-duplicate-a-line-or-selection-within-visual-studio-code
- Deletar linha Ctrl + X: https://code.visualstudio.com/docs/getstarted/keybindings


## Implementação dos bagulhos de array
```js
Array.prototype.forEach = function(funcao) {
    const arrayAtual = this
    for(item of arrayAtual) {
        funcao(item)
    }

    return undefined
}

Array.prototype.map = function(funcao) {
    const arrayAtual = this
    const novoArray = []
    for(item of arrayAtual) {
        novoArray.push(funcao(item))
    }

    return novoArray
}
```

## Arquitetura de CSS
- http://blog.alura.com.br/criando-componentes-css-com-padrao-bem/
- http://getbem.com/introduction/
- Alternativa:
    - http://rscss.io/

## Diferenças entre function e arrow function
- function: this é dinamico (this muda de acordo com o contexto de execução)
- arrow function: this tem contexto de leitura (this permanece o mesmo independente de onde seja executada)
- Como saber o que vai vir no JavaScript nos próximos anos? https://github.com/tc39/proposals
- https://hipsters.tech/evolucao-e-especificacao-do-javascript-moderno/

## Livros
- https://www.amazon.com.br/JavaScript-Good-Parts-English-ebook/dp/B0026OR2ZY?tag=goog0ef-20&smid=A18CNA8NWQSYHH&ascsubtag=go_1366271959_58245915327_265589414315_pla-476553242118_c_
- Livros da série You Don't know js: https://www.google.com.br/search?q=you+dont+know+js&oq=you+dont+know+js&aqs=chrome..69i57j0l5.2037j0j4&sourceid=chrome&ie=UTF-8
- https://martinfowler.com/articles/201803-refactoring-2nd-ed.html

## Curso Devtools
- https://www.youtube.com/watch?v=XUgfwYzv-WQ&list=PLOU2XLYxmsILUKyjDYUVYLeq7yyTxM_3d


## Desafio pós curso:
- Recriar isso em React: https://www.felipefialho.com/css-components