import * as React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { AppBar, Toolbar, Typography, Button, CssBaseline } from '@mui/material';
import { GlobalStyles } from '@mui/styled-engine';
import axios from 'axios';

interface Props {
  authenticated: boolean;
  setAuthenticated: ()=>void;
}

export class NavMenu extends React.Component<Props> {

  constructor (props: Props) {
    super(props);
    this.Logout = this.Logout.bind(this);
  }

  async Logout() {
    await axios.post('/api/auth/logout')
      .then((results) => {
        console.log(results);
        document.cookie = "id=;";
        this.props.setAuthenticated();
      })
  }

  render() {
    return (
      <div>
        <GlobalStyles styles={{ ul: 0, padding: 0, listStyle: 'none' }} />
        <CssBaseline />
        <AppBar 
          position="static"
          color="default"
          elevation={0}
          // sx={{ borderButton: (them) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              end-year-tax-adjustment
            </Typography>
            {/* メニューを入れる */}
            <nav>
              <Button
                variant="text"
                color="primary"
                component={Link}
                to="/"
              >
                Home
              </Button>
             
              {this.props.authenticated ?
               <Button
                  variant="text"
                  color="primary"
                  component={Link}
                  to="/infoinput"
                >
                  Register
                </Button> :
                <Button
                  variant="text"
                  color="primary"
                  component={Link}
                  to="/"
                >
                  Register
                </Button>
              }
              {/* <Button
                variant="text"
                color="primary"
                component={Link}
                to="/fetch-data"
              >
                Fetch-data
              </Button> */}
            </nav>
            {this.props.authenticated ?
              <Button color="inherit" component={Link} to='/' onClick={this.Logout}>Logout</Button> :
              <Button color="inherit" component={Link} to='/authentication'>Login</Button>
              
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

