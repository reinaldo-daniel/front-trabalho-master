import axios from "axios";
import { useEffect, useState } from "react";

import "./Animes.css";
import CardCharacters from "../componentes/CardCharacters"
import Carregando from "../images/carregando.gif"

export default function Personagens() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios("https://api.jikan.moe/v4/characters")
            .then((response) => {
                setCharacters(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div className="containerAnimes">
            <div className="titlePesquisa">
                <h2 className="titlePesquisaTitle">Personagens:</h2>
            </div>
            <div className="container">
                {characters.length === 0 && <img className="carregando" src={Carregando} alt="loading..."/>}
                {characters.length > 0 &&
                    <div className="carousel">
                        {characters.map((character) => {
                            return <CardCharacters 
                                img={character.images.jpg.image_url}
                                about={character.about}
                                favorites={character.favorites}
                                name={character.name}
                            />
                        })}
                    </div>
                }
            </div>
        </div>
    )
}