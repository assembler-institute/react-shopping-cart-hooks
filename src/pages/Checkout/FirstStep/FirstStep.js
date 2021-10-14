import React from "react";
import SummaryTotal from "../../../components/OrderSummary";
import withLayout from "../../../hoc/withLayout";
import AccountForm from "../../../components/Forms/AccountForm";

function FirstStep() {
  return (
    <div className="row">
      <AccountForm />
      <SummaryTotal className="col col-4" />
    </div>
  );
}

export default withLayout(FirstStep);
