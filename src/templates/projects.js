import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";

export const Card = ({ title, desc, tags, path, excerpt, coverimg }) => (
  <Link to={path} key={path} className=" h-full">
    <div className="card w-full cursor-pointer h-full mb-4 duration-500 ease-in-out transform hover:scale-105">
      <div className="bg-default text-default shadow-lg h-full rounded-lg rounded ">
        <div className="block">
          <figure className="relative tint mb-5 h-48 w-full">
            <Img
              fluid={coverimg.childImageSharp.fluid}
              className="rounded-t h-full"
            />
          </figure>
        </div>
        <div className="p-5 pb-16">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-default text-base">{desc ? desc : excerpt}</p>
          <div className="absolute bottom-0">
            <div className="flex flex-wrap mb-5">
              {tags.slice(0, 3).map((tag) => (
                <button key={tag} className="tag">
                  {tag.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  coverimg: PropTypes.shape({
    childImageSharp: PropTypes.shape({ fluid: PropTypes.string.isRequired }),
  }),
};
