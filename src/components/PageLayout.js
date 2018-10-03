import React from "react"
import BaseLayout from '../components/BaseLayout';
import FsAppBar from '../components/AppBar';

export default ({ children }) => (
  <BaseLayout>
    <FsAppBar />
    <div class="fs-page">
      {children}
    </div>
  </BaseLayout>
)
