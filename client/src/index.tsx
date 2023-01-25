import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "store";
import { ThemeProvider } from "theme";
import { App } from "./app";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);
