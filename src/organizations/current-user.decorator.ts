import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const CurrentUser = createParamDecorator(
  async (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    let user = req.session.user;
    user = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (user) {
      return user.id;
    } else {
      throw new UnauthorizedException();
    }
  },
);
