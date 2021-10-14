import React from "react";

import NewClientForm from "../../components/NewClientForm";
import withLayout from "../../hoc/withLayout";

function NewClient({ saveNewClient }) {
  return (
    <div className="row justify-content-center">
      <div className="col col-8">
        <div className="row">
          <header className="col col-12">
            <h1>New client</h1>
          </header>
          <div className="col col-12">
            <hr />
          </div>

          <div className="col col-12">
            <NewClientForm saveNewClient={saveNewClient} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(NewClient);
