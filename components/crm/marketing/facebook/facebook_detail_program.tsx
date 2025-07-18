import React, { useState } from 'react'
import ExamppleSMSFacebook from './facebook_example_sms'
import ProgramFacebook from './facebook_program'
import FacebookProgramGroup from './facebook_program_group'

const DetailProgramFacebook = () => {
    const [isDetailProgram, setSsDetailProgram ] = useState(0)
  return (
    <div>
        {
        isDetailProgram === 0 ? <ExamppleSMSFacebook/>  : 
        isDetailProgram ===  1 ?  <ProgramFacebook/> : <FacebookProgramGroup/>
      }
    </div>
  )
}

export default DetailProgramFacebook