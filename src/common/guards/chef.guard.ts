import { CanActivate, ExecutionContext } from '@nestjs/common';

export class ChefGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const currentUser = request.user;

    if (!currentUser || currentUser.type == 'Customer') return false;
    else return true;
  }
}
