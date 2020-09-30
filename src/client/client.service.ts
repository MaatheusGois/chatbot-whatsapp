/* eslint-disable @typescript-eslint/no-var-requires */
import WAWebJS = require('whatsapp-web.js');
import { Injectable } from '@nestjs/common';
import fs = require("fs");
import path = require('path')
import { Client } from "whatsapp-web.js";
const qrImage = require('qr-image');

@Injectable()
export class ClientService {
    private sessionData;
    private SESSION_FILE_PATH = "src/data/session.json";
    private client: WAWebJS.Client;
    private qr = "";

    constructor() {
        this.initClient()
    }

    async initClient() {
        try {
            await this.initSession()
            this.client = new Client({ session: this.sessionData })
            await this.initListeners()
            this.initBot()
            this.client.initialize()
        } catch (error) {
            console.error(error)
        }
    }

    private async initSession() {
        return new Promise(async resolve => {
            const filePath = path.join(process.cwd(), "src", "data", "session.json")
            if (fs.existsSync(filePath)) {
                this.sessionData = require(filePath);
            }
            resolve();
        })
    }

    private async initListeners() {
        try {
            // Save session values to the file upon successful auth
            this.client.on("authenticated", (session) => {
                this.sessionData = session;
                fs.writeFile(this.SESSION_FILE_PATH, JSON.stringify(session), function (err) {
                    if (err) { console.error(err); }
                });
            });

            this.client.on("qr", (qr) => {
                this.qr = qr;
            });

            this.client.on("ready", () => {
                console.log("Client is ready!");
            });
        } catch (error) {
            console.error(error)
        }
    }

    private initBot() {
        try {
            this.client.on("message", (msg) => {
                if (msg.body == "ping") {
                    msg.reply("pong");
                }
            });
        } catch (error) {
            console.error(error)
        }
    }

    async getQRCode() {
        try {
            if (this.qr == "") { return }
            try {
                return await qrImage.imageSync(this.qr, { type: 'svg', size: 5 });
            } catch (err) {
                console.error(err)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getStatus(): Promise<WAWebJS.WAState> {
        try {
            return await this.client.getState();
        } catch (error) {
            console.error(error)
        }
    }

    async sendMessage(number: string, message: string): Promise<string> {
        console.log(number, message)
        await this.client.sendMessage(number+"@c.us", message)
        return 'Sending message...'
    }
}
