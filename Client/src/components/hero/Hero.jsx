import React from "react";
import { useState } from "react";
import classes from "./hero.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const Hero = () => {
  const [type, setType] = useState("beach");
  const [priceRange, setPriceRange] = useState("0");
  const [continent, setContinent] = useState("0");
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your dream place right now</h2>
        <h5>Search the best selection of luxury real estate</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select type</option>
            <option value="beach">Beach</option>
            <option value="technology">Technoloay</option>
            <option value="health">Health-Medicine</option>
          </select>

          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">$ 100-300</option>
            <option value="1">$ 300-500</option>
            <option value="2">$ 500-700</option>
            <option value="3">$ 700-900</option>
            <option value="4">$ 900-1,200</option>
          </select>

          <select onChange={(e) => setContinent(e.target.value)}>
            <option disabled>Select State</option>
            <option value="0">Yangon</option>
            <option value="1">Ka Chin</option>
            <option value="3">Bago</option>
            <option value="4">Mandalay</option>
            <option value="5">Shan</option>
            <option value="6">Ka Yar</option>
            <option value="7">Ka Yin</option>
            <option value="8">Chin</option>
            <option value="9">Saging</option>
            <option value="10">Ta Nyin Ta Yi</option>
            <option value="11">Ma Gwe</option>
            <option value="12">Mon</option>
            <option value="13">Ra Kine</option>
            <option value="14">AyerWaddy</option>
          </select>
          <AiOutlineSearch className={classes.searchIcon} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
