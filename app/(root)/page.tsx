"use client";
import React from 'react'
import PodcastCard from '@/components/PodcastCard'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


const Home = () => {
  const podcasts = useQuery(api.podcasts.getPodcast);


  return (
    <div className='mt-9 flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Podcasts</h1>


        <div className='podcast_grid'>
        {podcasts?.map(({_id, podcastTitle, podcastDescription, imageUrl}) => (
          <PodcastCard key={_id} imgUrl={imageUrl!} title={podcastTitle} description={podcastDescription} podcastId={_id}/>
        )

        )}
        </div>
      </section>
    </div>
  )
}

export default Home