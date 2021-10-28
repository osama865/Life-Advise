import React, { useState } from 'react'
import { Meteor } from "meteor/meteor";

export default function InsertAdvise() {
    const [advise, setAdvise] = useState("")
    const [source, setSource] = useState('')

    const handleInsert = (e)=>{
        e.preventDefault()
        // insert the advise
        Meteor.call('insertAdvise',{
            text : advise.toString(),
            source : source.toString(),
            date: new Date(),
        })

        // clear states
        setAdvise("")
        setSource("")
    }
    return (
        <>
            <form>
                <input value={advise} placeholder="Type an Advise" onChange={(e) => setAdvise(e.target.value) } />
                <input value={source} placeholder="Type it's source" onChange={(e) => setSource(e.target.value) } />
                <button onClick={handleInsert} >Insert it</button>
            </form>
        </>
    )
}
