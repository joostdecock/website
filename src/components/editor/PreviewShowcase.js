import React from "react";
import Image from "gatsby-image";
import { Link } from "gatsby";
import Datum from "../Datum";
import { locLang } from "../../utils";
import Markdown from "react-markdown";

const PreviewShowcase = props => {
  return (
    <React.Fragment>
      <ul className="meta">
        <li>
          <Datum date={props.date} />
        </li>
        {Object.keys(props.patterns).map((pattern, index) => {
          return (
            <li>
              <Link
                to={locLang.set(
                  "/showcase/category/" + pattern,
                  props.language
                )}
              >
                #{pattern}
              </Link>
            </li>
          );
        })}
      </ul>
      <figure>
        <Image
          fluid={props.fluid}
          title={props.caption}
          alt={props.caption}
          backgroundColor={"#212121"}
          className="overpad1"
        />
        <Markdown source={props.caption} />
      </figure>
      <h1>{props.title}</h1>
      <Markdown source={props.markdown} />
    </React.Fragment>
  );
};

export default PreviewShowcase;
