import Main from "./Main";
import All from "./All";
const Home = (props) => {
  return (
    <div className="home">
      <Main />
      <br />
      <All updateProducts={props.updateProducts} />
    </div>
  );
};

export default Home;
