import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!input.trim()) {
      alert('Input cannot be empty');
      return;
    }
    try {
      const newTodo = { title: input, completed: false };
      const response = await axios.post('http://localhost:5000/api/todos', newTodo);
      setTodos([...todos, response.data]);
      setInput('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const onDeleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/todos/${id}`);
      if (response.status === 200) {
        const newTodos = todos.filter((todo) => todo._id !== id);
        setTodos(newTodos);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const onEditTodo = async (id) => {
    try {
      const newTitle = prompt('Enter new title for the to-do item:');
      if (!newTitle) {
        console.error('New title cannot be empty');
        return;
      }
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { title: newTitle });
      if (response.status === 200) {
        const updatedTodos = todos.map(todo => todo._id === id ? { ...todo, title: newTitle } : todo);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  return (
    <div className='flex h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex-col gap-6 items-center justify-center p-4'>
      <h1 className='text-4xl font-bold text-blue-600 mb-4'>To-Do App</h1>
      <div className='flex gap-2 w-full max-w-md'>
        <input
          className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button className='bg-blue-500 text-white font-medium rounded-md px-4 py-2 hover:bg-blue-600' onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <ul className='w-full max-w-md mt-4 space-y-3'>
        {todos.map((todo) => (
          <li key={todo._id} className='bg-white shadow-lg rounded-lg p-4 flex justify-between items-center'>
          <p className='text-lg text-gray-800 truncate max-w-xs'>{todo.title}</p>
            <div className='flex gap-2'>
              <button onClick={() => onEditTodo(todo._id)} className='bg-green-500 text-white font-medium rounded-full px-4 py-2 hover:bg-green-600'>
                Edit
              </button>
              <button onClick={() => onDeleteTodo(todo._id)} className='bg-red-500 text-white font-medium rounded-full px-4 py-2 hover:bg-red-600'>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
