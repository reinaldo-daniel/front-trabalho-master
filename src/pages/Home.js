import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import Typewriter from "typewriter-effect"

import "./Home.css"
import Card from "../componentes/Card"
import Carregando from "../images/carregando.gif"
import { Navigate } from "react-router-dom";

export default function Home() {
    const [animes, setAnimes] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!search) return;
    
        Navigate(`/pesquisa?q=${search}`, { replace: true });
        setSearch("");
    };

    useEffect(() => {
        axios.get(`https://api.jikan.moe/v4/top/anime?page=${currentPage}&limit=25`)
        .then((response) => {
            console.log(response);
            setAnimes(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [currentPage])

    return(
        <>
            <div className="banner">
                <div className="pesquisa">
                    <h2 className="titlePesquisa">
                        Aqui você encontra seus 
                        <Typewriter 
                            onInit={(typewriter) =>{
                                typewriter
                                    .typeString("mangás")
                                    .pauseFor(2000)
                                    .deleteAll()
                                    .typeString("personagens")
                                    .pauseFor(2000)
                                    .deleteAll()
                                    .typeString("animes")
                                    .start();
                            }}
                        />
                    </h2>
                    <form className="pesquisar" onSubmit={handleSubmit}>
                        <input 
                            className="inputPesquisa"
                            type={"text"}
                            placeholder={"Example: Black Clover"}
                            onChange={(e) => setSearch(e.target.value)}   
                        />
                        <button type="submit" className="botao"><AiOutlineSearch className="lupa"/></button>
                    </form>
                </div>
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
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="botaoPagi"
                >
                    Volta
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="botaoPagi"
                >
                    Prox
                </button>
            </div>
            </div>
        </>
    );
}