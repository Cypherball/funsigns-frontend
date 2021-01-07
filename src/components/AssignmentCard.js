import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import AssignModal from './AssignModal'

const AssignmentCard = (props) => {
  const [modalShow, setModalShow] = useState(false);
  
  return (
    <>
      <div className='dash-assignment'>
        <div className='dash-assignment__name'>{props.name}</div>
        {/* <p>{props.desc}</p> */}
        <Button size='sm' onClick={() => setModalShow(true)}>Open</Button>
      </div>
      <AssignModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={{
          name: props.name,
          description: props.desc
        }}
        updateBadge={props.updateBadge}
        updateProgress={props.updateProgress}
        progress={props.progress}
        plagBadge={props.plagBadge}
      />
    </>
  )
}

export default AssignmentCard
