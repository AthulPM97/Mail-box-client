const Home = () => {
  const userMail = localStorage.getItem('email');
  return (
    <header>
      <h1>Welcome to your mail box</h1>
      <h2>{userMail}</h2>
    </header>
  );
};

export default Home;
