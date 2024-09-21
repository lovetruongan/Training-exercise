import ReactDOM from "react-dom/client";
import AppRouter from "./router/AppRouter";
export default function App() {
  return <AppRouter />;
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);