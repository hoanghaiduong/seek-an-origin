import { SetMetadata, applyDecorators } from '@nestjs/common';

export const Roles = (...args: string[]) => {
    return applyDecorators(
        SetMetadata('roles', args)
    )
}
