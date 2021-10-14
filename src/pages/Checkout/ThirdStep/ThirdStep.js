import React from "react";
import PaymentForm from "../../../components/Forms/PaymentForm";
import SummaryTotal from "../../../components/OrderSummary";
import withLayout from "../../../hoc/withLayout";

function ThirdStep() {
  return (
    <div className="row">
      <PaymentForm />
      <SummaryTotal className="col col-4" />
    </div>
  );
}

export default withLayout(ThirdStep);
