import { getMemorySize } from "./graphics";

memory.grow(1);

export const INPUT_BUFFER_POINTER: i32 = 0;
export const INPUT_BUFFER_SIZE: i32 = 1024;
export const OUTPUT_BUFFER_POINTER: i32 =
  INPUT_BUFFER_POINTER + INPUT_BUFFER_SIZE;
export const OUTPUT_BUFFER_SIZE: i32 = INPUT_BUFFER_SIZE;

export function amplifyAudioInBuffer(): void {
  // Loop over the samples
  for (let i = 0; i < INPUT_BUFFER_SIZE; i++) {
    // Load the sample at the index
    let audioSample: u8 = load<u8>(INPUT_BUFFER_POINTER + i);

    // Amplify the sample. All samples
    // Should be implemented as bytes.
    // Byte samples are represented as follows:
    // 127 is silence, 0 is negative max, 256 is positive max
    if (audioSample > 127) {
      let audioSampleDiff = audioSample - 127;
      audioSample = audioSample + audioSampleDiff;
    } else if (audioSample < 127) {
      audioSample = audioSample / 2;
    }

    // Store the audio sample into our output buffer
    store<u8>(OUTPUT_BUFFER_POINTER + i, audioSample);
  }
}
