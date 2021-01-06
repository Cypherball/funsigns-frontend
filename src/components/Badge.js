const Badge = ({ name, description, icon }) => {
  return (
    <div className="dash-badge">
      <div className="dash-badge__icon">
        <img src={icon} alt="badge" />
      </div>
      <div className="dash-badge__name">{name}</div>
      <div className="dash-badge__desc">{description}</div>
    </div>
  );
};

export default Badge;
