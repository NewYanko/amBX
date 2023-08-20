import { Commands, Lights } from "../Util.js";

export default class AMBX {
  /**
   *
   * @param {USBDevice} USBInstance
   */
  constructor(USBInstance) {
    this.USB = USBInstance;
  }

  async Open() {
    await this.USB.open();
    await this.USB.claimInterface(0);
    const res = await this.USB.controlTransferOut({
      requestType: "class",
      recipient: "interface",
      request: Util.Commands.Header,
      value: [Util.Lights.Left, Util.Commands.SetColor, 0xff, 0xff, 0xff],
      index: Util.USB.Endpoints.OUT,
    });
    /*
    this.USB.write([
      Commands.Header,
      Lights.Left,
      Commands.SetColor,
      0xff,
      0xff,
      0xff,
    ]);*/

    console.log(res);
  }

  async Close() {
    return await this.USB.open();
  }
}
