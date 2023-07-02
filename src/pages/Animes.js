import axios from "axios";
import { useEffect, useState } from "react";

import "./Animes.css";
import Card from "../componentes/Card"
import Carregando from "../images/carregando.gif"

export default function Animes() {
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        axios("https://api.jikan.moe/v4/anime")
            .then((response) => {
                setAnimes(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    
    return (
        <div className="containerAnimes">
            <div className="titlePesquisa">
                <h2 className="titlePesquisaTitle">Animes:</h2>
            </div>
            <div className="container">
                {animes.length === 0 && <img className="carregando" src={Carregando} alt="loading..."/>}
                {animes.length > 0 &&
                    <div className="carousel">
                        {animes.map((anime) => {
                            const genres = anime.genres.map((genre) => {
                                return genre.name
                            })
                            return <Card 
                            key={anime.mal_id}
                            id={anime.mal_id}
                            img={anime.images.jpg.image_url}
                            title={anime.title}
                            score={anime.score}
                            year={anime.year}
                            genres={genres}
                            synopsis={anime.synopsis}
                            duration={anime.duration}
                            rating={anime.rating}
                            />
                        })}
                    </div>
                }
            </div>
        </div>
    )
}