import {
  useCreateTodolistMutation,
  useDoneTodolistMutation,
} from "../reducers/todolistsApiSlice";

export const useTodolists = () => {
  const [createTodolist] = useCreateTodolistMutation();
  const [doneTodolist] = useDoneTodolistMutation();

  const handleAdd = async (data) => {
    try {
      const response = await createTodolist({ data });
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDoned = async (todolist, data) => {
    const { id } = todolist;
    try {
      const response = await doneTodolist({ id, data });
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  return { handleAdd, handleDoned };
};
