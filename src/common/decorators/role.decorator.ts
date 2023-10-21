import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RoleAuthGuard } from 'src/auth/guard/Role.guard';

export const Roles = (...role: string[]) => {
    return applyDecorators(
        SetMetadata('roles', role),
        UseGuards(RoleAuthGuard)
    )
}
