import React from "react";
import BaseLayout from "./Base";
import { languageFromSlug } from "../../utils";

export default ({ children, slug }) => (
  <BaseLayout slug={slug} language={languageFromSlug(slug)}>
    {children}
  </BaseLayout>
);
