import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { request } from 'express';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class UserGuard implements CanActivate {
    constructor(private readonly jwt: JwtService) {}
    canActivate(context: ExecutionContext): boolean {
      
      let reques: Request = context.switchToHttp().getRequest();
      let token = request.headers.authorization?.split(' ')?.[1];
  
      if (!token) {
        throw new UnauthorizedException('token not provided');
      }
      try {
        let data = this.jwt.verify(token);
        reques['user'] = data.id;
        return true;
      } catch (error) {
        throw new UnauthorizedException('token not provided');
      }
    }
  }
  