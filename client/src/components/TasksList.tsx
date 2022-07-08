import { TasksType } from "../types";
import styled from "styled-components";

type TasksListProps = {
  list: TasksType[];
};

const Table = styled.table`
  padding: 15px;
  width: 100%;

  thead {
    font-weight: 500;
    background: #e2e2e2;
  }

  tr:nth-child(even) {
    background: #f2f2f2;
  }

  td {
    padding: 10px 0;
  }
`;

function TasksList({ list }: TasksListProps) {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Src</td>
            <td>Selector</td>
          </tr>
        </thead>
        <tbody>
          {list.map((task, i) => (
            <tr key={i}>
              <td>{task.title}</td>
              <td>{task.src}</td>
              <td>{task.selector}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TasksList;
