import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUrl = mutation({
    args: {
        storageId: v.id("_storage"),
    },
    handler: async(ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    }
})

export const createPodcast = mutation({
    args: {
        audioStorageId: v.id("_storage"),
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        audioUrl: v.string(),
        imageUrl: v.string(),
        imageStorageId: v.id("_storage"),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        views: v.number(),
        audioDuration: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError('No authenticated')
        }

        const user = await ctx.db.query('users').filter((q)=> q.eq(q.field('email'), identity.email)).collect()

        if (user.length === 0) {
            throw new ConvexError('User not found')
        }

        const podcast = await ctx.db.insert('podcasts', {
            audioStorageId: args.audioStorageId,
            user: user[0]._id,
            podcastTitle: args.podcastTitle,
            podcastDescription: args.podcastDescription,
            audioUrl: args.audioUrl,
            imageUrl: args.imageUrl,
            imageStorageId: args.imageStorageId,
            author: user[0].name,
            authorId: user[0].clerkId,
            voicePrompt: args.voicePrompt,
            imagePrompt: args.imagePrompt,
            voiceType: args.voiceType,
            views: args.views,
            authorImageUrl: user[0].imageUrl,
            audioDuration: args.audioDuration,
        })

        return podcast
    }
})

export const getPodcast = query({
    handler: async (ctx) => {
        const podcasts = await ctx.db.query('podcasts').collect()

        return podcasts
    }
})

export const getPodcastById = query({
    args: {podcastId: v.id('podcasts')},
    handler: async (ctx, args) => {
        return await ctx.db.get(args.podcastId)
    }
})

export const getPodcastByVoiceType = query({
    args: {
      podcastId: v.id("podcasts"),
    },
    handler: async (ctx, args) => {
      const podcast = await ctx.db.get(args.podcastId);
  
      return await ctx.db
        .query("podcasts")
        .filter((q) =>
          q.and(
            q.eq(q.field("voiceType"), podcast?.voiceType),
            q.neq(q.field("_id"), args.podcastId)
          )
        )
        .collect();
    },
  });

  export const deletePodcast = mutation({
    args: {
      podcastId: v.id("podcasts"),
      imageStorageId: v.id("_storage"),
      audioStorageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
      const podcast = await ctx.db.get(args.podcastId);
  
      if (!podcast) {
        throw new ConvexError("Podcast not found");
      }
  
      await ctx.storage.delete(args.imageStorageId);
      await ctx.storage.delete(args.audioStorageId);
      return await ctx.db.delete(args.podcastId);
    },
  });