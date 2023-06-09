import React, { useEffect, useState } from "react";
import classes from "./featuredInvestment.module.css";
import { request } from "../../../util/fetchApi";
import { Link } from "react-router-dom";

const FeaturedInvestment = () => {
  const [featuredInvestments, setFeaturedInvestments] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request("/property/find/featured,", "GET");
        setFeaturedInvestments(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Properties you may like</h5>
          <h2>Our Featured Properties</h2>
        </div>

        <div className={classes.featuredProperties}>
          {featuredInvestments?.map((property) => (
            <div key={property._id} className={classes.featuredProperty}>
              <Link
                to={`/propertyDetail/${property._id}`}
                className={classes.imgContainer}
              ></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedInvestment;
