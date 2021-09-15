import React, { useCallback, useState } from 'react';
import { Navbar, NavbarBrand, NavItem, Nav, Button, Input, Form, FormGroup, Label } from 'reactstrap'
import { useHistory } from 'react-router';
import { IRoute } from '../Routes';

interface Props {
  routes: Array<IRoute>
  handleSetToken: (token: string) => void
}

const Header: React.FC<Props> = (props) => {
  const { routes, handleSetToken } = props;
  const history = useHistory();
  const [token, setToken] = useState('');
  const [memoizedToken, setMemoizedToken] = useState(localStorage.getItem('admin-token'));

  const onSetToken = useCallback(() => {
    if (!token) { return alert('Admin token is empty') }

    handleSetToken(token)
    setMemoizedToken(token)
    localStorage.setItem('admin-token', token);
    setToken('')
  }, [token])

  const onResetToken = useCallback(() => {
    handleSetToken('');
    setMemoizedToken('')
    localStorage.removeItem('admin-token');
  }, [token])

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>Maxaspirt</NavbarBrand>
        <Nav className="mr-auto" navbar>
          {routes.map(route => <NavItem key={route.path} onClick={() => history.push(route.path)}>{route.name}</NavItem>)}
        </Nav>

        {memoizedToken ? <Button onClick={onResetToken} color="primary">Reset token</Button> :
          <Nav>
          <Form inline>
            <FormGroup className="mr-sm-2">
              <Label for="token" className="mr-sm-2">Admin token</Label>
              <Input type="password" name="nickname" placeholder="Admin token" value={token} onChange={(event) => setToken(event.target.value)}/>
            </FormGroup>
            <FormGroup className="mr-sm-2">
              <Button type="submit" color="primary" onClick={onSetToken}>Apply token</Button>

            </FormGroup>
          </Form>
        </Nav>}
      </Navbar>
    </div>
  );
};

export default Header;