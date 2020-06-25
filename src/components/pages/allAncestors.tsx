import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

import "../compStyle.css";
import { AncestorTest, AncestorDetails } from "../../types";
import { db } from "../../services/firebase";

export default function AllAncestorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ancestor, setAncestor] = useState<AncestorTest[]>([]);
  const [searchResults, setSearchResults] = useState<AncestorTest[]>([]);

  useEffect(() => {
    db.collection("ancestors")
      .get()
      .then((snapshot) => {
        const returnedAncestors: AncestorTest[] = [];
        snapshot.forEach((snap) => {
          //@ts-ignore
          returnedAncestors.push(snap.data());
        });
        setAncestor(returnedAncestors);
        setSearchResults(returnedAncestors);
      })
      .catch(() => {
        setAncestor([]);
      });
  }, []);

  useEffect(() => {
    const results = ancestor.filter((ancestor) =>
      ancestor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchTerm) {
      setSearchResults(results);
    } else {
      setSearchResults(ancestor);
    }
  }, [searchTerm]);

  function sortAscending() {
    ancestor.sort(function (a, b) {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    console.log(ancestor);
  }

  function sortDescending() {
    ancestor.sort(function (a, b) {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA > nameB) {
        console.log("FIRST ", nameA, nameB);
        return 1;
      }
      if (nameA < nameB) {
        console.log("SECOND", nameA, nameB);
        return -1;
      }
      return 0;
    });

    console.log(ancestor);
    // console.log(
    //   ancestor.sort(function (a, b) {
    //     const nameA = a.name.toLowerCase();
    //     const nameB = b.name.toLowerCase();
    //     if (nameA > nameB) {
    //       return 1;
    //     }
    //     if (nameA < nameB) {
    //       return -1;
    //     }
    //     return 0;
    //   })
    // );
  }

  return (
    <div>
      <h2> All Ancestors page</h2>
      <div className="content-body">
        <div className="search-body">
          <Form className="searchbar-form">
            <FormGroup>
              {/* Sorting the list of names */}
              <div>
                <label>Sort by:</label>
                <select onClick={sortAscending}>
                  <option>Name (A-Z)</option>
                  <option>Name (Z-A)</option>
                </select>
              </div>

              <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <div className="search-results">
                {searchResults.map((item) => (
                  <div>
                    <h2>{item.name}</h2>
                    <p> Year Of Birth:{item.yearOfBirth} </p>
                    <p>Job: {item.job}</p>
                    <p>Children:{item.children ? item.children : "no"}</p>
                    <p>Married: {item.married ? "yes" : "no"}</p>
                    <p>Deceased: {item.deceased ? "yes" : "no"}</p>
                  </div>
                ))}
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}
