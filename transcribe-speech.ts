import recorder from "node-record-lpcm16";
import speech from "@google-cloud/speech";

interface SpeechAlternative {
  words: any[];
  transcript: string;
  confidence: number;
}
interface SpeechData {
  alternatives: SpeechAlternative[];
  isFinal: boolean;
  stability: number;
  resultEndTime: { seconds: string; nanos: number };
  channelTag: number;
  languageCode: string;
}

const client = new speech.SpeechClient();

interface SpeechInputOptions {
  lang: string;
  sampleRate: number;
}

interface SpeechTranscription {
  transcript: string;
  confidence: number;
}

const DEFAULTS: SpeechInputOptions = {
  lang: "ko",
  sampleRate: 16000
};

// NOTE - You need to run this via `ts-node --files microphone.ts`
//        because of the custom .d.ts file.
export function transcribeSpeech(opts: Partial<SpeechInputOptions> = {}): Promise<SpeechTranscription> {
  return new Promise((res, rej) => {
    const sampleRateHertz = opts.sampleRate ?? DEFAULTS.sampleRate;
    const languageCode = opts.lang ?? DEFAULTS.lang;
    const mic = recorder.record({
      sampleRateHertz: sampleRateHertz,
      threshold: 0, //silence threshold
      recordProgram: "rec", // Try also "arecord" or "sox"
      silence: "3.0", //seconds of silence before ending
    });
    const recognizeStream = client.streamingRecognize({
        config: {
          encoding: "LINEAR16",
          sampleRateHertz: sampleRateHertz,
          languageCode: languageCode,
          // maxAlternatives: 3,
        },
        interimResults: false, //Get interim results from stream
      })
      .on("data", (data: { results: SpeechData[] }) => {
        const result = data?.results[0]?.alternatives[0];
        if (result) {
          res({
            transcript: result.transcript,
            confidence: result.confidence
          });
        }
        mic.stop();
      })
      .on("error", rej);
    mic.stream().on("error", rej).pipe(recognizeStream);  
  });
}
