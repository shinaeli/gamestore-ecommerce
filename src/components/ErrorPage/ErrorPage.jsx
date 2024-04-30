import React from 'react'
import './ErrorPage.css'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="error container">
        <h1 className="raleway-bold error-main-title">Oops!</h1>
        <h3 className="raleway-semibold error-sub-title">404 - PAGE NOT FOUND</h3>
        <p className="raleway-regular error-text">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
        <Link className="raleway-semibold back-home" to="/">Go To Homepage</Link>
        <Footer />
    </div>
  )
}

export default ErrorPage