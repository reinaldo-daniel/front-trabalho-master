import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import Carregando from "../images/carregando.gif";
import CardCharacters from "../componentes/CardCharacters";
import Avaliation from "../componentes/Avaliation";
import "./Anime.css";
import numeral from "numeral";

export default function Anime() {
    const { id } = useParams();
    const [ anime, setAnime ] = useState({});
    const [ personagens, setPersonagens ] = useState([]);

    useEffect(() => {
        axios(`https://api.jikan.moe/v4/anime/${id}/full`)    
            .then((response) => {
                setAnime(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })

        axios(`https://api.jikan.moe/v4/anime/${id}/characters`)    
            .then((response) => {
                setPersonagens(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])

    function calcularPorcentagem(score) {
        return (score / 10) * 100;
    }

    const formattedScoredBy = numeral(anime.scored_by).format("0,0")

    return (
        <>
            <div className="container">
                {!anime && <img className="carregando" src={Carregando} alt="loading..."/>}
                {anime && anime.trailer?.images?.maximum_image_url &&
                    <>
                        <div className="anime">
                            <div className="animeSpecify">
                                <img className="imgAnime" src={anime.images.jpg.large_image_url} alt={anime.title}/>
                                <p>Duração: {anime.duration}</p>
                                <p>Ano de lançamento: {anime.year}</p>
                                <div className="genres">
                                    {anime.genres.map((genre) => {
                                        return <p key={genre.mal_id} className="genre">{genre.name}</p>
                                    })}
                                </div>
                            </div>

                            <div className="specifys">
                                <h2 className="nameAnime">{anime.title}</h2>
                                <div className="rating">
                                    <div style={{ width: 150, height: 150, marginRight: 20 }}>
                                        <CircularProgressbar
                                            value={calcularPorcentagem(anime.score)}
                                            text={anime.score}
                                            styles={buildStyles({
                                                rotation: 0.1,
                                                textSize: '30px',
                                                textColor: '#00ff00',
                                                trailColor: '#fff99000',
                                                pathColor: '#00ff00', 
                                                backgroundColor: '#000000',
                                            })}
                                        />
                                    </div>
                                    <div className="aval">
                                        <h2 className="nameAnime">Avaliação</h2>
                                        <Avaliation aval={Math.floor(anime.score)}/>
                                        <p className="avaliation">Avaliação: {anime.score}/10 de {formattedScoredBy} usuários</p>
                                    </div>
                                </div>
                                <div className="description">
                                    <p>{anime.synopsis}</p>
                                </div>
                            </div>
                        </div>

                        <div className="carrossel">
                            <h2 className="nameAnime">Personagens:</h2>
                        </div>

                        <div className="personagens">
                            {personagens.map((personagem) => {
                                const imgSrc = personagem.character.images?.jpg?.image_url;

                                return <CardCharacters
                                    key={personagem.character.mal_id}
                                    img={imgSrc}
                                    favorites={personagem.favorites}
                                    name={personagem.character.name}
                                />
                            })}
                        </div>

                        <div className="videos">
                            <iframe width="1080" height="600"
                                title="anime.title"
                                src={anime.trailer.embed_url}>
                            </iframe>
                        </div>
                    </>
                }
            </div>
        </>
    )
}