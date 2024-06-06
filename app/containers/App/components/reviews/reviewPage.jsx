import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { compose } from 'redux';
  
export const NavBackBtn = (props) => {
    const handleNavBtnClick = (e) => {
        e.stopPropagation();
        if(props.history.location.key)
            props.history.goBack();
        else
            props.history.push('/home/reviews')
    }
    return <button className='navBtn' onClick={handleNavBtnClick}>{`< ${props.title}`}</button>
}

const ReviewPage = (props) => {
    const { reviewID } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        if(!reviewID || isNaN(Number(reviewID))) return;
        const data = props.reviewList.find(review => review.id === Number(reviewID));
        if(data){
            setReview(data);
        }
    }, [props.reviewList, reviewID])
    
    if(!review){
        return <div>Loading...</div>
    }

    const {
        display_title,
        multimedia = null,
        publication_date,
        mpaa_rating,
        critics_pick,
        headline,
        summary_short,
        byline,
        link
    } = review;

    let critic = null;
    if(byline && props.critics){
        critic = props.critics.find(critic => critic.display_name && critic.display_name.toLowerCase()===byline.toLowerCase())
    }

    function goToCriticPage(e){
        e.preventDefault();
        props.history.push(`/home/critic?name=${critic.display_name}`)
    }

    return ( 
    <div className='container'>
        <div><NavBackBtn history={props.history} title={"Back to reviews"}/></div>
        <div className='d-flex reviewbody'>
            <img className='reviewImage' src={multimedia.src} alt={display_title}/>
            <div className='details'>
                <h1 className='title'>{display_title}</h1>
                <p>Published on: <span>{publication_date}</span></p>
                <p>MPAA Rating: <span>{mpaa_rating}</span></p>
                {
                    byline && (<p className='critic-info'>Critic: {
                        critic && critic.display_name ? 
                        (<a href={`/home/critic?name=${critic.display_name}`} onClick={goToCriticPage}><span>{byline}</span></a>)
                        : (<span>{byline}</span>)
                    }</p>)
                }
                <p className='detail_row'>{critics_pick ? 'Critics Pick👍' : ''}</p>
                <p>Headline: <span>{headline}</span></p>
                {
                    link.url && (<p>Link: <a href={link.url} target='_blank'><span>{link.suggested_link_text || link.url}</span></a></p>)
                }
            </div>
        </div>
        <p className='detail_row summary'>Summary: <span>{summary_short}</span></p>
    </div> 
    );
}


const mapStateToProps = ( { resources: { reviews, critics } } , ownProps) => ({
    reviewList: reviews.data,
    reviewsError: reviews.error,
    critics: critics.data,
    criticsError: critics.error
  });
  
  export default compose(
    connect(
      mapStateToProps,
      null
    )
  )(ReviewPage)