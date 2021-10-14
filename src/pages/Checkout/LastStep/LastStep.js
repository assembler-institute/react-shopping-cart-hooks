import React from "react";

import withLayout from "../../../hoc/withLayout";
import Summary from "../../../components/Summary";

function LastStep() {
  return (
    <div className="row">
      <Summary />
    </div>
  );
}

export default withLayout(LastStep);
