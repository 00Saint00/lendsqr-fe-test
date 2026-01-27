import { usersStats } from "../../core/data";
import "../../styles/users.scss";

const Users = () => {
  return (
    <div className="users">
      <div className="users__header">
        <h1 className="users__title">Users</h1>
      </div>

      <div className="users__stats">
        {usersStats.map((stat, index) => (
          <div key={index} className="users__stat-card">
            <img
              src={stat.icon}
              alt={stat.title}
              className="users__stat-icon"
            />
            <div className="users__stat-content">
              <h3 className="users__stat-title">{stat.title}</h3>
              <p className="users__stat-count">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users