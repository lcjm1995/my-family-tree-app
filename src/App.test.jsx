import React from "react";

import LoginForm from "./App";
import Toolbar from "./App";
import { render, screen, fireEvent } from "@testing-library/react";
// import { createMemoryHistory } from "history";

describe("login form tests", () => {
  beforeEach(() => {
    render(<LoginForm />);
    const loginFormRender = screen.getByText("Login");
    fireEvent.click(loginFormRender);
  });

  it("Login form should exist with both an email and password input", () => {
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("Login form should have one button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("unsuccessful login returns message", () => {
    const emailInput = screen.getByPlaceholderText("Email");
    const passInput = screen.getByPlaceholderText("Password");
    fireEvent.change(emailInput, { target: { value: "janedoe@fake.com" } });
    fireEvent.change(passInput, { target: { value: "incorrect" } });
    const loginButton = screen.getByRole("button");
    fireEvent.click(loginButton);
    expect(
      screen.getByText("your credentials are incorrect, please try again")
    ).toBeInTheDocument();
  });
  it("successful login redirects to My Family Tree page", () => {
    const emailInput = screen.getByPlaceholderText("Email");
    const passInput = screen.getByPlaceholderText("Password");
    fireEvent.change(emailInput, { target: { value: "janedoe@fake.com" } });
    fireEvent.change(passInput, { target: { value: "pass123" } });
    const loginButton = screen.getByRole("button");
    fireEvent.click(loginButton);
    expect(screen.getByText("My Family Tree page")).toBeInTheDocument();
  });
});

describe("nav bar tests prior to login", () => {
  beforeEach(() => {
    render(<Toolbar />);
  });
  it("the navBar is visible", () => {
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });
  it("the login link is visible", () => {
    expect(screen.getByTestId("login-link")).toBeInTheDocument();
  });
});

describe("nav bar tests post successful login", () => {
  beforeEach(() => {
    render(<LoginForm />);
    const loginFormRender = screen.getByText("Login");
    fireEvent.click(loginFormRender);
    const emailInput = screen.getByPlaceholderText("Email");
    const passInput = screen.getByPlaceholderText("Password");
    fireEvent.change(emailInput, { target: { value: "janedoe@fake.com" } });
    fireEvent.change(passInput, { target: { value: "pass123" } });
    const loginButton = screen.getByRole("button");
    fireEvent.click(loginButton);
  });
  it("The user's name is included in the navbar", () => {
    expect(screen.queryByTestId("displayUsername")).toBeInTheDocument();
  });
  it("When user clicks all ancestors option, they are navigated correctly", () => {
    const allAncestorsLink = screen.getByTestId("allAncestors-link");
    fireEvent.click(allAncestorsLink);
    expect(screen.getByText("All Ancestors page")).toBeInTheDocument();
  });
  it("When user clicks my family tree option, they are navigated correctly", () => {
    const myFamilyTreeLink = screen.getByTestId("myFamilyTree-link");
    fireEvent.click(myFamilyTreeLink);
    expect(screen.getByText("My Family Tree page")).toBeInTheDocument();
  });
  it("When user clicks about option, they are navigated correctly", () => {
    const aboutLink = screen.getByTestId("about-link");
    fireEvent.click(aboutLink);
    expect(screen.getByText("About us page")).toBeInTheDocument();
  });
  it("When user clicks logout option, they are navigated correctly", () => {
    const logoutLink = screen.getByTestId("logout-link");
    fireEvent.click(logoutLink);
    expect(screen.getByText("YOU ARE LOGGED OUT")).toBeInTheDocument();
  });
});
