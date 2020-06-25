import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import "../compStyle.css";

export default function SearchBar(props: any) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  <div className="search_bar">
    <Input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleChange}
    />
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>;
}
