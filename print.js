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
          .text('VN')
          .style('B')
          .text(data.vn)
          .style('U')
          .text('ชื่อ-นามสกุล')
          .style('B')
          .text(fullName)
          .style('U')
          .text('ห้องตรวจ')
          .style('B')
          .text(data.clinicName)
          .barcode(data.queueNumber, 'CODE39', { height: 70 })
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
          .style('B')
          .size(2, 2)
          .text(data.queueNumber)
          .size(1, 1)
          .text('หมายเลขรับยา(ไม่ใช่บัตรคิว)')
          .text('')
          .size(1, 1)
          .text('ประเภท')
          .style('B')
          .text(data.priorityName)
          .style('U')
          .text('ชื่อ-นามสกุล')
          .style('B')
          .text(fullName)
          .style('U')
          .text('HN')
          .style('B')
          .text(data.hn)
          .size(1, 1)
          .text('โปรดเก็บใบนี้ไว้เพื่อติดต่อรับยา!!! ')
          .text('วันที่ ' + dateTime)
          .qrimage(data.queueNumber, { type: 'png', mode: 'dhdw', size: 3 }, function (err) {
            //this.text('สแกน QR CODE ผ่านแอปพลิเคชัน H4U');
            this.text('สแกน QR CODE ที่หน้าตู้ KIOSK เพื่อตรวจสอบสถานะ');
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
