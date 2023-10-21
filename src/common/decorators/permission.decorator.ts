import { SetMetadata, applyDecorators } from '@nestjs/common';

export const Permissions = (...args: string[]) => {
    return applyDecorators(
        SetMetadata('permission', args)
    )
}
