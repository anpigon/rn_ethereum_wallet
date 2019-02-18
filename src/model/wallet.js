import uuidv4 from 'uuid/v4';

export default class Wallet {
  constructor(opts) {
    this.id = uuidv4();
    this.name = opts.name;
    this.derivePath = opts.derivePath;
    this.coin = opts.coin;
    this.symbol = opts.symbol;
    this.address = opts.address;
    this.privateKey = opts.privateKey;
    this.balance = '0.0';
    this.state = '';
    this.contract = '';
    this.type = '';
  }

  toObject() {
    let x = Object.assign({}, this);
    delete x['privateKey'];
    return x;
  }

  toJSON() {
    return this.toObject();
  }

  static create(opts) {
    let x = new Wallet(opts);
    return x;
  }

  static fromObject(opts) {
    let x = new Wallet(opts);
    return x;
  }
}