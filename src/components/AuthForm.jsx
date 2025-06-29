import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/auth/authSlice';

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.token) {
      dispatch(setToken(data.token));
    } else {
      alert(data.message || 'Помилка');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Увійти' : 'Реєстрація'}</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
      <button type="submit">{type === 'login' ? 'Увійти' : 'Зареєструватись'}</button>
    </form>
  );
};

export default AuthForm;