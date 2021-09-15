import React from 'react';

import { Card, CardTitle, CardSubtitle, CardBody, CardText, CardLink } from 'reactstrap'


export interface User {
  nickname: string;
  photoUrl?: string;
  fullName?: string;
  id: string;
}

interface Props {
  user: User
}

const UsersListItem: React.FC<Props> = ({ user }) => {
  return (
    
    
    <div className="users-list-item">
      <Card>
        <CardBody>
          <CardTitle>{user.fullName}</CardTitle>
          <CardLink href={`https://vk.com/${user.nickname}`}>{user.nickname}</CardLink>
        </CardBody>
        <img width="100%" src={user.photoUrl} alt={user.fullName} />

      </Card>
    </div>
  );
};

export default UsersListItem;