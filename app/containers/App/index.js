/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet' // Header Generator
import { Switch, Route } from 'react-router-dom'

import HomePage from 'containers/HomePage/HomePage'

import '../../styles/styles.scss'
import { getMovieReviews } from '../../resources/reviews/reviews.actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getCritics } from '../../resources/critics/critics.actions'


function RedirectToHome(props){
  props.history.push('/home')
  return null;
}

function App(props) { 

  useEffect(() => {
    props.getMovieReviews();
    props.getCritics();
  },[])

    return (
      <div className="app-wrapper">
        <Helmet defaultTitle="Everyone's a critic">
          <meta name="description" content="React Movie Reviews" />
        </Helmet>

        <Switch>
          <Route path="/" render={() => <RedirectToHome {...props} />} exact/>
          <Route path="/home" component={HomePage} />
        </Switch>
      </div>
    )
  }

  const mapDispatchToProps = dispatch => ({
    getMovieReviews: () => dispatch(getMovieReviews()),
    getCritics: () => dispatch(getCritics())
  })
  
  export default compose(
    connect(
      null,
      mapDispatchToProps
    )
  )(App)