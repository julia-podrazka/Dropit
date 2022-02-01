import React, {useState} from 'react';

export default function Dashboard() {

    return (
       <span>hello {localStorage.getItem('username')} with token {localStorage.getItem('token')}</span>
    );
};
