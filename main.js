import { WebUSB } from "usb";
import HID from "node-hid";
import { USB } from "./Util.js";
import AMBX from "./classes/AMBX.js";

async function CreateDevice(vendorId = USB.VID, productId = USB.PID) {
  const USB = new WebUSB();

  const device = await USB.requestDevice({
    filters: [{ vendorId, productId }],
  });

  if (!device) throw new Error("No USB device found");

  return new AMBX(device);
}

(async () => {
  var Device = await CreateDevice();
  Device.Open();
})();

export { CreateDevice };
