import React from 'react';

function home() {
  return <div>home protected hu</div>;
}

home.auth = true;
export default home;
