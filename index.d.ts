declare module "node-record-lpcm16" {
    export interface RecorderParams {
      sampleRateHertz: number;
      threshold: number;
      recordProgram: "rec";
      silence: string; //seconds of silence before ending
    }
    export interface Recorder {
      record(params: RecorderParams);
    }
    let recorder: Recorder;
    export default recorder;
  }
  