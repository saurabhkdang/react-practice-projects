import './App.css';
import ColorChanger from './components/ColorChanger';
import CounterWithReducer from './components/CounterWithReducer';
import CounterWithState from './components/CounterWithState';
import ToDoList from './components/ToDoList';

function App() {

  return (
    <div>
      {/* <CounterWithState /> */}
      {/* Below component is with local storage */}
      {/* <CounterWithReducer/> */}

      {/* <ToDoList/> */}

      <ColorChanger/>
    </div>
  );
}

export default App;
