export class WsHealthCheck {
  status: 'Healthy' | 'Fail';
  payload: string;
  date: Date;
  clientId: string;
}
