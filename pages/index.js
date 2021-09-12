import SearchSuggestion from "../components/SearchSuggestion";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Stat from "../components/Stat";
import Footer from "../components/Footer";

const api = process.env.NEXT_PUBLIC_REACT_API;
const url = process.env.NEXT_PUBLIC_REACT_URL;

const Home = ({ arrayData }) => {
  const suggestions= arrayData;
  const [weather, setWeather] = useState([""]);
  // useEffect(() => {
  //   const fetchSuggestions = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://raw.githubusercontent.com/TamjidAhmed10/ImportantJsonCollections/main/worlddata.txt"
  //       );
  //       const data = response.data;
  //       let arrayData = data.split(",");
  //       setSuggestions(arrayData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchSuggestions();
  // }, []);

  return (
    <div className="container mx-auto  ">
      <div>
        <div className="grid grid-row-4 place-items-center ">
          <div className="centerabsulute">
            <Stat weather={weather} />
          </div>
          <nav className="">
            <Navbar />
          </nav>
          <div className="">
            <SearchSuggestion
              suggestions={suggestions}
              url={url}
              api={api}
              changeWeather={(weather) => setWeather(weather)}
            />
          </div>
          <div className="">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getStaticProps() {
try {
  const response = await axios.get(
    "https://raw.githubusercontent.com/TamjidAhmed10/ImportantJsonCollections/main/worlddata.txt"
  );
  const data = response.data;
  let arrayData = data.split(",");
  return {
    props: {
      arrayData,
    },
  };
} catch (error) {
  console.error(error);
}
}

export default Home;
