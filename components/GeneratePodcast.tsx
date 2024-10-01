import React, { useState } from 'react'
import {GeneratePodcastProps} from '@/types'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

const useGeneratePodcast = ({
  setAudio, voicePrompt, voiceType, setAudioStorageId
}: GeneratePodcastProps) => {
  const [isGenerating, setisGenerating] = useState(false)
  // Logic for podcast Generation
  const generatePodcast = async () => {
    setisGenerating(true)
    setAudio('')
  }
 
  if (!voicePrompt) {
    // todo: show error
    return setisGenerating(false);
  }

  return {
    isGenerating,
    generatePodcast
  }
}

const GeneratePodcast = (props
 : GeneratePodcastProps) => {
  const {isGenerating, GeneratePodcast} = useGeneratePodcast(props);

  return (
    <div>
      <div className='flex flex-col gap-2.5'>
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate podcast
        </Label>
        <Textarea 
        className='input-class font-light focus-visible:ring-offset-orange-1'
        placeholder='Provide text to generate the audio'
        rows={5}
        value={props.voicePrompt}
        onChange={(e)=> props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className='mt-5 w-full max-w-[200px]'>
      <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1">
                  {isGenerating ? (
                    <>
                      Generating
                      <Loader size={20} className="animate-spin ml-3" />

                    </>

                  ) : (
                    "Generate"
                  )}
                </Button>
      </div>
      {props.audio && (
        <audio controls src={props.audio} className="mt-5" 
        onLoadedMetadata={(e)=> props.setAudioDuration(e.currentTarget.duration)} />
      )}
    </div>
  )
}

export default GeneratePodcast