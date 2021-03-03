const moment = require('moment');
const escpos = require('escpos');
escpos.Network = require('escpos').Network;

function printQueue(data, PrinterIp) {
  const year = (+moment().locale('th').format('YYYY') + 543);
  const dayymonth = moment().locale('th').format('DD MMM');
  const time = moment().locale('th').format('HH:mm:ss');
  const dateTime = `${dayymonth}${year} ${time}`;

  try {
    const device = new escpos.Network(PrinterIp);
    const printer = new escpos.Printer(device);
    if (data) {
      const fullName = data.firstName + ' ' + data.lastName;
      device.open(function () {
        printer
          .encode('tis620')
          .align('CT')
          .size(1, 1)
          .text('หมายเลขรับยา')
          .style('B')
          .size(2, 1)
          .text(data.queueNumber)
          .size(1, 1)
          .text('')

          .style('U')
          .text('HN')
          .style('B')
          .text(data.hn)
          .style('U')
          .text('ชื่อ-นามสกุล')
          .style('B')
          .text(fullName)
          .style('U')
          .text('ห้องตรวจ')
          .style('B')
          .text(data.servicePointName)
          .barcode(data.hn, 'CODE39', { height: 70 })
          .text('')
          .text('วันที่: ' + dateTime)
          .text('')
          .cut()
          .font('B')

          .size(2, 1)
          .text(data.hosname)
          .size(1, 1)
          .text('ห้องจ่ายยา')
          .text('')
          .size(1, 1)
          .text('หมายเลขรับยา')
          .style('B')
          .size(2, 1)
          .text(data.queueNumber)
          .text('')
          .size(1, 1)
          .text('ประเภท')
          .style('B')
          .text(data.priorityName)
          .size(1, 1)
          .text('')
          .text('วันที่ ' + dateTime)
          .qrimage(data.qrcode, { type: 'png', mode: 'dhdw', size: 2 }, function (err) {
            this.text('**********************');
            this.text('สแกน QR CODE ผ่านแอปพลิเคชัน H4U');
            this.text('');
            this.cut();
            this.close();
          });
      });
    }


  } catch (error) {
    console.log(error);
  }
}

module.exports = printQueue;