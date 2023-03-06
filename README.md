Readme for Translate Discord Bot
This is a simple Discord bot that allows users to translate text and practice flashcards.

Features
The bot supports the following commands:

$ping: responds with "Pong!" to confirm that the bot is online
$setprefix [new prefix]: changes the command prefix (must be a single character)
$setlanguage [language code]: sets the target language for flashcards (default is Spanish)
$flashcard: generates a flashcard with a word to translate
$check [word]: checks if the word is the correct translation for the current flashcard
$translate [language code] [text]: translates the text to the specified language
$langcodes: returns a list of languages and their language codes supported by the bot
$help: provides a list of available commands
The bot uses the Google Cloud Translate API to translate text, and the Discord.js library to communicate with Discord.

Installation and Setup
Before running the bot, ensure that you have:

A Discord bot account and token. You can follow these instructions to create a bot account and obtain its token.
A Google Cloud project with the Translate API enabled. You can follow these instructions to set up a project and enable the API.
To run the bot:

Clone this repository and navigate to its directory.
Install the necessary dependencies by running npm install.
Set your bot token as an environment variable by running export DISCORD_TOKEN=your_token_here in your terminal. Alternatively, you can replace the client.login('key_here') line in index.js with client.login('your_token_here').
Set your Google Cloud API key as an environment variable by running export GOOGLE_APPLICATION_CREDENTIALS=path/to/your/credentials.json in your terminal. Alternatively, you can replace the const translate = new Translate({key:'KEY_HERE'}) line in index.js with const translate = new Translate({key:'your_api_key_here'}).
Run the bot with node index.js.
Usage
Once the bot is running and added to your Discord server, you can interact with it using the commands listed above. For example, to generate a flashcard, you can type $flashcard in any channel where the bot is present. The bot will respond with a word in the target language, and you can check your translation by typing $check [word].

Contributing
If you find a bug or have a feature request, feel free to open an issue on this repository. Pull requests are also welcome.

License
This code is licensed under the MIT License. See the LICENSE file for details.
