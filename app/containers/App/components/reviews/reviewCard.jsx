import React from 'react';
import styled from 'styled-components';

const ReviewCard = (props) => {
    const { 
        id,
        multimedia = null, 
        display_title, 
        publication_date,
        mpaa_rating,
        critics_pick 
    } = props.review;
    const handleCardClick = (e) => {
        e.preventDefault();
        props.handleCardClick(id);
    }
    return ( 
    <a className={`${props.className} reviewCard`} href={`/home/reviews/review/${id}`} onClick={handleCardClick}>
        <img src={multimedia.src} alt={display_title}/>
        <div>
            <h2>{display_title}</h2>
            <p className='detail_row'>Released on: <span>{publication_date}</span></p>
            <div className='d-flex justify-space-between'>
                <p className='detail_row'>MPAA Rating: <span>{mpaa_rating}</span></p>
                <p className='detail_row'>{critics_pick ? 'Critics Pick👍' : ''}</p>
            </div>
        </div>
    </a> 
    );
}

const styledReview = styled(ReviewCard)`
    // width: 400px;
    max-height: 400px;
    cursor: pointer;
    padding: 1rem;
    color: black;
    font-size: 1rem;
    column-gap: 1rem;
    border: 1px solid #bdbdbd;
    transition: 0.2s all;
    border-radius: 0.4rem;
    h2 {
        margin: 0.5rem 0;
    };
    img{
        height: unset;
        width: 100%;
    }
    :hover {
        box-shadow: 5px 5px 5px 2px rgb(51 51 51 / 27%);
    };
`

export default styledReview;