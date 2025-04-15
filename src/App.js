import './App.css';
import CounterWithReducer from './components/CounterWithReducer';
import CounterWithState from './components/CounterWithState';
import ToDoList from './components/ToDoList';

function App() {

  return (
    <div>
      {/* <CounterWithState /> */}
      {/* Below component is with local storage */}
      {/* <CounterWithReducer/> */}

      <ToDoList/>
    </div>
  );
}

export default App;
