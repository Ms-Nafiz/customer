import React, { useState, useEffect } from "react";
import { mikrotikRequest } from "./utilities/MikrotikData";
function MikroTikComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const ip = "203.190.13.159";
      const username = "JAHIRULISLAM";
      const password = "12345";
      const commands = ["/interface/print"];
      const port = 8728;

      const response = await mikrotikRequest(
        ip,
        username,
        password,
        port,
        commands
      );
      console.log(response);
      setData(response);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>MikroTik Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Fetching..."}
    </div>
  );
}

export default MikroTikComponent;
