import Dashboard from "./components/dashboard/Dashboard";
import Form from "./components/form/Form";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Form />} /> 
        <Route path="/dashboard" element={<Dashboard />} />  
      </Routes>
    </Layout>
  );
}

export default App;
