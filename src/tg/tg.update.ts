import {
  Action,
  Command,
  Start,
  Update,
  Ctx,
  InjectBot,
  On,
  Hears,
} from 'nestjs-telegraf';
import { BookService } from 'src/book/book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Context, Markup } from 'telegraf';

@Update()
export class Tgupdate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly book: BookService,
  ) {}

  @Command('find')
  async find(ctx: Context) {
    ctx.reply(String(this.book.findAll()));
  }

  async isSubscripe(ctx: Context, chanlerId: string) {
    try {
      if (ctx.from) {
        console.log(`User ID: ${ctx.from.id}`);

        const member = await ctx.telegram.getChatMember(chanlerId, ctx.from.id);

        return ['administrator', 'member', 'creator'].includes(member.status);
      }
    } catch (error) {
      console.log('Error checking subscription:', error);
      return false;
    }
  }

  @Start()
  async onStart(ctx: Context) {
    const channelId = '@asilbek_nt7';
    const isSubscribed = await this.isSubscripe(ctx, channelId);

    if (!isSubscribed) {
      await ctx.reply('Iltimos, kanalga obuna bo‘ling.');
      return;
    }

    if (!ctx.from?.first_name || !ctx.from?.id) {
      await ctx.reply('Foydalanuvchi nomi yoki ID mavjud emas.');
      return { message: 'Foydalanuvchi nomi yoki ID mavjud emas.' };
    }

    const existingUser = await this.prisma.tgBotUsers.findFirst({
      where: { name: ctx.from.first_name },
    });

    if (!existingUser) {
      await this.prisma.tgBotUsers.create({
        data: {
          name: ctx.from.first_name,
          userId: String(ctx.from.id),
        },
      });

      await ctx.reply(
        'Botimizdan avtomatik ravishda ro‘yxatdan o‘tdingiz. Endi foydalanishni boshlashingiz mumkin  toli kamandalardan habordor bolish uchun /help',
      );
    } else {
      await ctx.reply(
        'Siz botimizdan allaqachon ro‘yxatdan o‘tganingiz uchun foydalanishingiz mumkin toli kamandalardan habordor bolish uchun /help',
      );
    }
  }

  // @Command("showBooks")
  // async showBooks(ctx: Context){
  //   const bazaBook = await this.prisma.book.findMany()
  //   console.log(baza);

  // }

  @Command('help')
  async helpCommand(ctx: Context) {
    ctx.reply('/showBooks --> show all boks');
  }
}
