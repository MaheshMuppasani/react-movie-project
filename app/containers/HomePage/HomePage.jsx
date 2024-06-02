import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet' // Header Generator
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'

import hesImg from 'images/hes.png'
import { getMovieReviews } from 'resources/reviews/reviews.actions'
import Review from '../App/components/review'

export function HomePage(props) {
  const history = useHistory()

  useEffect(() => {
    props.getMovieReviews()
  },[])

  function renderReviewList(){
    return props.reviewList.sort((review1, review2) => {
      const date1 = review1.publication_date ? review1.publication_date.split('-') : 0;
      const date2 = review2.publication_date ? review2.publication_date.split('-') : 0;
      
      return (new Date(date2)).valueOf() - (new Date(date1)).valueOf();
    }).map(review => <Review review = {review} key = {review.id} />)
  }

  const reviewList = renderReviewList();

  return (
    <div>
      <Helmet>
        <meta name="description" content="Home" />
      </Helmet>
      <main>
        <img src={hesImg} />
      </main>
      <div>{reviewList}</div>
    </div>
  )
}

const mapStateToProps = ( { resources: { reviews } } , ownProps) => ({
  reviewList: reviews.data,
  error: reviews.error
});

const mapDispatchToProps = dispatch => ({
  getMovieReviews: () => dispatch(getMovieReviews()),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomePage)
