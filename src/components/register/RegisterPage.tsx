import React, { useCallback, useState } from 'react';
import { Input, Button, Container, Row, Col, Form, FormGroup, Label, Spinner } from 'reactstrap';

import './register.css';

import { makeRequest } from '../../helpers/make-request';
import { ERRORS } from '../../helpers/ERRORS';

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  const [nickname, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const registerUser = useCallback(async (event) => {
    event.preventDefault();

    if (!nickname) {
      return alert('You should provide username')
    }

    setLoading(true)
    const response = await makeRequest({ path: '/join', body: { nickname }, method: 'POST' })

    if (response.data.code === ERRORS.ALREADY_REGISTERED) {
      setLoading(false)
      return alert('You are already registered')
    }
    
    if (response.data.code === ERRORS.VK_API_ERROR) {
      setLoading(false)
      return alert(`VK Error: vk user doesn't found`)
    }

    setUsername('');
    
    setLoading(false)

    return alert('Thanks for registration! Wait the results!')
  }, [nickname])

  return (
    <div className="register-page">
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Form inline onSubmit={registerUser}>
              <img src="/example.png" width={375} />
              <FormGroup className="mr-sm-2">
                <Label for="nickname" className="mr-sm-2">VK Page Id</Label>
                <Input type="text" name="nickname" placeholder="VK Page Id" value={nickname} onChange={(event) => setUsername(event.target.value)}/>
              </FormGroup>
              <FormGroup className="mr-sm-2">
                <Button type="submit" color="primary" onClick={registerUser}>{loading ? <Spinner size="sm"/> : 'Register'}</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;