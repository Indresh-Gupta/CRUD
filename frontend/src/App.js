import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Userdata from "./Component/Alldata/Userdata.js";
import Adddata from "./Component/Adddata/Add.js";
import Updatedata from "./Component/Updata/edit.js";
import './App.css';

function App() {
  const route= createBrowserRouter([
    {
      path:"/",
      element:<Userdata/>,
    },
    {
    path:"/Add",
    element:<Adddata/>,
    },
    {
      path:"/edit/:id",
      element:<Updatedata/>,
    }
  ])
  return (
    <div className="App">
     <RouterProvider router={route}></RouterProvider> 
    </div>
  );
}

export default App;
