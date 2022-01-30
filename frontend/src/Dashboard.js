import React, {useState} from 'react';

export default function Dashboard() {

    return (
       <h1>hello {localStorage.getItem('username')}
           with token {localStorage.getItem('token')}</h1>
    );
};
