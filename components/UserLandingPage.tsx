const UserLandingPage = ({ currentUser }) => {
  return (
    <div>
      <p>UserLandingPage</p>
      {currentUser.name}
    </div>
  );
};

export default UserLandingPage;
