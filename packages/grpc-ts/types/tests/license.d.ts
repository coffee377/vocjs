import { BinaryReader, BinaryWriter, Message } from "google-protobuf";
export declare enum LicenseVersion {
    F8 = 0,
    F9 = 1,
    F10 = 2
}
export declare class LicenseRequest extends Message {
    getAccessToken(): string;
    setAccessToken(value: string): void;
    getUid(): string;
    setUid(value: string): void;
    getVersion(): LicenseVersion;
    setVersion(value: LicenseVersion): void;
    getRegistrationInformation(): Uint8Array;
    setRegistrationInformation(value: Uint8Array | string): void;
    getRegistrationInformation_asB64(): string;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): {};
    static deserializeBinary(bytes: Uint8Array): LicenseRequest;
    static deserializeBinaryFromReader(message: LicenseRequest, reader: BinaryReader): LicenseRequest;
    static serializeBinaryToWriter(message: LicenseRequest, writer: BinaryWriter): void;
}
