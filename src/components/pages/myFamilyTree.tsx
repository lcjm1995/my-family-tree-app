import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase";

import "../compStyle.css";

import { useLocation } from "react-router-dom";
import { UserDetails, AncestorTest } from "../../types";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function useFamilyTree() {
  const [familyTree, setFamilyTree] = useState<AncestorTest[]>([]);

  useEffect(() => {
    //need unsubscribe call back
    db.collection("ancestors").onSnapshot((snapshot) => {
      const newAncestors: AncestorTest[] = snapshot.docs.map((doc) => {
        const {
          name,
          yearOfBirth,
          deceased,
          job,
          married,
          children,
        } = doc.data();
        return {
          name,
          yearOfBirth,
          deceased,
          job,
          married,
          children,
        };
      });
      setFamilyTree(newAncestors);
    });
  }, []);
  return familyTree;
}

export default function MyFamilyTree(props: { userDetails?: UserDetails }) {
  const location = useLocation();

  const [name, setName] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState(0);
  const [children, setChildren] = useState(0);
  const [job, setJob] = useState("");
  const [married, setMarried] = useState(false);
  const [deceased, setDeceased] = useState(false);

  const setMarriedState = () => {
    if (married === false) {
      return { married: true };
    } else {
      if (married === true) {
        return { married: false };
      }
    }
  };

  const setDeceasedState = () => {
    if (deceased === false) {
      return { deceased: true };
    } else {
      if (deceased === true) {
        return { deceased: false };
      }
    }
  };

  function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    db.collection("ancestors")
      .add({
        name,
        yearOfBirth,
        children,
        job,
        married,
        deceased,
      })

      .then(() => {
        setName("");
        setYearOfBirth(0);
        setChildren(0);
        setJob("");
        setMarried(false);
        setDeceased(false);
      });
  }

  return (
    <div>
      <h2> My Family Tree page</h2>
      <div className="content-body">
        {/* Below takes advantage of the location variable, which allows the 
        cross over of information abut the user to exist within the Family tree page. 
          This data can also be displayed with calls similar to that below */}
        <h2>Welcome {props.userDetails ? props.userDetails.name : ""} </h2>

        <Form onSubmit={onSubmit} className="add-ancestor-form">
          <h2 className="text-center">Add a new ancestor:</h2>
          <FormGroup>
            <Label htmlFor="ancestor-name">Name</Label>
            <Input
              id="ancestor-name"
              label="ancestor-name"
              type="text"
              placeholder="ancestor-name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="year-of-birth">Year Of Birth</Label>
            <Input
              id="year-of-birth"
              label="year-of-birth"
              type="number"
              placeholder="year-of-birth"
              value={yearOfBirth}
              onChange={(e) => setYearOfBirth(e.currentTarget.valueAsNumber)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="children">Amount of children (0 if none)</Label>
            <Input
              id="children"
              label="children"
              type="number"
              placeholder="children"
              value={children}
              onChange={(e) => setChildren(e.currentTarget.valueAsNumber)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job">Job Title</Label>
            <Input
              id="job"
              label="job"
              type="text"
              placeholder="job"
              value={job}
              onChange={(e) => setJob(e.currentTarget.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="married">Married? </Label>
            <Input
              id="married"
              label="married"
              type="checkbox"
              placeholder="married"
              //@ts-ignore
              value={married}
              //@ts-ignore
              onChange={(e) => setMarriedState(true)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="deceased">Deceased? </Label>
            <Input
              id="deceased"
              label="deceased"
              type="checkbox"
              placeholder="deceased"
              //@ts-ignore
              value={deceased}
              //@ts-ignore
              onChange={(e) => setDeceasedState(true)}
            />
          </FormGroup>
          <Button className="btn-lg btn-dark btn-block">Add Ancestor</Button>
        </Form>
      </div>
    </div>
  );
}
