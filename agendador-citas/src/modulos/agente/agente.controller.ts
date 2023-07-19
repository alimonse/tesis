import { Controller, Post, Req, Res } from '@nestjs/common';
import { AgenteService } from './agente.service';

@Controller('agente')
export class AgenteController {
  constructor(private readonly _agente: AgenteService) {}

  @Post('')
  async botFulfillment(@Req() request, @Res() response) {
    this._agente.general(request, response);
  }
}
