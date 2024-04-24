import React from "react";
import "./card.css";
import data from "../components/dashdata";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <>
      <Link to={props.link}>
        <div className="card shadow">
          <img src={props.img} alt="dash-item" />
          <p>{props.title}</p>
        </div>
      </Link>
    </>
  );
}
