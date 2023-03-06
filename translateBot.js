const Discord = require("discord.js");
const { Client, Intents, Collection, GatewayIntentBits} = require('discord.js');
const {Translate} = require('@google-cloud/translate').v2;
const { SlashCommandBuilder } = require('@discordjs/builders');

const translate = new Translate({key:'AIzaSyCat-2FGUfX_2c795jJY9MUwuyRd4OadGs'});
//translate-bot-375323-274e3f244c7d.json
const client = new Discord.Client({
    intents: [
		1,2,3,4,5
	]
  });



let prefix = "!";
let user_languages = new Map();
let flashcard_words = new Map(); // to store the word and its translation for the current flashcard
client.login('MTA2OTM2NDQxMTcyNDIwNjE5MA.G0up-C.jkKLY3PO-jx_UeNrw-vdXiLqAV1spmflakcjqQ');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

  
console.log("in");
language= 'en';
let count=0

client.on('message', async (msg) => {
    if (msg.content === ("prefix")) {
        msg.channel.send(prefix);
      }
  
  if (msg.content.toLowerCase() === (prefix + "ping")) {
    msg.channel.send('Pong!');
    console.log(1000000);
  }
    if (msg.content.toLowerCase().startsWith(`${prefix}setprefix`)) {
        let args = msg.content.split(' ');
        let newPrefix = args[1];
      try{
        if(newPrefix.length === 1){
                prefix = newPrefix;
        msg.channel.send(`Prefix changed to ${prefix}`);
        }
        else {
            msg.channel.send('Prefix length needs to be 1 character')
        }
    }
    catch (err){
        msg.channel.send('Make sure to do \n (Prefix)setprefix (New Prefix)')
    }
    }
    if (msg.content.toLowerCase() === `${prefix}langcodes`) {
        let languages = [
            { name: "English", code: "en" },
            { name: "Spanish", code: "es" },
            { name: "Mandarin", code: "zh" },
            { name: "Arabic", code: "ar" },
            { name: "Russian", code: "ru" },
            { name: "Bengali", code: "bn" },
            { name: "Portuguese", code: "pt" },
            { name: "French", code: "fr" },
            { name: "German", code: "de" },
            { name: "Japanese", code: "ja" },
            { name: "Italian", code: "it" },
            { name: "Korean", code: "ko" },
            { name: "Hindi", code: "hi" },
            { name: "Swahili", code: "sw" },
            { name: "Javanese", code: "jv" },
            { name: "Telugu", code: "te" },
            { name: "Vietnamese", code: "vi" },
            { name: "Persian", code: "fa" },
            { name: "Turkish", code: "tr" },
            { name: "Marathi", code: "mr" },
            { name: "Tamil", code: "ta" },
            { name: "Urdu", code: "ur" },
            { name: "Gujarati", code: "gu" },
            { name: "Thai", code: "th" }
        ];
    
        let output = "The 25 most common languages and their corresponding language codes are:\n";
        for (let i = 0; i < 24; i++) {
            console.log(languages[i].name);
            output += languages[i].name +' - ' +languages[i].code+ '\n';
        }
    
        msg.channel.send(output);
    }
    if ((msg.content.toLowerCase() === `${prefix}help`)|| msg.mentions.users.has(client.user.id)) {
        let helpMessage = "List of commands: \n" +
            "$ping - Pings the bot \n" +
            "$setprefix [new prefix] - Changes the command prefix \n" +
            "$setlanguage [language code] - Sets the language for flashcards (default is Spanish) \n" +
            "$flashcard - Generates a flashcard with a word to translate \n" +
            "$check [word] - Checks if the word is the correct translation for the current flashcard \n" +
            "$translate [language code] [text] - Translates the text to the specified language\n"+
            "$langcodes - Returns many languages and their language codes";
        msg.reply(helpMessage);
    } 
    if (msg.content.toLowerCase().startsWith( `${prefix}setlanguage`)) {
        let args = msg.content.split(' ');
        let user_id = msg.author.id;
        let language = args[1];
        user_languages.set(user_id, language);
        msg.channel.send(`Language set to ${language}`);
    }
     if (msg.content.toLowerCase() === `${prefix}flashcard`) {
        let user_id = msg.author.id;
        let targetLanguage = "es";
        if(user_languages.has(user_id)){
            targetLanguage = user_languages.get(user_id);
        }
        else{user_languages.set(user_id, 'es');
        }
        let word = words[Math.floor(Math.random() * words.length)]; // choose a random word from the words array
        console.log(word);
        try {
            const res = await translate.translate(word,  targetLanguage);
            flashcard_words.set(user_id, {word: word, translation: res});
            var count=0;
            for(var i=0;i<res.toString().length;i++){
                if(res.toString().charAt(i)==='[') count=i;
                
            }
            var modStr= res.toString().slice(0,count-1);
            console.log(modStr);
            msg.reply(`Translate this word: `+ modStr);
        } catch (err) {
            console.error(err);
            msg.reply('There was an error displaying the flashcard.');
        }
    }
     if (msg.content.toLowerCase().startsWith(`${prefix}check`)) {
        let user_id = msg.author.id;
        let user_guess = msg.content.split(' ').slice(1).join(' ');
        if(flashcard_words.has(user_id)){
            let flashcard = flashcard_words.get(user_id);
            if(flashcard.word === user_guess){
                msg.reply(`Correct! The word was "${flashcard.word}"`);
            } else {
                for(var i=0;i<flashcard.translation.toString().length;i++){
                    if(flashcard.translation.toString().charAt(i)==='[') count=i;
                    
                }
                var modStr= flashcard.translation.toString().slice(0,count-1);
                msg.reply(`Incorrect. The word was "${flashcard.word}", not "${user_guess}". The original word was "${modStr}".`);
            }
            flashcard_words.delete(user_id); // remove the flashcard from the map once it's been checked
        } else {
            msg.reply("There is no flashcard to check. Use the !flashcard command to generate a new flashcard.");
        }
    }
    if (msg.content.toLowerCase().startsWith(`${prefix}translate`)) {
        let args = msg.content.split(' ');
        let text = args.slice(2).join(' ');
        let targetLanguage = args[1];
        if(!targetLanguage) {
            msg.reply("Please specify a target language using its ISO code, such as 'en' for English or 'fr' for French.");
        } else {
            try {
                const [translation] = await translate.translate(text, targetLanguage);
                 msg.channel.send(`Translation: ${translation}`);
              /*  const res = await translate.translate(text, {to: targetLanguage});
                if (!res.text) {
                    console.error('Error: translate response is empty');
                    return;
                }
                msg.channel.send(res.text);
                */
            } catch (err) {
                console.error(err);
                msg.reply('There was an error performing the translation.');
            }
        }
    }
});

client.login('MTA2OTM2NDQxMTcyNDIwNjE5MA.G0up-C.jkKLY3PO-jx_UeNrw-vdXiLqAV1spmflakcjqQ');
const words=  [
    "dog",
    "cat",
    "tree",
    "sun",
    "moon",
    "book",
    "computer",
    "desk",
    "chair",
    "pen",
    "car",
    "road",
    "house",
    "sky",
    "mountain",
    "river",
    "ocean",
    "flower",
    "grass",
    "bird",
    "butterfly",
    "insect",
    "fish",
    "tiger",
    "lion",
    "bear",
    "snake",
    "monkey",
    "giraffe",
    "elephant",
    "zebra",
    "hippopotamus",
    "crocodile",
    "alligator",
    "rhinoceros",
    "gazelle",
    "antelope",
    "deer",
    "moose",
    "buffalo",
    "bison",
    "goat",
    "sheep",
    "pig",
    "cow",
    "horse",
    "donkey",
    "mule",
    "camel",
    "llama",
    "alpaca",
    "ostrich",
    "emu",
    "kangaroo",
    "wombat",
    "koala",
    "platypus",
    "penguin",
    "seagull",
    "pelican",
    "swan",
    "duck",
    "goose",
    "chicken",
    "rooster",
    "turkey",
    "ostrich",
    "peacock",
    "parrot",
    "canary",
    "finch",
    "sparrow",
    "raven",
    "crow",
    "eagle",
    "falcon",
    "hawk",
    "owl",
    "vulture",
    "beagle",
    "poodle",
    "terrier",
    "labrador",
    "retriever",
    "bulldog",
    "boxer",
    "rottweiler",
    "german shepherd",
    "dachshund",
    "doberman",
    "schnauzer",
    "collie",
    "sheltie",
    "malamute",
    "husky",
    "bernese",
    "great dane"
    ];