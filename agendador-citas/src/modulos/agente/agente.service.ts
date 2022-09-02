import { Injectable } from '@nestjs/common';
import { WebhookClient } from 'dialogflow-fulfillment';
import { EmpresaService } from '../empresa/empresa.service';
import { PrestacionesService } from '../prestaciones/prestaciones.service';
import { CalendarService } from '../../calendar.service';

@Injectable()
export class AgenteService {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly prestacionesService: PrestacionesService,
    private readonly calendarService: CalendarService,
  ) {
    this.consultarDataEmpresa();
    this.consultarServicios();
    this.saberEventosCalendario();
  }
  empresa;
  serviciosEmpresa;
  serviciosAmostrar;
  diasDisponibles;

  async consultarDataEmpresa() {
    this.empresa = await this.empresaService.findAll().then((value) => {
      return value[0][0];
    });

    console.log(this.empresa, 'nombreEmpresa');
  }

  async consultarServicios() {
    this.serviciosEmpresa = await this.prestacionesService
      .findAll()
      .then((value) => {
        return value;
      });

    this.serviciosAmostrar = this.serviciosEmpresa[0].map((servicios) => {
      return servicios.nombreServicio;
    });

    console.log(this.serviciosAmostrar, 'serviciosEmpresa');
  }

  saberEventosCalendario() {
    this.calendarService.listarEventos();
  }

  welcome = (agent) => {
    console.log(agent);
    agent.add(
      `¡Saludos! soy botsito, el asistente virtual de ${this.empresa.nombreComercial}, en que te puedo ayudar ? Actualmente puedo: Brindarte información sobre ${this.empresa.nombreComercial} o Agendar una cita,
      que deseas hacer ?`,
    );
  };
  //`Desarrollamos aplicaciones con flexibilidad de integraciones, que puedan gestionar solicitudes de multiples canales y de forma independiente segun se requiera.`
  informacionEmpresa = (agent) => {
    agent.add(
      `Somos una empresa Ecuatoriana, que se enfoca en realizar desarrollo a la medida tanto en aplicaciones web como móviles. Consulta sobre nuestros servicios para poder agendar una cita, estaremos gustosos de atenderte.`,
    );
  };

  ubicacion = (agent) => {
    agent.add(
      `Estamos ubicados en Gregorio Bobadilla N36-97 y, Quito 170135 https://www.google.com/maps/place/Manticore+Labs/@-0.1746597,-78.4965207,17z/data=!3m1!4b1!4m5!3m4!1s0x91d59b4cf54dbbe5:0x673d6a69c30f02fc!8m2!3d-0.1746607!4d-78.4943207`,
    );
  };

  servicios = (agent) => {
    `Tenemos diferentes servicios: ${this.serviciosAmostrar}`;
  };

  agendar = (agent) => {
    `En que servicio deseas agendar un servicio?`;
    this.servicios;
  };

  dia = (agente) => {
    `Tenemos los siguientes dias disponibles ${this.diasDisponibles}`;
  };

  general(request, response) {
    const agent = new WebhookClient({ request, response });
    const intentMap = new Map();
    intentMap.set('welcome', this.welcome);
    intentMap.set('informacion-empresa', this.informacionEmpresa);
    intentMap.set('servicios', this.servicios);
    agent.handleRequest(intentMap);
  }
}
