import { CreateDevice, Lights } from './src/main.js';

(async () => {
  var Device = await CreateDevice();
  var values = [0, 10, 20, 30, 40];
  const step = 10;

  const loop = () => {
    values = values.map(value => (value > 255 ? 0 : value + step));

    Device.SetColor(Lights.Left, values[0], 0, 0);
    Device.SetColor(Lights.WallLeft, values[1], 0, 0);
    Device.SetColor(Lights.WallCenter, values[2], 0, 0);
    Device.SetColor(Lights.WallRight, values[3], 0, 0);
    Device.SetColor(Lights.Right, values[4], 0, 0);
  };
  setInterval(loop, 50);
  loop();
})();
