import React, { useReducer } from "react";

//Enclosed in quotes and in the format: yyyy-mm-dd
const initialTodos = [
  {
    id: 1,
    text: "Python",
    completed: true,
    author: "Faby",
    due: "2022-01-16",
    progress: 100,
    dateCompleted: ""
  },
  {
    id: 2,
    text: "Bash",
    completed: false,
    author: "Alex",
    due: "2022-01-03",
    progress: 50,
    dateCompleted: ""
  }
];

function appReducer(state, action) {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        {
          id: Date.now(),
          text: "",
          author: "",
          due: "",
          completed: false,
          dateCompleted: "",
          progress: 0
        }
      ];
    }
    case "delete": {
      return state.filter((item) => item.id !== action.payload);
    }
    case "completed": {
      return state.map((item) => {
        if (item.id === action.payload) {
          console.log(item.completed);
          if (!item.completed) {
            return {
              ...item,
              completed: true,
              progress: 100,
              dateCompleted: "2022-05-28"
            };
          } else {
            return {
              ...item,
              completed: false,
              progress: 0,
              dateCompleted: ""
            };
          }
        }

        return item;
      });
    }
    case "progress": {
      return state.map((item) => {
        if (item.id === action.payload) {
          //console.log(action.progress);
          if (action.progress === "100") {
            console.log(item.id);
            return {
              ...item,
              completed: true,
              dateCompleted: "2023-06-01"
            };
          } else {
            return {
              ...item,
              completed: false,
              dateCompleted: ""
            };
          }
        }

        return item;
      });
    }
    case "clear": {
      return [...initialTodos];
    }
    default: {
      return state;
    }
  }
}

export default function TodoApp() {
  const [state, dispatch] = useReducer(appReducer, initialTodos);

  return (
    <>
      <h3>List: add, delete, complete and refresh</h3>
      <button onClick={() => dispatch({ type: "add" })}>
        Create Todo
      </button>{" "}
      <button onClick={() => dispatch({ type: "clear" })}>Clear Todo</button>
      <br /> <br />
      <div style={{ margin: "20px" }}>
        {state.map((item) => (
          <React.Fragment key={item.id}>
            <input
              type="checkbox"
              name="isCompleted"
              checked={item.completed} //{state.completed}
              onChange={(e) =>
                dispatch({
                  type: "completed",
                  payload: item.id,
                  completed: e.target.value //item.completed
                })
              }
            />
            <input type="text" defaultValue={item.text} />{" "}
            <input type="text" defaultValue={item.author} />{" "}
            <input type="date" defaultValue={item.due} />{" "}
            <input
              type="range"
              defaultValue={item.progress}
              onChange={(e) =>
                dispatch({
                  type: "progress",
                  payload: item.id,
                  progress: e.target.value
                })
              }
            />{" "}
            <input type="date" defaultValue={item.dateCompleted} />{" "}
            <button
              onClick={() => dispatch({ type: "delete", payload: item.id })}
            >
              Delete
            </button>
            <br />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
