# Discord Translate Bot

This is a Discord bot that allows users to translate text using the Google Cloud Translate API. It also features a flashcard game that tests users' knowledge of foreign languages.

## Requirements

- Node.js
- A Google Cloud account with the Cloud Translate API enabled

## Installation

1. Clone this repository: `git clone https://github.com/your-username/discord-translate-bot.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory of the project with the following contents:
DISCORD_TOKEN=your-discord-bot-token
GOOGLE_CLOUD_PROJECT_ID=your-google-cloud-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/credentials.json
4. Replace `your-discord-bot-token` with the token for your Discord bot, `your-google-cloud-project-id` with your Google Cloud project ID, and `path/to/your/credentials.json` with the path to your Google Cloud credentials JSON file.
5. Start the bot: `npm start`

## Usage

The bot uses the `!` prefix for commands. Here are the available commands:

- `!ping`: Pings the bot.
- `!setprefix [new prefix]`: Changes the command prefix.
- `!setlanguage [language code]`: Sets the language for flashcards (default is Spanish).
- `!flashcard`: Generates a flashcard with a word to translate.
- `!check [word]`: Checks if the word is the correct translation for the current flashcard.
- `!translate [language code] [text]`: Translates the text to the specified language.
- `!langcodes`: Returns many languages and their language codes.
- `!help`: Displays a list of available commands.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


