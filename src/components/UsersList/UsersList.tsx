import classnames from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import getUsers, { User } from '../../dataProviders/getUsers';
import './UsersList.css';

type Props = {
  searchValue: string;
  className?: string;
}

enum Status {
  Error = 'Error',
  Empty = 'Empty',
  Loading = 'Loading'
}

const UsersList: React.FC<Props> = ({ className, searchValue }) => {
  const [status, setStatus] = useState<Status>(Status.Empty);
  const [users, setUsers] = useState<User[]>([]);
  const classNames = classnames('UsersList', className);

  useEffect(() => {
    setStatus(Status.Loading);

    getUsers()
      .then((result) => {
        setUsers(result);
        setStatus(Status.Empty);
      })
      .catch((err) => {
        setStatus(Status.Error);
      })
  }, []);

  function getList() {
    const filteredUsers = users.reduce<ReactElement[]>(
      (aggr, { name, username }, index) => {
        if (name.toLowerCase().includes(searchValue.toLowerCase())) {
          aggr.push(
            <div className="UsersList__item" key={`user${index}`}>
              <span className="UsersList__name">{name}</span>
              <span className="UsersList__tag">@{username}</span>
            </div>
          );
        }

        return aggr;
      },
      []
    );

    if (!filteredUsers.length) {
      return (
        <div className="UsersList__empty">No users found :(</div>
      );
    }

    return filteredUsers;
  }

  if (status === Status.Loading) {
    return (
      <div className="UsersList__loading">Loading...</div>
    );
  }

  if (status === Status.Error) {
    return (
      <div className="UsersList__error">
        Error occurred! Try refreshing the page.
      </div>
    );
  }

  return (
    <div className={classNames}>{getList()}</div>
  );
};

export default UsersList;
