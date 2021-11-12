import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';


interface Props {
  authenticated: boolean;
  setAuthenticated: ()=>void;
}

export class Layout extends Component<Props> {

  constructor(props: Props){
    super(props)
  }

  render () {
    return (
      <div>
        <NavMenu 
          authenticated = { this.props.authenticated }
          setAuthenticated = { () => this.props.setAuthenticated() }
        />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
