import { CanActivate, ExecutionContext } from '@nestjs/common';

export class CustomerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const currentUser = request.user;

    if (!currentUser || currentUser.type == 'Chef') return false;
    else return true;
  }
}
