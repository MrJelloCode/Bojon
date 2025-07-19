// Import required packages
import { TwelveLabs, Task } from 'twelvelabs-js';
import { promises as fs } from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load API key from .env file
dotenv.config();
const client = new TwelveLabs({ apiKey: process.env.TL_API_KEY });

async function main() {
  try {
    const videoFileName = 'response1.mp4';
    const videoPath = path.resolve('./videos', videoFileName);

    // 1. Check if video file exists
    try {
      await fs.access(videoPath);
    } catch {
      throw new Error(`Video file '${videoFileName}' not found in ./videos`);
    }

    // 2. Create an index with both Marengo and Pegasus models
    const index = await client.index.create({
      name: 'interview-clip-index',
      models: [
        { name: 'marengo2.7', options: ['visual', 'audio'] },
        { name: 'pegasus1.2', options: ['visual', 'audio'] },
      ],
    });

    console.log(`✅ Created index: ${index.name} (ID: ${index.id})`);

    // 3. Upload video and create indexing task
    console.log(`📤 Uploading video: ${videoPath}`);
    const task = await client.task.create({
      indexId: index.id,
      file: videoPath,
    });

    console.log(`⏳ Created task: ${task.id}. Waiting for indexing...`);
    await task.waitForDone(50, (t) => {
      console.log(`  Status = ${t.status}`);
    });

    if (task.status !== 'ready') {
      throw new Error(`❌ Indexing failed with status: ${task.status}`);
    }

    console.log(`✅ Video uploaded. Video ID: ${task.videoId}`);

    // 4. Run open-ended analysis with your custom prompt
    const prompt = "You are an interviewer and I need you to rate the following 20 second clip based off the clarity, posture and how well built out answer given by the user. You should only return to me a single integer between 0-100 based off the performance of the user.";
    const result = await client.analyze(task.videoId, prompt);

    // 5. Extract and display score
    const scoreText = result?.data?.trim();
    const parsedScore = parseInt(scoreText.match(/\d+/)?.[0]);

    if (isNaN(parsedScore)) {
      throw new Error("❌ No valid integer score returned from model.");
    }

    console.log(`🎯 AI Interview Score: ${parsedScore}`);
  } catch (error) {
    console.error("💥 Error occurred:", error.message);
  }
}

main();
