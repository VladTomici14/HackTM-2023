
// const fetch = import('node-fetch')
// const functions = import('@google-cloud.functions-framework')

import fetch from 'node-fetch'
import functions from "@google-cloud/functions-framework"
import {request} from "express";

const API_KEY = 'AIzaSyBoSWjw6O8o4IEaztRs190WZuycztljrn4'

make a request for the sentiment analysis API


async function analyzeSentiment(text) {
    const res = await fetch (`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            document: {
                type: 'PLAIN_TEXT',
                content: text
            }
        })
    })
    const json = await res.json()
    return json
}

analyzeSentiment("the boy is happy")