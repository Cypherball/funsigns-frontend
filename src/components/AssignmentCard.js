import { Button } from 'react-bootstrap'

const AssignmentCard = ({ name }) => {
  return (
    <div className="dash-assignment">
      <div className="dash-assignment__name">{name}</div>
      <Button size="sm">Open</Button>
    </div>
  );
};

export default AssignmentCard;
