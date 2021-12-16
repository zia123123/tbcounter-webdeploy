import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.instagram.com/desa.disrupsi/" target="_blank" rel="noopener noreferrer">Desa Disrupsi</a>
        <span className="ml-1">&copy; 2021 Desa Disrupsi.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://www.instagram.com/desa.disrupsi/" target="_blank" rel="noopener noreferrer">Desa Disrupsi.</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
