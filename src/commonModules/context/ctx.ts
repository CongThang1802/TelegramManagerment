import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Context } from './context';

export const Ctx = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const context = new Context(request);
        await context.parseToken();
        return context;
    }
);
