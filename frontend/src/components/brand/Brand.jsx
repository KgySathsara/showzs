import React from 'react';
import './brand.css';
import { google, slack, atlassian, dropbox, shopify } from './import'

const Brand = () => {
  return (
    <div>
      <div className='brand title'>
        <h1>Sponsers</h1>
      </div>

      <div className='brand section__padding'>
        <div>
          <img src={google} alt='google'/>
        </div>

        <div>
          <img src={slack} alt='slack'/>
        </div>

        <div>
          <img src={atlassian} alt='atlassian'/>
        </div>

        <div>
          <img src={dropbox} alt='dropbox'/>
        </div>

        <div>
          <img src={shopify} alt='shopify'/>
        </div>
      </div>
    </div>
  )
}

export default Brand