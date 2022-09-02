import { Injectable } from '@nestjs/common';
import { WebhookClient, Card, Suggestion,Text } from 'dialogflow-fulfillment';


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
    // this.consultarDataEmpresa();
    // this.consultarServicios();
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
    this.calendarService.listEvents();
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
    const cardInformacion = {
      name: 'nombre',
      imagenUrl: 'imagen',
      text: '$ ',
      itemId: 1,
    }

  agent.add(  new Card({
      title: 'Ubicacion empresa',
      text: 'Gregorio bobadilla y naciones unidas',
      buttonText: 'Ubicacion',
      buttonUrl: 'https://www.google.com/maps/uv?pb=!1s0x91d59b4cf54dbbe5%3A0x673d6a69c30f02fc!3m1!7e115!4s%2Fmaps%2Fplace%2Fmanticore%2Blabs%2F%40-0.1747113%2C-78.494253%2C3a%2C75y%2C303.17h%2C90t%2Fdata%3D*213m4*211e1*213m2*211s-bBbAMlxCnhNZNd3yavYtg*212e0*214m2*213m1*211s0x91d59b4cf54dbbe5%3A0x673d6a69c30f02fc%3Fsa%3DX!5smanticore%20labs%20-%20Buscar%20con%20Google!15sCgIgAQ&imagekey=!1e2!2s-bBbAMlxCnhNZNd3yavYtg&hl=es-419&sa=X&ved=2ahUKEwj18Iv_pun5AhV4toQIHQw9DrAQpx96BAg7EAg'
    }))


    agent.add(
      `Estamos ubicados en Gregorio Bobadilla N36-97 y, Quito 170135 https://www.google.com/maps/place/Manticore+Labs/@-0.1746597,-78.4965207,17z/data=!3m1!4b1!4m5!3m4!1s0x91d59b4cf54dbbe5:0x673d6a69c30f02fc!8m2!3d-0.1746607!4d-78.4943207`,
    );


  };

  servicios = (agent) => {

    agent.add(`Tenemos los siguientes servicios:
Servicio 1
Servicio 2

${this.serviciosAmostrar}`);
    agent.add(new Suggestion('Agendar cita'))
    console.log(agent.parameters,"Parametros");
    const servicio = agent.parameters.cita
    console.log(servicio, 'servicio que mmmmmmmmmanda dialogflow');
  };

  agendar = (agent) => {
    //this.servicios;
    console.log(agent.parameters,'parametros agendar');
    agent.add( `En que servicio deseas agendar un servicio? ${agent.parameters.servicio}`)
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
    intentMap.set('agendar',this.agendar);
    intentMap.set('ubicacion',this.ubicacion);
    agent.handleRequest(intentMap);
  }
}
