#!/usr/bin/env node

const textbelt = require('textbelt');

async function sendMessages(){
    const codes = {
        TWILIO_ACCOUNT_SID: 'AC8ea9834cc85a66c9cd85a93de85f20d4',
        TWILIO_AUTH_TOKEN: '2ed6b9aca5339635188964dab7d2f93b',

    }
    const twilio = require('twilio');
    const client = new twilio(codes.TWILIO_ACCOUNT_SID, codes.TWILIO_AUTH_TOKEN);
    const messages = getMessages();
    // client.messages 
    //   .create({         
    //      to: '+15082442757',
    //      from: '+19035687286',
    //      body: 'Hello',
    //    }) 
    //   .then(message => console.log(message.sid)) 
    //   .done();
    //const text = require('textbelt');

    // US
    var text = require('textbelt');

    text('5082442757', 'A sample text message!', undefined, function(err) {
        if (err) {
            console.log(err);
        }
    });
    // messages.array.forEach(element => {
    //     wait(1000);

    //     // client.messages.create({
    //     //     to: '+17813825727',
    //     //     from: '+19035687286',
    //     //     body: element,
    //     //   }).then(message => console.log(message.sid));
    // });
    return;
};



async function readTextFile(filePath) {
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

async function getMessages(){
    console.log('reading Messages');
    try {
        const paragraphs = await readTextFile('beeTranscript.txt');
        console.log(paragraphs[0]);
        return paragraphs;
      } catch (err) {
        console.error('err');
      }
};


let x = sendMessages();
