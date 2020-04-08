import { Server, ServerOptions } from '../index';
import { GrpcServiceOptions } from '../decorator/GrpcService';

// import { GrpcService } from '../decorator/GrpcService';

// enum LicenseVersion {
//   F8 = 0,
//   F9 = 1,
//   F10 = 2,
// }
//
// interface LicenseRequest {
//   registrationInformation?: Buffer;
//   version: LicenseVersion;
//   accessToken: string;
//   username: string;
//   password: string;
// }
//
// interface LicenseResponse {
//   fileName?: string;
//   deadLine?: string;
//   contents?: any;
// }

class LicenseServer extends Server {
  // @Service('com.voc.fr.LicenseService')

  constructor(opts: Partial<ServerOptions> = {}) {
    super(opts);
    const serviceOptions: GrpcServiceOptions = {
      descriptor: './descriptor/com/voc/fr/license.proto',
      serviceName: 'com.voc.fr.LicenseService',
      methodName: 'grant',
      method: this.grant,
    };
    this.registerMethod(serviceOptions);
  }

  grant(request: any): any {
    // todo 业务逻辑实现
    return { fileName: 'test request' };
  }
}

const server = new LicenseServer();
server.start();
