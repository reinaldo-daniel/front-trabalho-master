import axios from "axios";
import { useEffect, useState } from "react";

import "./Animes.css";
import Card from "../componentes/Card"
import Carregando from "../images/carregando.gif"

export default function Mangas() {
    const [mangas, setMangas] = useState([]);

    useEffect(() => {
        axios("https://api.jikan.moe/v4/manga")
            .then((response) => {
                setMangas(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div className="containerAnimes">
            <div className="titlePesquisa">
                <h2 className="titlePesquisaTitle">Mangás:</h2>
            </div>
            <div className="container">
                {mangas.length === 0 && <img className="carregando" src={Carregando} alt="loading..."/>}
                {mangas.length > 0 &&
                    <div className="carousel">
                        {mangas.map((anime) => {
                            const genres = anime.genres.map((genre) => {
                                return genre.name
                            })
                            return <Card 
                                key={anime.mal_id}
                                img={anime.images.jpg.image_url}
                                title={anime.title}
                                score={anime.score}
                                year={anime.year}
                                genres={genres}
                                synopsis={anime.synopsis}
                                rating={anime.rating}
                            />
                        })}
                    </div>
                }
            </div>
        </div>
    )
}