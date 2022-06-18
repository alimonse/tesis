import { Injectable } from '@nestjs/common';
import { WebhookClient } from 'dialogflow-fulfillment';


@Injectable()
export class AgenteService {

  constructor() {

  }

  welcome = (agent) => {
    console.log(agent);
    agent.add('holi amor mio')
  }

  general(request, response) {
    const agent = new WebhookClient({ request, response });
    const intentMap = new Map();
    intentMap.set('welcome', this.welcome);
    agent.handleRequest(intentMap);
  }



}


