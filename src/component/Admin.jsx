import React from "react";
import { Link } from "react-router-dom";
import  {isAdmin} from "../utils/UserService";

const Admin = () => {
  return(
    <section className="container">
        <h2 className="mt-5">Welcome to Admin home page</h2>
        <hr/>
        <nav className="nav flex-column">

          {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
        {isAdmin && <li><Link to={"/create-quiz"} className="nav-link"> Create a New Quiz</Link></li>}
        {isAdmin && <li> <Link to={"/all-quizzes"} className="nav-link">Manage exiting Quizes</Link></li>}
          
         
        </nav>

    </section>
  )


}
export default Admin