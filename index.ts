import {dialogflow, Image, MediaObject} from 'actions-on-google'
import express from 'express'

const app = dialogflow({ debug: true });
const expressApp = express().use(express.json());

app.intent('BasicBehavior', (conv) => {
    if (!conv.surface.capabilities
        .has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
        conv.ask('Sorry, this device does not support audio playback.');
        conv.ask('Which response would you like to see next?');
        return;
    }

    conv.ask('This is a media response example.');
    conv.ask(new MediaObject({
        name: 'Jazz in Paris',
        url: 'https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3',
        description: 'A funky Jazz tune',
        icon: new Image({
            url: 'https://storage.googleapis.com/automotive-media/album_art.jpg',
            alt: 'Album cover of an ocean view',
        }),
    }));
});

expressApp.post('/fulfillment', app)

expressApp.listen(3000, () => {
    console.log("app start")
})