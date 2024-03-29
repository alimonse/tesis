import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { Card, WebhookClient } from 'dialogflow-fulfillment';
import { CalendarService } from '../../calendar.service';
import { DateUtil } from '../../utils/date.util';
import { CitaCrearDto } from '../cita/dto/cita.crear.dto';

import { EmpresaService } from '../empresa/empresa.service';
import { PrestacionesService } from '../prestaciones/prestaciones.service';

@Injectable()
export class AgenteService {
  mensajeSaludo;
  nombreComercial;
  empresa;
  sobreEmpresa = '';
  horariosDisponibles: any[] = [];
  serviciosEmpresa;
  serviciosAmostrar;
  diasDisponibles;
  cita;
  reponseQuery;
  isCreate = false;

  constructor(
    private readonly _empresaService: EmpresaService,
    private readonly _prestacionesService: PrestacionesService,
    private readonly _calendarService: CalendarService,
  ) {
    this.consultarDataEmpresa().then();
    // this.consultarServicios().then();
  }

  async consultarDataEmpresa() {
    this.empresa = await this._empresaService.findAll().then((value) => {
      this.mensajeSaludo = value[0][0].mensajeSaludo;
      this.empresa = value[0][0].informacion;
      this.sobreEmpresa = value[0][0].informacion;
      return value[0][0];
    });
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
  }

  saberEventosCalendario() {
    this._calendarService.listEvents();
  }

  welcome = async (agent) => {
    await this.consultarDataEmpresa();
    agent.add(this.mensajeSaludo);
  };

  informacionEmpresa = async (agent) => {
    await this.consultarDataEmpresa();
    agent.add(this.sobreEmpresa);
  };

  ubicacion = (agent) => {
    agent.add(
      new Card({
        platform: 'PLATFORM_UNSPECIFIED',
        title: 'Ubicacion empresa',
        text: 'Gregorio bobadilla y naciones unidas',
        buttonText: 'Ubicacion',
        buttonUrl:
          'https://www.google.com/maps/uv?pb=!1s0x91d59b4cf54dbbe5%3A0x673d6a69c30f02fc!3m1!7e115!4s%2Fmaps%2Fplace%2Fmanticore%2Blabs%2F%40-0.1747113%2C-78.494253%2C3a%2C75y%2C303.17h%2C90t%2Fdata%3D*213m4*211e1*213m2*211s-bBbAMlxCnhNZNd3yavYtg*212e0*214m2*213m1*211s0x91d59b4cf54dbbe5%3A0x673d6a69c30f02fc%3Fsa%3DX!5smanticore%20labs%20-%20Buscar%20con%20Google!15sCgIgAQ&imagekey=!1e2!2s-bBbAMlxCnhNZNd3yavYtg&hl=es-419&sa=X&ved=2ahUKEwj18Iv_pun5AhV4toQIHQw9DrAQpx96BAg7EAg',
      }),
    );

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

  servicios = async (agent) => {
    await this.consultarServicios();
    // const msg = `Tenemos los siguientes servicios:\n${this.serviciosAmostrar}
    //   \n Si deseas agendar una cita, da clic en "Agendar cita"`;
    agent.add('Tenemos los siguientes servicios');
    this.serviciosAmostrar.forEach((item) => console.log(item));
    this.serviciosAmostrar.forEach((item) => {
      agent.add(`${item}`);
    });
    // agent.add(`${this.serviciosAmostrar}`);
    agent.add('Si deseas agendar una cita, escriba o de clic "Agendar cita"');
  };

  agendar = async (agent) => {
    console.log(this.isCreate);
    console.log(agent.parameters);
    await this.consultarServicios();
    agent.add(`Nota: si no se visualizan los opciones porfavor escribelas!`);
    agent.add(`En que servicios deseas:`);
    if (this.serviciosAmostrar.length > 0) {
      this.serviciosAmostrar.forEach((item) => {
        agent.add(item);
      });
    }
    const servicio = agent.parameters.servicio;
    agent.add(`......`);
    if (servicio) {
      console.log('entre a service');
      await this.horariosServicio(servicio);
      agent.add(`Nota: si no se visualizan los opciones porfavor escribelas!`);
      agent.add(`El servicio seleccionado es ${servicio}`);
      agent.add(`Tenemos los siguientes dias disponibles:`);
      this.horariosDisponibles.forEach((item, index) =>
        agent.add(
          `${index + 1}.- ${item.dia
            .split('-')
            .reverse()
            .join('-')} en el horario de ${item.horaInicio} a ${item.horaFin}`,
        ),
      );
      const serviceFind = this.serviciosEmpresa[0].find(
        (item) => item.nombreServicio === servicio,
      );
      const ishour = this.reponseQuery.includes('en el horario de');
      if (
        agent.parameters.fin &&
        agent.parameters.fecha &&
        agent.parameters.inicio &&
        ishour
      ) {
        console.log('reponseQuery', this.reponseQuery);
        const inicio = this.reponseQuery.split(' ')[6];
        const fin = this.reponseQuery.split(' ')[8];
        const cita = new CitaCrearDto();
        cita.dia = agent.parameters.fecha.split('T')[0];
        cita.horaFin = new Date(
          new Date(
            new Date(agent.parameters.fecha).setHours(+fin.split(':')[0]),
          ).setMinutes(+fin.split(':')[1]),
        ).toISOString();
        cita.horaInicio = new Date(
          new Date(
            new Date(agent.parameters.fecha).setHours(inicio.split(':')[0]),
          ).setMinutes(inicio.split(':')[1]),
        ).toISOString();
        // cita.caledarId = 'calendariD';
        cita.descripcion = 'cita servicio: ' + servicio;
        cita.habilitado = 1;
        cita.usuario = 1;
        cita.prestaciones = serviceFind.id;
        await this.agendarCita(servicio, cita);
        agent.add('Cita registrada con exito');
      }
      // agent.add().clear()
      // this.cita = cita
    }

    // console.log('cita',this.cita)

    // console.log(this.diasDisponibles,'dias disponibleeees');
    // console.log(agent.parameters, 'parametros agendar');
    // agent.add(`En que servicios deseas . ${agent.parameters.servicio}`,)
    //agent.add(
    //  `Desea aceptar la cita, para cotizar un proyecto para el dia 15/09/2022 a las 15:00:00 . ${agent.parameters.servicio}`,
    // );
  };

  fin = (agente) => {
    agente.add('Su servicio a sido agendado correctamente');
  };

  general(request, response) {
    this.reponseQuery = response?.req.body?.queryResult?.queryText;
    const agent = new WebhookClient({ request, response });
    const intentMap = new Map();
    intentMap.set('welcome', this.welcome);
    intentMap.set('informacion-empresa', this.informacionEmpresa);
    intentMap.set('servicios', this.servicios);
    intentMap.set('agendar', this.agendar);
    intentMap.set('ubicacion', this.ubicacion);
    intentMap.set('fin', this.fin);
    agent.handleRequest(intentMap);
  }

  async horariosServicio(nombreServicio: string) {
    const query = {
      where: {
        nombreServicio,
      },
      relations: ['horarioDias', 'horarioDias.horariosHora', 'citas'],
    };
    const value = await this._prestacionesService.findAll(
      JSON.stringify(query),
    );
    if (!value[0].length) {
      console.log('sin data');
      return;
    }
    const horarios = value[0][0].horarioDias.map((horaioDia) => ({
      aproximado: value[0][0].tiempoAproximado,
      espera: value[0][0].tiempoEspera,
      dia: horaioDia.dia,
      horaInicio: horaioDia.horariosHora[0].desde,
      horaFin: horaioDia.horariosHora[0].hasta,
      desde: horaioDia.horariosHora[0].desde,
      hasta: horaioDia.horariosHora[0].hasta,
    }));
    this.horariosDisponibles = horarios;
  }

  async agendarCita(nombreServicio: string, cita?: CitaCrearDto) {
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
      // const servicioAgendar = servicios[0];
      // const tiempoServicio = +format(
      //   new Date(servicioAgendar.tiempoAproximado),
      //   'mm',
      // );
      //
      // const fechaFinServicio = addMinutes(
      //   new Date(cita.horaInicio),
      //   tiempoServicio,
      // );

      const preCita = {
        dateTimeStart: DateUtil.formatCalenda(cita.horaInicio),
        dateTimeEnd: DateUtil.formatCalenda(cita.horaFin),
        dateInit: cita.horaInicio,
        dateEnd: cita.horaFin,
        diaInicio: format(new Date(cita.horaInicio), 'yyyy-MM-dd'),
        horaInicio: format(new Date(cita.horaInicio), 'HH:mm'),
        diaFin: format(new Date(cita.horaFin), 'yyyy-MM-dd'),
        horaFin: format(new Date(cita.horaFin), 'HH:mm'),
      };
      console.log(preCita);

      return this._calendarService
        .createEvent({
          summary: 'Cita - servicio',
          location: 'Quito,Ecuador',
          description: nombreServicio,
          start: {
            dateTime: DateUtil.formatCalenda(preCita.dateTimeStart),
            timeZone: 'America/Guayaquil',
          },
          end: {
            dateTime: DateUtil.formatCalenda(preCita.dateTimeEnd),
            timeZone: 'America/Guayaquil',
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 10 },
            ],
          },
        })
        .then(() => (this.isCreate = true))
        .catch(console.log);

      //! busco el dia de la cita
      // const existeDia = servicioAgendar.horarioDias.find((day) => {
      //   return day.dia === cita.dia;
      // });
      //
      // //! valido si exite horario dia
      // if (!existeDia) {
      //   console.log('no hay dia');
      //   return;
      // }
      //
      // console.log(existeDia.horariosHora[0].desde, cita.horaInicio)
      // console.log(existeDia.horariosHora[0].desde, new Date(cita.horaInicio))
      //
      // //! valido el dia esta en el rango del servicio
      // const range = isBefore(
      //   new Date(existeDia.horariosHora[0].desde),
      //   new Date(cita.horaInicio),
      // );
      //
      // //! furea de rango
      // if (!range) {
      //   console.log('fuera de rango');
      //   return;
      // }
      //
      // //! dentro del rango
      // if (range) {
      //   //! exiten citas
      //   if (servicioAgendar.citas.length) {
      //     console.log(servicioAgendar.citas);
      //     const sameOrRange = servicioAgendar.citas.map((value) => {
      //       //! misma dia
      //       const same = isSameHour(
      //         new Date(value.horaInicio),
      //         new Date(cita.horaInicio),
      //       );
      //
      //       //! rango de una fecha para nueva cita
      //       const range =
      //         isAfter(new Date(value.horaInicio), new Date(cita.horaInicio)) &&
      //         isBefore(new Date(cita.horaInicio), new Date(value.horaFin));
      //       return {
      //         same,
      //         range,
      //       };
      //     });
      //
      //     if (sameOrRange[0].same) {
      //       console.log('same');
      //       return;
      //     }
      //
      //     if (sameOrRange[0].range) {
      //       console.log('dentro range');
      //       return;
      //     }
      //   }
      //
      //   //! tiempo del servicio
      //   const tiempoServicio = +format(
      //     new Date(servicioAgendar.tiempoAproximado),
      //     'mm',
      //   );
      //   //! a la fecha inicio se le agrea el tiempo del servicio
      //   const fechaFinServicio = addMinutes(
      //     new Date(cita.horaInicio),
      //     tiempoServicio,
      //   );
      //
      //   // //! validar rango del servicio con la fecha incio
      //   // const rangoServicio = isAfter(
      //   //   new Date(existeDia.horariosHora[0].hasta),
      //   //   new Date(fechaFinServicio),
      //   // );
      //   //
      //   // //! fuera rango del servicio con la fecha incio
      //   // if (!rangoServicio) {
      //   //   console.log('furea de rango servicio');
      //   //   return;
      //   // }
      //
      //   //! datos para monstra usuario y poder crear agendar y cita
      //   const preCita = {
      //     dateTimeStart: DateUtil.formatCalenda(cita.horaInicio),
      //     dateTimeEnd: DateUtil.formatCalenda(fechaFinServicio),
      //     dateInit: cita.horaInicio,
      //     dateEnd: fechaFinServicio,
      //     diaInicio: format(new Date(cita.horaInicio), 'yyyy-MM-dd'),
      //     horaInicio: format(new Date(cita.horaInicio), 'HH:mm'),
      //     diaFin: format(new Date(fechaFinServicio), 'yyyy-MM-dd'),
      //     horaFin: format(new Date(fechaFinServicio), 'HH:mm'),
      //   };
      //   console.log(preCita);
      //
      //   this._calendarService
      //     .createEvent({
      //       summary: 'Cita - servicio',
      //       location: 'Quito,Ecuador',
      //       description: 'Analisis de requerimientos',
      //       start: {
      //         dateTime: DateUtil.formatCalenda(preCita.dateTimeStart),
      //         timeZone: 'America/Guayaquil',
      //       },
      //       end: {
      //         dateTime: DateUtil.formatCalenda(preCita.dateTimeEnd),
      //         timeZone: 'America/Guayaquil',
      //       },
      //       reminders: {
      //         useDefault: false,
      //         overrides: [
      //           { method: 'email', minutes: 24 * 60 },
      //           { method: 'popup', minutes: 10 },
      //         ],
      //       },
      //     })
      //     .then(console.log)
      //     .catch(console.log);
      // }
    });
  }
}
