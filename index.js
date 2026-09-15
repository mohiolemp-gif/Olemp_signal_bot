require('dotenv').config();
const express = require('express');
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
app.use(express.json());

// دکمه‌های اصلی ربات المپه
const mainKeyboard = Markup.keyboard([
    ['🛒 خرید اشتراک ماهانه'],
    ['📊 دریافت سیگنال امروز'],
    ['📰 داده‌های خبری هفته جدید'],
    ['⚡️ استراتژی فست اسکلپ'],
    ['🐆 استراتژی لئوپارد مارکت']
]).resize();

// هندلر استارت
bot.start((ctx) => {
    ctx.reply(`به ربات المپه خوش آمدید 🏛`, mainKeyboard);
});

// هندلر دکمه‌ها (متن‌ها فعلاً پیش‌فرض هستن)
bot.hears('🛒 خرید اشتراک ماهانه', (ctx) => ctx.reply('لینک خرید اشتراک: (اینجا لینک رو بذار)'));
bot.hears('📊 دریافت سیگنال امروز', (ctx) => ctx.reply('📊 *سیگنال امروز:*\n\n(متن از پنل ادمین اینجا قرار می‌گیره)', { parse_mode: 'Markdown' }));
bot.hears('📰 داده‌های خبری هفته جدید', (ctx) => ctx.reply('📰 *داده‌های خبری:*\n\n(متن از پنل ادمین اینجا قرار می‌گیره)'));
bot.hears('⚡️ استراتژی فست اسکلپ', (ctx) => ctx.reply('⚡️ *استراتژی Fast Scalp:*\n\n(جزئیات استراتژی از پنل ادمین اینجا قرار می‌گیره)'));
bot.hears('🐆 استراتژی لئوپارد مارکت', (ctx) => ctx.reply('🐆 *استراتژی Leopard Market:*\n\n(جزئیات استراتژی از پنل ادمین اینجا قرار می‌گیره)'));

// وب‌سرور برای رندر
app.get('/', (req, res) => res.send('Olymp Bot is running!'));

// مسیر وبهوک (ساده شده)
app.use(bot.webhookCallback('/webhook'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // این خط بعد از بالا اومدن، خودش وبهوک رو ست می‌کنه
    const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
    if (RENDER_URL) {
        bot.telegram.setWebhook(`${RENDER_URL}/webhook`);
        console.log('Webhook set!');
    }
});
