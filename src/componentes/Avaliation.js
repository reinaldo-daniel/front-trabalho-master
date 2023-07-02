import { AiFillStar } from "react-icons/ai";

import "./Avaliation.css"

export default function Avaliation({aval}) {

    const renderStars = (aval) => {
        const teste = 10 - aval
        const stars = [];

        for(let i = 0; i<aval; i++) {
            stars.push(<AiFillStar style={{color: "yellow", fontSize: 50}}/>)       
        }

        for(let i = 0; i<teste; i++) {
            stars.push(<AiFillStar style={{color: "rgb(136, 136, 0)", fontSize: 50}}/>)       
        }

        return stars
    }

    const stars = renderStars(aval);

    return(
        <>
        <div className="stars">
            {stars}   
        </div>
        </>
    )
}