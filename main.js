import { WebUSB } from "usb";
import Util from "./Util.js";

async function CreateDevice(
  vendorId = Util.DEFAULT_VID,
  productId = Util.DEFAULT_PID
) {
  const USB = new WebUSB();

  const device = await USB.requestDevice({
    filters: [{ vendorId, productId }],
  });
  console.log(device);
}

CreateDevice(1);

export { CreateDevice };
