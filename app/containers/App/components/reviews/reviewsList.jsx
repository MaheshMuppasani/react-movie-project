import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import ReviewCard from './reviewCard.jsx'
import { reviewListSort } from '../critic/criticPage.jsx'

export const isDateInBetween = (date, minDate, maxDate) => {
  const dateValue = new Date(date).valueOf();
  const minDateValue = new Date(minDate).valueOf();
  const maxDateValue = new Date(maxDate).valueOf();

  return minDateValue <= dateValue && dateValue <= maxDateValue;
}

const ReviewsList = props => {
  const { 
    pageSize, 
    searchText, 
    mpaa_option, 
    setPageSize, 
    setSearchText, 
    setMpaa_Option, 
    criticFilter, 
    setCriticFilter, publishFrom, setPublishFrom, publishTo, setPublishTo
   } = props.searchProps;
  let actualRecordCount = 0;
  let displayRecordCount = 0;

  if (!props.reviewList) {
    return <div>Loading...</div>
  }

  function handleCardClick(id){
    if(props.criticReviewsMode){
      return open(`/home/reviews/review/${id}`)
    }
    return props.history.push(`/home/reviews/review/${id}`)
  }
  
  function renderReviewList() {
    const actualRecords = props.reviewList.sort(reviewListSort)
    .filter(props.defaultFilterFunc || (review => {
      return (
        review.display_title.toLowerCase().includes(searchText.toLowerCase())
        && (mpaa_option ? review.mpaa_rating === mpaa_option : 1)
        && (criticFilter!=='' ? (Number(criticFilter)===review.critics_pick): 1)
        && (publishFrom && publishTo ? (isDateInBetween(review.publication_date.split('-'), publishFrom.split('-'), publishTo.split('-'))) : 1)
      )
    }));
    actualRecordCount = actualRecords.length;

    const displayRecords = actualRecords.slice(0, pageSize)
    .map(review => <ReviewCard review={review} key={review.id} handleCardClick={handleCardClick} />);
    displayRecordCount = displayRecords.length;

    return displayRecords;
  }

  function changePageSize(e) {
    return setPageSize(Number(e.target.value))
  }

  function changeSearchText(e) {
    return setSearchText(e.target.value)
  }

  function changeMPAAOption(e) {
    return setMpaa_Option(e.target.value)
  }

  function changeCriticFilter(e){
    return setCriticFilter(e.target.value)
  }

  const reviewList = renderReviewList()
  const ratingOptions = (
    <>
      <option value={''}>Select</option>
      {props.mpaa_options.map(
        option =>
          option && (
            <option key={option} value={option}>
              {option}
            </option>
          )
      )}
    </>
  )

  return (
    <div className={props.criticReviewsMode ? '' : 'container'}>
      <div className="search_filter">
        {
          !props.criticReviewsMode && (
            <>
              <div>
                <label htmlFor="title_search">Movie Title: </label>
                <input
                  name="title_search"
                  id="title_search"
                  type="text"
                  value={searchText}
                  onChange={changeSearchText}
                  placeholder="Search Title"
                />
              </div>
              <div>
                <label htmlFor="fromDate">Publication Date From: </label>
                <input name="fromDate" id="fromDate" type="date" value={publishFrom} max={publishTo} onChange={e=>setPublishFrom(e.target.value)} />
                <label htmlFor="toDate"> To: </label>
                <input name="toDate" id="toDate" type="date" value={publishTo} min={publishFrom} onChange={e=>setPublishTo(e.target.value)} />
              </div>
              <div>
                <label htmlFor="MPAA_Rating">MPAA Rating: </label>
                <select
                  name="MPAA_Rating"
                  id="MPAA_Rating"
                  value={mpaa_option}
                  onChange={changeMPAAOption}>
                  {ratingOptions}
                </select>
              </div>
            </>
          )
        }
        <div className='critic_filter_select'>
          <label htmlFor="critic_filter">Critics Pick: </label>
          <select
            name="critic_filter"
            id="critic_filter"
            value={criticFilter}
            onChange={changeCriticFilter}>
            <option value={''}>Select</option>
            <option value={0}>NO</option>
            <option value={1}>YES</option>
          </select>
        </div>
      </div>
      <div className="reviewList">{
        reviewList.length ? reviewList : <p className='d-flex align-item-center margin-auto'><span>No Records Found</span></p>
      }</div>
      <div className='d-flex justify-space-between align-item-center'>
        <p>Showing {displayRecordCount} of {actualRecordCount} Records</p>
        <div className="reviewList-sizer">
          <label htmlFor="pagesize">Records Per Page: </label>
          <select
            name="pagesize"
            id="pagesize"
            value={pageSize}
            onChange={changePageSize}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ resources: { reviews } }, ownProps) => ({
  reviewList: reviews.data,
  error: reviews.error,
  mpaa_options: reviews.MPAA_options,
})

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(ReviewsList);
