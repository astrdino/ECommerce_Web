import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const FooterBanner = ({footerBanner:{
  midText, largeText1, largeText2
}}) => {
  return (
    <div className="footer-banner-container">

      <div className="banner-desc">

        <div className="left">

          {/* <p>{discount}</p> */}
        
          <p>{midText}</p>
          {/* <p>{LargeText2}</p> */}
        </div>

        <div className="right"></div>

        <p>{largeText1}</p>

      </div>
      
    </div>
  )
}

export default FooterBanner
