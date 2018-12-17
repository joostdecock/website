import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import ChooseModel from "../app/draft/ChooseModel";
import { patternList } from "@freesewing/patterns";

const ChooseModelPage = props => {
  let pattern = props["*"].split("/").pop();
  if (patternList.indexOf(pattern) === -1) return <p>FIXME: No such pattern</p>;
  else
    return (
      <BaseLayout>
        <AuthContainer>
          <ChooseModel {...props.pageContext} pattern={pattern} />
        </AuthContainer>
      </BaseLayout>
    );
};

export default ChooseModelPage;
