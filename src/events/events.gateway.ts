import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Socket } from 'dgram'
import { map, of } from 'rxjs'
import * as url from 'url'

@WebSocketGateway({ cors: '*:*' })
export class EventsGateway {
  @WebSocketServer() server: any
  private clientsArr: any[] = []

  handleConnection (client: any) {
    console.log('有人链接了, client.id :' + client.id)
  }

  handleDisconnect (client: any) {
    console.log('有人退出了, client.id :' + client.id)
  }

  @SubscribeMessage('Chat')
  Chat (client: any, payload: any) {
    console.log(payload)
    var roomid = url.parse(client.request.url, true).query.roomid
    console.log('房间号 : ', roomid)
    client.join(roomid)
    this.server.to(roomid).emit('Chat', { msg: 'Server Chat OK - All' }) //广播所有人包含自己
    client.broadcast.to(roomid).emit('Chat', { msg: 'Server Chat OK' }) //不包括自己
  }
}
