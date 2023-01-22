import React from 'react'
import { useParams } from "react-router-dom";

function ViewJudge() {
    const routeParams = useParams();
    console.log(routeParams.first)
    console.log(routeParams.last)

  return (
    <div>
        <p> {routeParams.first} </p>
        <p> {routeParams.last} </p>

    </div>
  )
}

export default ViewJudge