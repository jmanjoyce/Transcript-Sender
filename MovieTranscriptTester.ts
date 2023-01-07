#!/usr/bin/env node

import { TwilioCodes } from "./twilioCodes.enum";


async function sendMessages(){
    const twilio = require('twilio');
    const client = new twilio(TwilioCodes.TWILIO_ACCOUNT_SID, TwilioCodes.TWILIO_AUTH_TOKEN);
    const messages: String[] = await getMessages();
    client.messages 
      .create({         
         to: '+15082442757',
         from: '+19035687286',
         body: 'Beggining BroadCast of the BEE movie',
       }) 
      .then(message => console.log(message.sid)) 
      .done();
    const time = 1000;
    const sleep = (slp) => new Promise((r) => setTimeout(r, slp));
    if (messages[0] != 'error'){
        messages.forEach(async element => {
            await sleep(time);
            client.messages.create({
                to: '+17813825727',
                from: '+19035687286',
                body: element,
            }).then(message => console.log(message.sid));
        });
    }
    return;
};



async function readTextFile(filePath):Promise<String[]> {
    const fs = require('fs');
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            const paragraphs = data.split('\n\n');
            resolve(paragraphs);
        }
        });
    });
}

async function getMessages(): Promise<String[]>{
    console.log('reading Messages');
    try {
        const paragraphs = await readTextFile('beeTranscript.txt');
        console.log(paragraphs[0]);
        return paragraphs;
      } catch (err) {
        console.error('err');
        return ['error'];
      }
};

let x = sendMessages();
