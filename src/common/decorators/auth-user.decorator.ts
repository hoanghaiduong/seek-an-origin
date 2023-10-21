import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

export interface AuthenticationRequest extends Request {
    user: User;
}
export const AuthUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<AuthenticationRequest>();
        return data ? request.user?.[data] : request.user;
    },
);
