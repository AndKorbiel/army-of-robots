import axios from "axios";
import { useEffect, useState } from "react";
import TasksList from "./TasksList";

// not needed in this case probably
type ResFromServer = {
  data: string;
};

function CustomList() {
  const [tasksData, setTasksData] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async (): Promise<ResFromServer> => {
      try {
        const res = await axios.get("/tasks");
        setTasksData(res.data);
        setLoading(true);
        return res.data;
      } catch (e: any) {
        return e.message;
      }
    };
    getData();
  }, []);

  return <div>{isLoading ? <TasksList list={tasksData} /> : null}</div>;
}

export default CustomList;
