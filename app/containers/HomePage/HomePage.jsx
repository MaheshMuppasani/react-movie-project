import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet' // Header Generator
import { Switch, Route, useHistory } from 'react-router-dom'

import hesImg from 'images/hes.png'
import ReviewsList from '../App/components/reviews/reviewsList.jsx'
import ReviewPage from '../App/components/reviews/reviewPage.jsx'
import CriticPage from '../App/components/critic/criticPage.jsx'

function ViewAllReviewsBtn(props){
  const {title, handleClick} = props;
  return <div className='container'>
    <div className='view-all-reviews' onClick={handleClick}>{title}</div>
  </div> 
}

export default function HomePage(props) {
  const [pageSize, setPageSize] = useState(20)
  const [searchText, setSearchText] = useState('')
  const [mpaa_option, setMpaa_Option] = useState('')
  const [criticFilter, setCriticFilter] = useState('');
  const [publishFrom, setPublishFrom] = useState('');
  const [publishTo, setPublishTo] = useState('');

  function handleClick(){
    return props.history.push('/home/reviews');
  }

  return (
    <div className='app-homepage'>
      <Helmet>
        <meta name="description" content="Home" />
      </Helmet>
      <div className='page-header'>
        <a className='branding' href='/home'><img src={hesImg} /></a>
        <h1>Movie Critic Reviews</h1>
      </div>
      <Switch>
        <Route path={'/home/critic'} component={CriticPage}/>
        <Route path={'/home/reviews'} render={() => <ReviewsList {...props} searchProps = {{
          pageSize,
          searchText,
          mpaa_option,
          criticFilter, 
          setCriticFilter,
          setPageSize,
          setSearchText,
          setMpaa_Option,publishFrom, setPublishFrom, publishTo, setPublishTo
        }}/>} exact/>
        <Route path={'/home/reviews/review/:reviewID'} component={ReviewPage} exact />
        <Route render={() => <ViewAllReviewsBtn title={'View All Movie Critic Reviews'} handleClick={handleClick} />}/>
      </Switch>
    </div>
  )
}