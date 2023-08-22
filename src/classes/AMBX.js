import { Device } from 'usb';
import { Commands, Lights, USB } from '../Util.js';

const ArrayLights = Object.keys(Lights).map(l => Lights[l]);
const RealArrayLights = ArrayLights.filter(l => l != Lights.All);

export default class AMBX {
  /**
   * USB Connection and Methods
   * @param {Device} USBInstance
   */
  constructor(USBInstance) {
    this.USB = USBInstance;
    this.USB.open();
    const inter = this.USB.interface(0);
    inter.claim();
    const end = inter.endpoint(USB.Endpoints.OUT);
    this.Endpoint = end;
  }

  async Write(Light, Data = []) {
    return new Promise(res => {
      this.Endpoint.makeTransfer(0, () => res()).submit(Buffer.from([Commands.Header, Light, ...Data]));
    });
  }

  async SetColor(SelLights = Lights.All, Red, Green, Blue) {
    if (!Array.isArray(SelLights))
      if (ArrayLights.includes(SelLights)) SelLights = SelLights == Lights.All ? RealArrayLights : [SelLights];
      else throw new Error('Invalid light');

    for (const Light of SelLights) {
      //console.log("Setting light", Light, "[", Red, Green, Blue, "]");
      await this.Write(Light, [Commands.SetColor, Red, Green, Blue]);
    }
  }

  Close() {
    return this.USB.close();
  }
}
