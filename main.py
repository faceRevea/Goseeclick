from aiogram import Bot, Dispatcher,types
from aiogram.filters import Command
bot=Bot(token="7609280949:AAEaqGLuO78zCepHkD6nm3rAffKH84Khi_c")
dp =Dispatcher()
@dp.message(Command(commands=["start"]))
async def start(message: types.Message ):
    await message.answer("Добро пожаловать в «Гусиный Кликер»! 🐔 Готовься к самому захватывающему..."
                      " гусеводству в твоей жизни. Кликай, как будто гусь за тобой гонится — хотя, может, так оно и есть!"
                      "Погнали щёлкать, пока перья не полетят! 😄")
dp.run_polling(bot)