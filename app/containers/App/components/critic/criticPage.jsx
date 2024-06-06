import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import personPlaceHolderImage from './person_placeholder_image.jpg';
import { NavBackBtn } from '../reviews/reviewPage';
import ReviewsList from '../reviews/reviewsList';

export function searchStringToObject(str) {
    const paramsString = str.startsWith('?') ? str.slice(1) : str;
  
    return paramsString.split('&').reduce((obj, param) => {
      const [key, value] = param.split('=');
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
      return obj;
    }, {});
}

export const reviewListSort = (review1, review2) => {
    const date1 = review1.publication_date
      ? review1.publication_date.split('-')
      : 0
    const date2 = review2.publication_date
      ? review2.publication_date.split('-')
      : 0

    return new Date(date2).valueOf() - new Date(date1).valueOf()
  }

const CriticPage = (props) => {
    const [pageSize, setPageSize] = useState(20)
    const [criticFilter, setCriticFilter] = useState('');

    const searchString = props.location.search;
    const paramsObject = searchStringToObject(searchString);
     
    let critic = null 
    if(paramsObject.hasOwnProperty('name') && paramsObject['name']){
        critic = props.critics.find(critic => critic.display_name && critic.display_name.toLowerCase()===paramsObject['name'].toLowerCase())
    } else{
        props.history.push('/home');
    }

    if(critic){
        const {
            display_name,
            bio,
            multimedia
        } = critic;

        let criticImage = multimedia && multimedia.resource;
        
        const defaultFilterFunc = (review)  => review.byline.toLowerCase()===critic.display_name.toLowerCase() 
                                    && (criticFilter!=='' ? (Number(criticFilter)===review.critics_pick): 1);

        const totalReviews = props.reviewList.filter((review)  => review.byline.toLowerCase()===critic.display_name.toLowerCase()).length;
        const criticPickedReviews = props.reviewList.filter((review)  => review.byline.toLowerCase()===critic.display_name.toLowerCase() && review.critics_pick).length;

        return ( 
            <div className='container'>
                <div><NavBackBtn history={props.history} title={"Back to review"}/></div>
                <div className='d-flex reviewbody'>
                    <div className='critic-image'>
                        <img className='reviewImage' src={(criticImage && criticImage.src) || personPlaceHolderImage} alt={""}/>
                        {
                            criticImage && criticImage.credit && (<p className='detail-row'>Credits: <span>{criticImage.credit}</span></p>)
                        }
                    </div>
                    <div className='details'>
                        <h1 className='title'>{display_name}</h1>
                        <p>Total Reviews: <span>{totalReviews}</span></p>
                        <p>Critic's Picks: <span>{criticPickedReviews}</span></p>
                    </div>
                </div>
                {
                    bio && (<p className='detail_row summary'>Bio: <span>{bio}</span></p>)
                }
                <div id='crtics-reviews'>
                    <h2 className='text-center'>Reviews</h2>
                    <ReviewsList {...props} searchProps = {{
                        pageSize,
                        criticFilter,
                        searchText: "", 
                        setCriticFilter,
                        setPageSize,
                        }} 
                        criticReviewsMode={true} 
                        defaultFilterFunc={defaultFilterFunc}
                    />
                </div>
            </div> 
         );
    } else{
        return (<div className='container'>No Critic Found</div>)
    }

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
  )(CriticPage)