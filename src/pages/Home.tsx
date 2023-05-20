import * as React from "react";
import { useCallback, useState } from "react";

import { useKeycloak } from "@react-keycloak/web";

import { useAxios } from "../utils/hooks";

interface Vehicle {
  type: 'SMALL_TAXI' | 'UNKNOWN'
  registrationNumber: string
}
export default () => {
  const { keycloak } = useKeycloak();
  const [data, setData] = useState([]);
  const axiosInstance = useAxios(); // see https://github.com/panz3r/jwt-checker-server for a quick implementation
  const callApi = useCallback(async () => {
    if (!!axiosInstance.current) {
      const response = await axiosInstance.current.get(
        "/api/vehicles/search?type=SMALL_TAXI"
      );
      setData(response.data);
    }
  }, [axiosInstance]);

  return (
    <div>
      <div>User is {!keycloak?.authenticated ? "NOT " : ""} authenticated</div>

      {!!keycloak?.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}

      <button type="button" onClick={callApi}>
        Call API
      </button>
      {data.map((element: Vehicle) => (
        <div key={element.registrationNumber}>{element.type}</div>
      ))}
    </div>
  );
};
