import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([]);

    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjk3MDE2YWViZmI2ZWVkMWVmZGZiZmEzMWQzMzMyMCIsIm5iZiI6MTczMDI3MDg4NS4zOTEzNzk2LCJzdWIiOiI2NzIxZDU3ZDAwM2M0YjViNWI2NDExYTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9Q4fbhw_Huopri8G01OCZJ7DWs14dgjFfbeNkaWRsEM'
        }
    };



    const handleWheel = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
    }

    useEffect(() => {
        cardsRef.current.addEventListener('wheel', handleWheel)
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='title-cards'>
            <h1>{title ? title : "Popular on Netflix"}</h1>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className='card' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards