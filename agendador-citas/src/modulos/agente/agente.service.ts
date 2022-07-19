import { Injectable } from '@nestjs/common';
import { WebhookClient } from 'dialogflow-fulfillment';
import { EmpresaService } from '../empresa/empresa.service';

@Injectable()
export class AgenteService {
  constructor(private readonly empresaService: EmpresaService) {
    this.consultarDataEmpresa();
  }
  nombreEmpresa;

  async consultarDataEmpresa() {
    const empresa = await this.empresaService.findAll().then((value) => {
      return value;
    });

    this.nombreEmpresa = empresa[0][0].nombreComercial;

    console.log(this.nombreEmpresa, 'nombreEmpresa');
  }

  welcome = (agent) => {
    console.log(agent);
    agent.add(
      `¡Saludos! soy botsito, el asistente virtual de ${this.nombreEmpresa}, en que te puedo ayudar ? Actualmente puedo: Brindarte información sobre ${this.nombreEmpresa} o Agendar una cita,
      que deseas hacer ?`,
    );
  };
  //`Desarrollamos aplicaciones con flexibilidad de integraciones, que puedan gestionar solicitudes de multiples canales y de forma independiente segun se requiera.`
  informacionEmpresa = (agent) => {
    agent.add(
      `Somos una empresa Ecuatoriana, que se enfoca en realizar desarrollo a la medida tanto en aplicaciones web como móviles. Consulta sobre nuestros servicios para poder agendar una cita, estaremos gustosos de atenderte.`
    );
  };

  ubicacion = (agent) => {
    agent.add(
      `Estamos ubicados en Gregorio Bobadilla N36-97 y, Quito 170135 https://www.google.com/maps/place/Manticore+Labs/@-0.1746597,-78.4965207,17z/data=!3m1!4b1!4m5!3m4!1s0x91d59b4cf54dbbe5:0x673d6a69c30f02fc!8m2!3d-0.1746607!4d-78.4943207`
    )
  }

  servicios = (agent) => {
    `Tenemos diferentes servicios: `
  }

  general(request, response) {
    const agent = new WebhookClient({ request, response });
    const intentMap = new Map();
    intentMap.set('welcome', this.welcome);
    intentMap.set('informacion-empresa', this.informacionEmpresa);
    agent.handleRequest(intentMap);
  }
}
