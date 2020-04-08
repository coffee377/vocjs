import {BinaryReader, BinaryWriter, Message} from "google-protobuf";

export enum LicenseVersion {
    F8 = 0,
    F9 = 1,
    F10 = 2,
}

export class LicenseRequest extends Message {

    getAccessToken(): string {
        return LicenseRequest.getFieldWithDefault(this, 1, "")
    }

    setAccessToken(value: string) {
        LicenseRequest.setField(this, 1, value);
    }

    getUid(): string {
        return LicenseRequest.getFieldWithDefault(this, 2, "")
    };

    setUid(value: string) {
        LicenseRequest.setField(this, 2, value);
    };

    getVersion(): LicenseVersion {
        return LicenseRequest.getFieldWithDefault(this, 3, 0)
    };

    setVersion(value: LicenseVersion) {
        LicenseRequest.setField(this, 3, value);
    };

    getRegistrationInformation(): Uint8Array {
        return LicenseRequest.getFieldWithDefault<Uint8Array>(this, 15, undefined)
    };

    setRegistrationInformation(value: Uint8Array | string): void {
        LicenseRequest.setField(this, 15, null)
    }

    // getRegistrationInformation_asU8(): Uint8Array;

    getRegistrationInformation_asB64(): string {
        return LicenseRequest.bytesAsB64(this.getRegistrationInformation())
    };

    serializeBinary(): Uint8Array {
        const writer = new BinaryWriter();
        LicenseRequest.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }

    toObject(includeInstance?: boolean): {} {
        return {};
    }

    static deserializeBinary(bytes: Uint8Array): LicenseRequest {
        const reader = new BinaryReader(bytes);
        const msg = new LicenseRequest;
        return LicenseRequest.deserializeBinaryFromReader(msg, reader);
    };

    static deserializeBinaryFromReader(message: LicenseRequest, reader: BinaryReader): LicenseRequest {
        while (reader.nextField()) {
            if (reader.isEndGroup()) {
                break;
            }
            const field = reader.getFieldNumber();
            switch (field) {
                case 1:
                    message.setAccessToken(reader.readString());
                    break;
                case 2:
                    message.setUid(reader.readString());
                    break;
                case 3:
                    message.setVersion(reader.readEnum());
                    break;
                case 15:
                    message.setRegistrationInformation(reader.readBytes());
                    break;
                default:
                    reader.skipField();
                    break;
            }
        }
        return message;
    };

    static serializeBinaryToWriter(message: LicenseRequest, writer: BinaryWriter): void {
        let f = undefined;
        f = message.getAccessToken();
        if (f.length > 0) {
            writer.writeString(1, f);
        }
        f = message.getUid();
        if (f.length > 0) {
            writer.writeString(2, f);
        }
        f = message.getVersion();
        if (f !== 0.0) {
            writer.writeEnum(3, f);
        }
        f = message.getRegistrationInformation();
        if (f.length > 0) {
            writer.writeBytes(15, f);
        }
    };

    // static toObject(includeInstance: boolean, msg: Message) {
    //     return {}
    // };

}
