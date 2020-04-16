import * as path from 'path';
import { Client } from './index';

class LicenseClient<any, any> extends Client {
  descriptor(): string {
    return path.resolve('./descriptor', 'com/voc/fr/license.proto');
  }

  serviceName(): string {
    return 'com.voc.fr.LicenseService';
  }

  async grant(request?: any): Promise<any> {
    return this.exec('grant', request);
  }
}

const client = new LicenseClient();

const result = client.grant({ version: 'F8' });

result.then(data => {
  console.log(data);
});
