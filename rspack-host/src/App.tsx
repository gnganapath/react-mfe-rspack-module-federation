import React from 'react';
import './App.css';


// const RemoteButton = React.lazy(() => import('remote/ButtonComponent'));
const RemoteApp = React.lazy(() => import('remote/MfeOne'));

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild. on 26 mar 2026</p>
       {/*<RemoteButton />*/}
       <RemoteApp />
    </div>
  );
};

export default App;
