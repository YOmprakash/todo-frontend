import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa'; 
import { Oval } from 'react-loader-spinner';

const Home = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://todo-backend-cr6r.onrender.com/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
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
      const response = await axios.post('https://todo-backend-cr6r.onrender.com/api/todos', newTodo);
      setTodos([...todos, response.data]);
      setInput('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const onDeleteTodo = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this todo?');

    if (!confirmed) return;

    try {
      const response = await axios.delete(`https://todo-backend-cr6r.onrender.com/api/todos/${id}`);
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
      if (!newTitle) return;

      const response = await axios.put(`https://todo-backend-cr6r.onrender.com/api/todos/${id}`, { title: newTitle });
      if (response.status === 200) {
        const updatedTodos = todos.map(todo => todo._id === id ? { ...todo, title: newTitle } : todo);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50'>
      <h1 className='mb-6 text-5xl font-bold text-indigo-600'>To-Do App</h1>
      
      <div className='flex flex-col w-full max-w-lg gap-4 sm:flex-row'>
        <input
          className='flex-grow p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className='flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          onClick={handleAddTodo}
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* List of Todos */}
      <ul className='w-full max-w-lg mt-6 space-y-2'>
        {loading ? (
          <div className='flex items-center justify-center h-20'>
          <Oval
            height={50}
            width={50}
            color="#4fa94d"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
        ) : todos.length === 0 ? (
          <p className='text-center text-gray-500'>No todos found</p>
        ) : (
          todos.map((todo) => (
            <li key={todo._id} className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
              <p className='text-lg text-gray-800 truncate'>{todo.title}</p>
              <div className='flex gap-2'>
                <button
                  onClick={() => onEditTodo(todo._id)}
                  className='flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600'
                >
                  <FaEdit /> 
                </button>
                <button
                  onClick={() => onDeleteTodo(todo._id)}
                  className='flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600'
                >
                  <FaTrashAlt /> 
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
