import React from "react";
import classes from "./popularinvestment.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../../../util/fetchApi";

const PopularInvestment = () => {
  const [numProperties, setNumProperties] = useState({});

  useEffect(() => {
    const fetchNumberProperties = async () => {
      try {
        const data = await request("/property/find/types", "GET");
        setNumProperties(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNumberProperties();
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.titles}>
            <h5>Different types of properties</h5>
            <h2>Best type of properties for you</h2>
          </div>
          <div className={classes.properties}>
            <Link to={``} className={classes.property}>
              <img
                src={`https://cdn.pixabay.com/photo/2020/10/21/21/55/man-5674344_960_720.png`}
                alt=""
              />
              <div className={classes.quantity}>
                {numProperties.realEstate} Properties
              </div>
              <h5>Beach Properties</h5>
            </Link>

            <Link to={``} className={classes.property}>
              <img
                src={`https://cdn.pixabay.com/photo/2022/11/29/21/35/it-7625451_960_720.jpg`}
                alt=""
              />
              <div className={classes.quantity}>
                {numProperties.itTechnology} Properties
              </div>
              <h5>Technology Investments</h5>
            </Link>

            <Link to={``} className={classes.property}>
              <img
                src={`https://cdn.pixabay.com/photo/2016/12/05/19/49/syringe-1884784_960_720.jpg`}
                alt=""
              />
              <div className={classes.quantity}>
                {numProperties.healthMedical} Properties
              </div>
              <h5>Medical & Health</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularInvestment;
