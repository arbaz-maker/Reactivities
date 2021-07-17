import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container,Menu } from 'semantic-ui-react';

export default function Navbar(){
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header >
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>

                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item >
                    <Button positive content='Create Activity' as={NavLink} to='/createactivity' />
                </Menu.Item>
            </Container>
      </Menu>
    )
}