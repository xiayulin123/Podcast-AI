import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai"
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

let isGeneratingAudio = false;

export const generatedAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { voice, input }) => {
    if (isGeneratingAudio) {
      console.log("Audio generation is already in progress.");
      return; // Prevents multiple calls
    }

    isGeneratingAudio = true; // Set the flag

    try {
      console.log("Generating audio with the following parameters:");
      console.log("Voice:", voice);
      console.log("Input text:", input);

      // Call OpenAI API
      const audio = await openai.audio.speech.create({
        model: "tts-1",
        voice: voice as SpeechCreateParams['voice'],
        input,
      });

      console.log("Audio response received from OpenAI:", audio);

      const buffer = await audio.arrayBuffer();
      console.log("Buffer generated successfully");

      return buffer;
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      isGeneratingAudio = false; // Reset the flag when the process is done
    }
  },
});

export const generateThumbnailAction = action({
  args: {prompt: v.string()},
  handler: async(_, { prompt }) => {
    const response = await openai.images.generate({
      model:  'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    })
    const url = response.data[0].url;

    if(!url) {
      throw new Error("error of generating ai thumbnail")
    }

    const imageResponse = await fetch(url)
    const buffer = await imageResponse.arrayBuffer();
    return buffer;
  } 
  
})