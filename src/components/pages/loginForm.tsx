import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { db } from "../../services/firebase";
import "../compStyle.css";
import { UserDetails } from "../../types";

export default function LoginForm(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [users, setUsers] = useState<UserDetails[]>([]);

  //The data we want to use to login is stored locally

  // UseEffect hook below allows us to connect to the db mocked in firebase
  useEffect(() => {
    const user = db
      .collection("users")
      .get()
      .then((snapshot) => {
        const returnedUsers: UserDetails[] = [];

        snapshot.forEach((snap) => {
          //@ts-ignore

          returnedUsers.push(snap.data());
        });
        setUsers(returnedUsers);
      });
  }, []);

  //The useHistory hook gives you access to the history instance that you may use
  //to navigate. This will be stored as an array []

  const history = useHistory();

  // By using this Hook, we tell React that that component needs to do something after render.
  // In this case it removes the whitespace surrounding the email string.

  useEffect(() => {
    if (email.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email]);

  //Get info is a function that will iterate over the users in the array
  //one-by-one, if the user email and password match, this will be stored
  //in the correctUser object, which will trigger the first if and redirect
  //the user to the family tree page.

  const getInfo = () => {
    let correctUser = {};
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email && password === users[i].password) {
        correctUser = users[i];
        break;
      }
    }

    if (Object.keys(correctUser).length) {
      props.correctLogin();
      setHelperText("Login Successful");
      props.setUserDetails(correctUser);
      history.push("/myFamilyTree");
    } else {
      setHelperText("Incorrect username or password");
      setAlertMessage("your credentials are incorrect, please try again");
    }
  };

  return (
    <div>
      <h2> Log in page</h2>
      {/* alert message is populated based upon the results of the if else statement */}
      <h2 className="alert"> {alertMessage} </h2>
      <Form className="login-form">
        <h2 className="text-center">Log in here</h2>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            label="email"
            helperText={helperText}
            type="email"
            placeholder="Email"
            value={email}
            // onChange allows the event to populate the setEmail use state with the value
            //the user has inputted
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            label="password"
            helperText={helperText}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>
        <Button onClick={() => getInfo()} className="btn-lg btn-dark btn-block">
          Log in
        </Button>
      </Form>
    </div>
  );
}
