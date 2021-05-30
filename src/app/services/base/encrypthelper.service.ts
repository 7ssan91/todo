import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';


@Injectable()
export class EncryptHelper {

  private privateKey: string;
  private publicKey: string;
  private enabled: boolean;

  /// <summary>
  /// constructor
  /// </summary>
  constructor() {
    this.privateKey = "gfdgdsfgsdfg";
    this.publicKey = "hdsfhsdfhsdfhsdfhsdfhsdfh";
    this.enabled = true;
  }

  encrypt(plaintext: string): string {
    var key = CryptoJS.enc.Utf8.parse('7061737323313233');
    var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    var x = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7

      });
    var cy: ICypher = { ciphertext: x.ciphertext, iv: x.iv, key: x.key, salt: x.salt };
    var translatedtojson: string = btoa(JSON.stringify(cy));
    return translatedtojson;
  }

  encrypttx(plaintext: string): string {
    var key = CryptoJS.enc.Utf8.parse('7061737323313233');
    var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    var x = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7

      });
    var cy: ICypher = { ciphertext: x.ciphertext, iv: x.iv, key: x.key, salt: x.salt };
    var translatedtojson: string = x.toString();
    return translatedtojson;
  }

  decrypt(cypher: string): string {
    var key = CryptoJS.enc.Utf8.parse('7061737323313233');
    var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    var cy: ICypher = JSON.parse(atob(cypher)!) as ICypher;
    var value: CryptoJS.WordArray = { ciphertext: cy.ciphertext!, iv: cy.iv!, salt: cy.salt!, key: cy.key! };
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7

    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  decryptx(cypher: string): string {
    var key = CryptoJS.enc.Utf8.parse('7061737323313233');
    var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    var decrypted = CryptoJS.AES.decrypt(cypher, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7

    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  ded(cypher: string): string {
    var key = CryptoJS.enc.Utf8.parse('7061737323313233');
    var iv = CryptoJS.enc.Utf8.parse('7061737323313233');


    var decrypted = CryptoJS.AES.decrypt(cypher, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}

export interface ICypher {
  ciphertext?: string;
  iv?: string;
  salt?: string;
  key?: string;
}
