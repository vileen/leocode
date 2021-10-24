import React, { ReactElement, useEffect, useState } from 'react';
import getUsers, { User } from '../../dataProviders/getUsers';
import Error from '../Error';
import './UsersList.css';

type Props = {
  searchValue: string;
}

const UsersList: React.FC<Props> = ({ searchValue }) => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => {
        setError(err);
      })
  }, []);

  function getList() {
    return users.reduce<ReactElement[]>((aggr, { name, username }, index) => {
      if (name.toLowerCase().includes(searchValue.toLowerCase())) {
        aggr.push(
          <div className="UsersList__item">
            <span className="UsersList__number">{index + 1}.</span>
            {name}
            <span className="UsersList__tag">@{username}</span>
          </div>
        );
      }

      return aggr;
    }, []);
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="UsersList">
      <div className="UsersList__items">{getList()}</div>
    </div>
  );
};

export default UsersList;
