import React, { useState } from 'react'
import Advise from './Advise'
// import {MongoClient} from "mongodb"

/*
  |--------------------------------------------------
  | the local db for user
  | add advises and compare them later with new fetched advises
  | will create another collection for user's saved advised for saved page
  | remove a advises/quotes from the list
  | const clientDB = new MongoClient.connect('advises')
  | meteor npm install --save mongodb
  |--------------------------------------------------
*/

export default function Favorites() {
    const [advises, setAdvises] = useState([
        {
            text: "life is short , enjoy it",
            source: "osama.",
            date: new Date(),
          },
          {
            text: "life is short , enjoy it",
            source: "osama.",
            date: new Date(),
          },
          {
            text: "life is short , enjoy it",
            source: "osama.",
            date: new Date(),
          },
    ])
    return (
        <>
            {
                advises?.map((advise , i)=>{
                    return <Advise advise={advise} key={i} />
                })
            }
        </>
    )
}
