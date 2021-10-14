import React from "react";

import BillingForm from "../../../components/Forms/BillingForm";
import SummaryTotal from "../../../components/OrderSummary";
import withLayout from "../../../hoc/withLayout";

function SecondStep() {
  return (
    <div className="row">
      <BillingForm />
      <SummaryTotal className="col col-4" />
    </div>
  );
}

export default withLayout(SecondStep);
