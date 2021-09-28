import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.scss';
import Board from './containers/Board';
import Header from './components/Header';

function useQuery() {
  return new URLSearchParams(useLocation()?.search);
}

function App() {
  let query = useQuery();
  return (
    <div className={styles.App}>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <Switch>
          <Route
            exact
            path={'/'}
            render={() => {
              return <Redirect to="/board" />;
            }}
          />
          <Route
            exact
            path={'/board'}
            render={(props) => (
              <Board
                {...props}
                playerName={query.get('name')}
                team={query.get('team')}
              />
            )}
          />
        </Switch>
      </DndProvider>
    </div>
  );
}

export default App;
