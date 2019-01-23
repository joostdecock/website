import React from "react";
import Image from "gatsby-image";
import { Link } from "gatsby";
import Datum from "../Datum";
import { locLang } from "../../utils";

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
        <figcaption dangerouslySetInnerHTML={{ __html: props.caption }} />
      </figure>
      <h1>{props.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.html }} />
    </React.Fragment>
  );
};

export default PreviewShowcase;
