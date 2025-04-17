import './App.css';
import CounterWithReducer from './components/CounterWithReducer';
import CounterWithState from './components/CounterWithState';
import ToDoList from './components/ToDoList';
import ColorChanger from './components/ColorChanger';
import FormValidation from './components/FormValidation';

function App() {

  return (
    <div className='container'>
      {/* <CounterWithState /> */}
      {/* Below component is with local storage */}
      {/* <CounterWithReducer/> */}

      {/* <ToDoList/> */}

      {/* <ColorChanger/> */}

      <FormValidation/>
    </div>
  );
}

export default App;
