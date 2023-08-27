const TelegramBot = require("node-telegram-bot-api");

const token = "6259166096:AAEFqGGloZM_6krr2A9R3lIWMOOCjRTCCQk";

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  {
    command: "/start",
    description: "About bot",
  },
]);

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      "Hello dear user. You can find out the weather of your city with this bot. Send Botga the name of your city or state"
    );
  } else if (text !== "/start") {
    const key = "7d950867255f8a296b7b159c717d20fc";
    const base = "http://api.openweathermap.org/data/2.5/weather";
    const url = `?q=${text}&units=metric&appid=${key}`;

    const req = await fetch(base + url);
    const res = await req.json();

    console.log(res);

    if (res.cod == 200) {
      await bot.sendMessage(
        chatId,
        `In ${res.name}, the temperature is ${res.main.temp} degrees and the weather is ${res.weather[0].main}. but the weather feels like ${res.main.feels_like} degrees`
      );
    } else {
      await bot.sendMessage(chatId, `${res.message}`);
    }
  }
});
