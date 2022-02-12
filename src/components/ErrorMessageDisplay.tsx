import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

export const ErrorMessageDisplay = () => {
  const { requests } = useContext(AppContext);

  if (requests.fetching.hasErrored) {
    return (
      <div>
        {"Error during fetch:"} {requests.fetching.errorMessage}
      </div>
    );
  } else if (requests.updating.hasErrored) {
    return (
      <div>
        {"Error during update:"} {requests.updating.errorMessage}
      </div>
    );
  }

  return null;
};
