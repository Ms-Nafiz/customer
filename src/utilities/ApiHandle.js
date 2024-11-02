import { useEffect, useState } from 'react';
import axios from 'axios';

export function DataFetchingComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://complaint.cclcatv.com/api/area-list')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
  }, []); // Runs only once when the component mounts

  return data;
}

