import React from 'react';
import styled from 'styled-components';

export const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Review = (props) => {
    const { 
        multimedia = null, 
        display_title, 
        publication_date,
        mpaa_rating,
        critics_pick 
    } = props.review;
    return ( 
    <FlexDiv className={props.className}>
        <img src={multimedia.src} alt={display_title}/>
        <div>
            <h4>{display_title}</h4>
            <p>{publication_date}</p>
            <span>MPAA Rating: {mpaa_rating}</span>
            <span>{critics_pick}</span>
        </div>
    </FlexDiv> 
    );
}

const styledReview = styled(Review)`
    padding: 1rem;
    column-gap: 1rem;
`

export default styledReview;