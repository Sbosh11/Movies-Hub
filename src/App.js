import './App.css';
//import Header from './components/Header';
//import SimpleBottomNavigation from './components/FooterNav';
import AppRouter from './components/Route';



/*export const Component = (props) => {
  return(
    <div>
      {props.children}
    </div>
  )
}*/



function App() {
  return (
     <div className="App">
      
        <AppRouter />
  
    </div>
    
  );
}

export default App;
