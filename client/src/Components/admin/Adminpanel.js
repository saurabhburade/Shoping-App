import React, { Component } from 'react'
import { isAuthorised } from './auth'
import { Redirect } from 'react-router';

class Adminpanel extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        if (!isAuthorised()) {
            
               return <Redirect to="admin/login" />;
             
        }
        return (
            <div>
                <h1>Admin</h1>
            </div>
        )
    }
}

export default Adminpanel
