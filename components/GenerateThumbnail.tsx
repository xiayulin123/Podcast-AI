import React, { useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'


const GenerateThumbnail = ({ setImage, setImageStorageId, image}) => {
  const [isAiThubmbnail, setIsAiThumbnail] = useState(false);
  return (
    <>
     <div className='generate_thumbnail'>
      <Button type="button" variant="plain" className='bg-black-6'>
        Use AI to GenerateThumbnail
      </Button>
      <Button type="button" variant="plain" onClick={()=> setIsAiThumbnail(true)} className={cn('',{'bg-black-6': isAiThubmbnail})}>
        Upload custom image
      </Button>
    </div>

    

    {isAiThubmbnail ? (
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
      <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1"
      onClick={generatePodcast}>
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
      </div>
    ) : (
      <div>
        </div>
    )}

    
    </>
   
  )
}

export default GenerateThumbnail