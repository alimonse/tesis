import { Injectable } from '@nestjs/common';
import { WebhookClient, Card, Suggestion, Text } from 'dialogflow-fulfillment';
import { format, isSameHour, isBefore, isAfter, addMinutes } from 'date-fns';

import { EmpresaService } from '../empresa/empresa.service';
import { PrestacionesService } from '../prestaciones/prestaciones.service';
import { CalendarService } from '../../calendar.service';
import { DateUtil } from '../../utils/date.util';
import { CitaCrearDto } from '../cita/dto/cita.crear.dto';
import {validateEach} from "@nestjs/common/utils/validate-each.util";

@Injectable()
export class AgenteService {
  constructor(
    private readonly _empresaService: EmpresaService,
    private readonly _prestacionesService: PrestacionesService,
    private readonly _calendarService: CalendarService,
  ) {
     this.consultarDataEmpresa();
    // this.consultarServicios();
    // this.horariosServicio('nombreServicio');
    const cita = new CitaCrearDto();
    cita.dia = '2022-09-09';
    cita.horaFin = '2022-09-09T16:00:00.000Z';
    cita.horaInicio = '2022-09-09T14:00:00.000Z';
    // cita.caledarId = 'calendariD';
    cita.descripcion = 'NUEVA';
    cita.habilitado = 1;
    cita.usuario = 1;
    cita.prestaciones = 1;
    this.agendarCita('nombreServicio', cita);
    // this.saberEventosCalendario();
  }
  mensajeSaludo;
  nombreComercial;
  empresa;
  serviciosEmpresa;
  serviciosAmostrar;
  diasDisponibles;

  async consultarDataEmpresa() {
    this.empresa = await this._empresaService.findAll().then((value) => {
      console.log(value,'this is value')
      this.mensajeSaludo = value[0][0].mensajeSaludo;
      this.empresa = value[0][0].informacion;
      return value[0][0];
    });

    console.log(this.empresa, 'nombreEmpresa');
  }

  async consultarServicios() {
    this.serviciosEmpresa = await this._prestacionesService
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
    this._calendarService.listEvents();
  }

  welcome = (agent) => {
    this.consultarDataEmpresa()
    console.log(agent);
      agent.add( this.mensajeSaludo);
  };

  informacionEmpresa = (agent) => {
    agent.add(
      `Somos una empresa Ecuatoriana, que se enfoca en realizar desarrollo a la medida tanto en aplicaciones web como móviles. Consulta sobre nuestros servicios para poder agendar una cita, estaremos gustosos de atenderte.`,
    );
  };

  ubicacion = (agent) => {
    agent.add(  new Card({
      platform: 'PLATFORM_UNSPECIFIED',
      title: 'Ubicacion empresa',
      text: 'Gregorio bobadilla y naciones unidas',
      buttonText: 'Ubicacion',
      buttonUrl: 'https://www.google.com/maps/uv?pb=!1s0x91d59b4cf54dbbe5%3A0x673d6a69c30f02fc!3m1!7e115!4s%2Fmaps%2Fplace%2Fmanticore%2Blabs%2F%40-0.1747113%2C-78.494253%2C3a%2C75y%2C303.17h%2C90t%2Fdata%3D*213m4*211e1*213m2*211s-bBbAMlxCnhNZNd3yavYtg*212e0*214m2*213m1*211s0x91d59b4cf54dbbe5%3A0x673d6a69c30f02fc%3Fsa%3DX!5smanticore%20labs%20-%20Buscar%20con%20Google!15sCgIgAQ&imagekey=!1e2!2s-bBbAMlxCnhNZNd3yavYtg&hl=es-419&sa=X&ved=2ahUKEwj18Iv_pun5AhV4toQIHQw9DrAQpx96BAg7EAg'
    }))

    agent.add(
      new Card({
        title: 'Ubicacion empresa',
        text: 'Gregorio bobadilla y naciones unidas',
        buttonText: 'Ubicacion',
        buttonUrl:
          'https://www.google.com/maps/uv?pb=!1s0x91d59b4cf54dbbe5%3A0x673d6a69c30f02fc!3m1!7e115!4s%2Fmaps%2Fplace%2Fmanticore%2Blabs%2F%40-0.1747113%2C-78.494253%2C3a%2C75y%2C303.17h%2C90t%2Fdata%3D*213m4*211e1*213m2*211s-bBbAMlxCnhNZNd3yavYtg*212e0*214m2*213m1*211s0x91d59b4cf54dbbe5%3A0x673d6a69c30f02fc%3Fsa%3DX!5smanticore%20labs%20-%20Buscar%20con%20Google!15sCgIgAQ&imagekey=!1e2!2s-bBbAMlxCnhNZNd3yavYtg&hl=es-419&sa=X&ved=2ahUKEwj18Iv_pun5AhV4toQIHQw9DrAQpx96BAg7EAg',
      }),
    );

    agent.add(
      `Estamos ubicados en Gregorio Bobadilla N36-97 y, Quito 170135 https://www.google.com/maps/place/Manticore+Labs/@-0.1746597,-78.4965207,17z/data=!3m1!4b1!4m5!3m4!1s0x91d59b4cf54dbbe5:0x673d6a69c30f02fc!8m2!3d-0.1746607!4d-78.4943207`,
    );
  };

  servicios = (agent) => {
    agent.add(`Tenemos los siguientes servicios:
                 1. Obtener requerimientos
                 2. Contratar un equipo de desarrollo
                 3. Tengo una idea
Si deseas agendar una cita, da clic en "Agendar cita"

${this.serviciosAmostrar}`);
    agent.add(new Suggestion('Agendar cita'));
    console.log(agent.parameters, 'Parametros');
    const servicio = agent.parameters.cita;
    console.log(servicio, 'servicio que mmmmmmmmmanda dialogflow');
  };

  agendar = (agent) => {
    //this.servicios;
    console.log(agent.parameters, 'parametros agendar');
    agent.add(
      `Desea aceptar la cita, para cotizar un proyecto para el dia 15/09/2022 a las 15:00:00 . ${agent.parameters.servicio}`,
    );
  };

  dia = (agente) => {
    `Tenemos los siguientes dias disponibles ${this.diasDisponibles}`;
  };

  general(request, response) {
    console.log("Respuesta en agente",request,response)
    const agent = new WebhookClient({ request, response });
    const intentMap = new Map();
    intentMap.set('welcome', this.welcome);
    intentMap.set('informacion-empresa', this.informacionEmpresa);
    intentMap.set('servicios', this.servicios);
    intentMap.set('agendar', this.agendar);
    intentMap.set('ubicacion', this.ubicacion);
    agent.handleRequest(intentMap);
  }

  async horariosServicio(nombreServicio: string) {
    const query = {
      where: {
        nombreServicio,
      },
      relations: ['horarioDias', 'horarioDias.horariosHora', 'citas'],
    };
    this._prestacionesService.findAll(JSON.stringify(query)).then((value) => {
      if (!value[0].length) {
        console.log('sin data');
        return;
      }
      const horarios = value[0][0].horarioDias.map((horaioDia) => ({
        aproximado: format(new Date(value[0][0].tiempoAproximado), 'mm'),
        espera: format(new Date(value[0][0].tiempoEspera), 'mm'),
        dia: horaioDia.dia,
        horaInicio: format(new Date(horaioDia.horariosHora[0].desde), 'HH:mm'),
        horaFin: format(new Date(horaioDia.horariosHora[0].hasta), 'HH:mm'),
        desde: horaioDia.horariosHora[0].desde,
        hasta: horaioDia.horariosHora[0].hasta,
      }));
      console.log(horarios);
    });
  }

  async agendarCita(nombreServicio: string, cita: CitaCrearDto) {
    const query = {
      where: {
        nombreServicio,
      },
      relations: ['horarioDias', 'horarioDias.horariosHora', 'citas'],
    };
    this._prestacionesService.findAll(JSON.stringify(query)).then((value) => {
      const servicios = value[0];
      //! valido si exiten datos de servicios
      if (!servicios.length) {
        console.log('sin data');
        return;
      }
      const servicioAgendar = servicios[0];

      //! busco el dia de la cita
      const existeDia = servicioAgendar.horarioDias.find((day) => {
        return day.dia === cita.dia;
      });

      //! valido si exite horario dia
      if (!existeDia) {
        console.log('no hay dia');
        return;
      }

      //! valido el dia esta en el rango del servicio
      const range = isBefore(
        new Date(existeDia.horariosHora[0].desde),
        new Date(cita.horaInicio),
      );

      //! furea de rango
      if (!range) {
        console.log('fuera de rango');
        return;
      }

      //! dentro del rango
      if (range) {
        //! exiten citas
        if (servicioAgendar.citas.length) {
          console.log(servicioAgendar.citas);
          const sameOrRange = servicioAgendar.citas.map((value) => {
            //! misma dia
            const same = isSameHour(
              new Date(value.horaInicio),
              new Date(cita.horaInicio),
            );

            //! rango de una fecha para nueva cita
            const range =
              isAfter(new Date(value.horaInicio), new Date(cita.horaInicio)) &&
              isBefore(new Date(cita.horaInicio), new Date(value.horaFin));
            return {
              same,
              range,
            };
          });

          if (sameOrRange[0].same) {
            console.log('same');
            return;
          }

          if (sameOrRange[0].range) {
            console.log('dentro range');
            return;
          }
        }

        //! tiempo del servicio
        const tiempoServicio = +format(
          new Date(servicioAgendar.tiempoAproximado),
          'mm',
        );
        //! a la fecha inicio se le agrea el tiempo del servicio
        const fechaFinServicio = addMinutes(
          new Date(cita.horaInicio),
          tiempoServicio,
        );

        //! validar rango del servicio con la fecha incio
        const rangoServicio = isAfter(
          new Date(existeDia.horariosHora[0].hasta),
          new Date(fechaFinServicio),
        );

        //! fuera rango del servicio con la fecha incio
        if (!rangoServicio) {
          console.log('furea de rango servicio');
          return;
        }

        //! datos para monstra usuario y poder crear agendar y cita
        const preCita = {
          dateTimeStart: DateUtil.formatCalenda(cita.horaInicio),
          dateTimeEnd: DateUtil.formatCalenda(fechaFinServicio),
          dateInit: cita.horaInicio,
          dateEnd: fechaFinServicio,
          diaInicio: format(new Date(cita.horaInicio), 'yyyy-MM-dd'),
          horaInicio: format(new Date(cita.horaInicio), 'HH:mm'),
          diaFin: format(new Date(fechaFinServicio), 'yyyy-MM-dd'),
          horaFin: format(new Date(fechaFinServicio), 'HH:mm'),
        };
        console.log(preCita);

        // this._calendarService
        //   .createEvent({
        //     summary: 'Cita - servicio',
        //     location: 'Quito,Ecuador',
        //     description: 'servicio de desarrllo y consultoria',
        //     start: {
        //       dateTime: DateUtil.formatCalenda(preCita.dateTimeStart),
        //       timeZone: 'America/Guayaquil',
        //     },
        //     end: {
        //       dateTime: DateUtil.formatCalenda(preCita.dateTimeEnd),
        //       timeZone: 'America/Guayaquil',
        //     },
        //     reminders: {
        //       useDefault: false,
        //       overrides: [
        //         { method: 'email', minutes: 24 * 60 },
        //         { method: 'popup', minutes: 10 },
        //       ],
        //     },
        //   })
        //   .then(console.log)
        //   .catch(console.log);
      }
    });
  }
}
