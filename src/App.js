import { Provider } from "react-redux";
import s from "./assets/sass/globals.module.scss";
import Layout from "./components/Layout";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className={s.container}>
        <Layout />
      </div>
    </Provider>
  );
}

export default App;
