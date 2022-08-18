import { Provider } from "react-redux"
import Main from "./routes/Main"

import store from "./redux/store"

export default function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  )
}