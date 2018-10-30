import React from 'react'
import { Link } from 'react-router-dom'
const Page404 = () => {
    return (
        // JSX
        <div>
            Você caiu na página 404 
            <Link to="/">Volte para a home e tente outra vez</Link>
        </div>
        // Dor e sofrimento
            // React.createElement('div', null, Você caiu na página 404)
    )
}
export default Page404

// export default () => {
//     return (
//         <div>Você caiu na página 404</div>
//     )
// }