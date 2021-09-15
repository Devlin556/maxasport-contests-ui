import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Spinner } from 'reactstrap';

import './users-list.css'

import { makeRequest } from '../../helpers/make-request';
import UsersListItem, { User } from './UsersListItem';

interface Props {}

const UsersListPage: React.FC<Props> = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [getting, setGetting] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [shuffling, setShuffling] = useState(false)
  
  const getUsers = useCallback(async () => {
    setGetting(true)
    const response = await makeRequest({
      path: '/getContestants',
      method: 'GET',
      secret: localStorage.getItem('admin-token')!
    })
    
    setGetting(false)
    
    setUsers(response.data.data as Array<User>)
  }, [users])
  
  useEffect(() => {
    getUsers()
  },[]);
  
  const resetUsers = useCallback(async () => {
    setResetting(true);
    const response = await makeRequest({
      path: '/clear',
      method: 'POST',
      secret: localStorage.getItem('admin-token')!
    })

    setResetting(false);
    
    setUsers([]);
  }, [])
  
  const shuffleUsers = useCallback(async () => {
    setShuffling(true);
    const response = await makeRequest({
      path: '/shuffle',
      method: 'GET',
      secret: localStorage.getItem('admin-token')!
    })

    setShuffling(false);
  
    console.log(response)
    
    setUsers([response.data.data.winner]);
  }, [])
  
  return (
    <div className="users-list-page">
      <ButtonGroup>
        <Button onClick={shuffleUsers} color="success">{shuffling ? <Spinner size="sm" /> : 'Shuffle users'}</Button>
        <Button onClick={getUsers} color="info">{getting ? <Spinner size="sm" /> : 'Get users'}</Button>
        <Button onClick={resetUsers} color="danger">{resetting ? <Spinner size="sm" /> : 'Reset users'}</Button>
      </ButtonGroup>
      <div className="users-list">
        {users.map(user => <UsersListItem key={user.id} user={user} />)}
      </div>
    </div>
   );
};

export default UsersListPage;