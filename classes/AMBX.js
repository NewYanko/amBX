import { Device } from "usb";
import { Commands, Lights, USB } from "../Util.js";

export default class AMBX {
  /**
   *
   * @param {Device} USBInstance
   */
  constructor(USBInstance) {
    this.USB = USBInstance;
    this.USB.open();
  }

  async Open() {
    const inter = this.USB.interface(0);
    inter.claim();
    const end = inter.endpoint(USB.Endpoints.OUT);
    console.log(end.direction);
    end
      .makeTransfer(0, (res) => console.log("Transferred", res))
      .submit(
        Buffer.from([
          Commands.Header,
          Lights.Left,
          Commands.SetColor,
          0xff,
          0xff,
          0xff,
        ])
      );
  }

  async Close() {
    return await this.USB.open();
  }
}
