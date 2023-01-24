import { Injectable } from '@nestjs/common';
import { addMinutes, format } from 'date-fns';
import { Twilio } from 'twilio';
import { CalendarService } from '../../calendar.service';
import { DateUtil } from '../../utils/date.util';
import { CitaCrearDto } from '../cita/dto/cita.crear.dto';
import { EmpresaService } from '../empresa/empresa.service';
import { PrestacionesService } from '../prestaciones/prestaciones.service';
const accountSid = 'ACcb8a178aa4a7cd9b79782d9e9de4bb1b';
const authToken = '9986be4dcac62d35bf3f353ee7a38daf';

@Injectable()
export class WhatsappService {
  constructor(
    private readonly _empresaService: EmpresaService,
    private readonly _prestacionesService: PrestacionesService,
    private readonly _calendarService: CalendarService,
  ) {}
  sendNotification(body: string, phone: string) {
    const client = new Twilio(accountSid, authToken);
    client.messages
      .create({
        body,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+${phone}`,
      })
      .then((message) => console.log(message.sid))
      .catch(console.log);
  }

  async chatBot(work: string, num: string) {
    const services = await this._prestacionesService.findAll();
    const serviciosAmostrar = services[0].map((servicios) => {
      return servicios.nombreServicio;
    });
    const find = services[0].find(
      (item) =>
        item.nombreServicio.toLowerCase() === work.toString().toLowerCase(),
    );
    const hi =
      work.trim().toLowerCase().includes('hola') ||
      work.trim().toLowerCase().includes('hey') ||
      work.trim().toLowerCase().includes('buenos dias');
    if (hi) {
      const item = await this._empresaService.findAll();
      this.sendNotification(item[0][0].mensajeSaludo, num);
    }
    const ubicacion =
      work.trim().toLowerCase().includes('ubicacion') ||
      work.trim().toLowerCase().includes('localizacion') ||
      work.trim().toLowerCase().includes('ubicación');

    if (ubicacion) {
      this.sendNotification(
        'Nos encontramos ubicados en "Gregorio bobadilla y naciones unidas"',
        num,
      );
    }

    const informacion =
      work.trim().toLowerCase().includes('informacion-empresa') ||
      work.trim().toLowerCase().includes('informacion') ||
      work.trim().toLowerCase().includes('info') ||
      work.trim().toLowerCase().includes('información');

    if (informacion) {
      const item = await this._empresaService.findAll();
      console.log(item);
      this.sendNotification(
        item[0][0].informacion !== ''
          ? item[0][0].informacion
          : 'Sin registro de informacion',
        num,
      );
    }

    const servicios =
      work.trim().toLowerCase().includes('servicio') ||
      work.trim().toLowerCase().includes('servicios');

    if (servicios) {
      this.sendNotification(
        `Tenemos los siguientes servicios: \n${serviciosAmostrar.join(
          ', \n',
        )}\n\n\n Si deseas agendar una cita, escriba o de clic "Agendar cita"`,
        num,
      );
    }

    const agendar =
      work.trim().toLowerCase().includes('agendar') ||
      work.trim().toLowerCase().includes('agendar citas') ||
      work.trim().toLowerCase().includes('agendar cita');

    if (agendar) {
      if (serviciosAmostrar.length > 0) {
        const msg = `Nota: si no se visualizan los opciones porfavor escribelas! \n\n En que servicios deseas:\n \n${serviciosAmostrar.join(
          ', \n',
        )}`;
        this.sendNotification(msg, num);
      }
    }

    if (find) {
      const msg = `Nota: si no se visualizan los opciones porfavor escribelas! \n\n El servicio seleccionado es ${find.nombreServicio} \n\n Tenemos los siguientes dias disponibles: \n\n`;
      this.sendNotification(msg, num);
      const horario = await this.horariosServicio(find.nombreServicio);
      horario.forEach((item, index) => {
        this.sendNotification(
          `${find.id}.- ${item.dia
            .split('-')
            .reverse()
            .join('-')} en el horario de ${item.horaInicio} a ${
            item.horaFin
          }\n`,
          num,
        );
      });

      // agent.add(`Tenemos los siguientes dias disponibles:`);
    }

    const option = work.includes('.-');
    if (option) {
      const [id, demas] = work.split('.-');
      const valor = demas.split(' ');
      console.log(valor);
      console.log(demas);
      const serviceFind = await this.consultarServicios(id);
      console.log(id, serviceFind);
      const cita = new CitaCrearDto();
      cita.dia = valor[1];
      cita.horaFin =
        format(new Date(Date.now()), 'yyyy-MM-dd') + 'T' + valor[8];
      cita.horaInicio =
        format(new Date(Date.now()), 'yyyy-MM-dd') + 'T' + valor[6];
      // cita.caledarId = 'calendariD';
      cita.descripcion = 'cita servicio: ' + serviceFind.nombreServicio;
      cita.habilitado = 1;
      cita.usuario = 1;
      cita.prestaciones = serviceFind.id;
      console.log(cita);
      await this.agendarCita(serviceFind.nombreServicio, cita);
      this.sendNotification('Cita registrada con exito', num);
    }
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
      aproximado: format(new Date(value[0][0].tiempoAproximado), 'mm'),
      espera: format(new Date(value[0][0].tiempoEspera), 'mm'),
      dia: horaioDia.dia,
      horaInicio: format(new Date(horaioDia.horariosHora[0].desde), 'HH:mm'),
      horaFin: format(new Date(horaioDia.horariosHora[0].hasta), 'HH:mm'),
      desde: horaioDia.horariosHora[0].desde,
      hasta: horaioDia.horariosHora[0].hasta,
    }));

    return horarios;
  }

  async consultarServicios(id) {
    return await this._prestacionesService.findById(id);
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
      const servicioAgendar = servicios[0];
      const tiempoServicio = +format(
        new Date(servicioAgendar.tiempoAproximado),
        'mm',
      );

      const fechaFinServicio = addMinutes(
        new Date(cita.horaInicio),
        tiempoServicio,
      );

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

      this._calendarService
        .createEvent({
          summary: 'Cita - servicio',
          location: 'Quito,Ecuador',
          description: 'Analisis de requerimientos',
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
        .then()
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
