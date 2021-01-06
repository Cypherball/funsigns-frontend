import { Button } from 'react-bootstrap'

const AssignmentCard = ({ name, desc }) => {
  return (
    <div className='dash-assignment'>
      <div className='dash-assignment__name'>{name}</div>
      <p>{desc}</p>
      <Button size='sm'>Open</Button>
    </div>
  )
}

export default AssignmentCard
