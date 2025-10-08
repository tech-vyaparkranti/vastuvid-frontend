import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container" style={{ maxWidth: 720, margin: '40px auto' }}>
      <h2>Dashboard</h2>
      <p>Welcome {user?.name || user?.email}</p>
      <button className="btn btn-secondary" onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;


