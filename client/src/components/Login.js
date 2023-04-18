// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { Label } from "reactstrap";
// import { login } from "../../modules/authManager";




// export const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     return login(email, password)
//     .then(() => {

//         navigate("/");
//     })
//   };

//   return (
//     <main className="container--login">
//       <section>
//         <form className="form--login" onSubmit={handleLogin}>
//           <h1>StreamISH</h1>
//           <h3>Please sign in</h3>
//           <div className="login-form">
//             <fieldset className="loginFieldSet">
//             <Label className="email" htmlFor="inputEmail">
//               {" "}
//               Email address{" "}
//             </Label>
//             <input
//               type="email"
//               value={email}
//               onChange={(evt) => setEmail(evt.target.value)}
//               className="form-control-login"
//               placeholder="Email address"
//               required
//               autoFocus
//             />
//             <Label className="password" htmlFor="inputPassword">
//               {" "}
//               Password{" "}
//             </Label>
//             <input
//               type="password"
//               value={password}
//               onChange={(evt) => setPassword(evt.target.value)}
//               className="form-control-login"
//               placeholder="password"
//               required
//               autoFocus
//             />
//             </fieldset>
//             <button className="submit" type="submit">
//               Sign in
//             </button>

//             <div className="btn-box">
//                 <Link to="/register">Not a member yet?</Link>
//             </div>
//           </div>
//         </form>
//       </section>
//     </main>
//   );
// };

import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Login Failed"));
  };

  return (
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}
