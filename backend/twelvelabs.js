// Import required packages
import { TwelveLabs, Task } from 'twelvelabs-js';
import { promises as fs } from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load API key from .env file
dotenv.config();
const client = new TwelveLabs({ apiKey: process.env.TL_API_KEY });

// Shared evaluation prompt
const evaluationPrompt = "Rate this interview clip out of 100 based on clarity, topic knowledge, relevant language, delivery, and posture — weigh clarity and knowledge most; return only an integer score.";

// Get or create index
async function getOrCreateIndex(name = 'interview-clip-index') {
  const indexes = await client.index.list();
  const existing = indexes.find(i => i.name === name);
  if (existing) return existing.id;

  const newIndex = await client.index.create({
    name,
    models: [
      { name: 'marengo2.7', options: ['visual', 'audio'] },
      { name: 'pegasus1.2', options: ['visual', 'audio'] },
    ],
  });

  console.log(`✅ Created index: ${newIndex.name} (ID: ${newIndex.id})`);
  return newIndex.id;
}

// Main script
async function main(videoFileName = 'sample-video.webm') {
  try {
    const videoPath = path.resolve('./videos', videoFileName);

    await fs.access(videoPath);

    const indexId = await getOrCreateIndex();

    console.log(`📤 Uploading video: ${videoPath}`);
    const task = await client.task.create({ indexId, file: videoPath });

    console.log(`⏳ Created task: ${task.id}. Waiting for indexing...`);
    await task.waitForDone(50, t => console.log(`  Status = ${t.status}`));

    if (task.status !== 'ready') {
      throw new Error(`❌ Indexing failed with status: ${task.status}`);
    }

    console.log(`✅ Video uploaded. Video ID: ${task.videoId}`);

    const result = await client.analyze(task.videoId, evaluationPrompt);

    const scoreText = typeof result?.data === 'string' ? result.data.trim() : '';
    const matches = scoreText.match(/\b\d{1,3}\b/g);

    if (!matches || matches.length !== 1) {
      throw new Error("❌ Expected a single numeric score in model response.");
    }

    const parsedScore = parseInt(matches[0]);
    console.log(`🎯 AI Interview Score: ${parsedScore}`);
    return parsedScore;
  } catch (error) {
    console.error("💥 Error occurred:", error.message);
    return null;
  }
}

// Exportable function
export async function getInterviewScore(videoFileName = 'sample-video.webm') {
  return await main(videoFileName);
}
