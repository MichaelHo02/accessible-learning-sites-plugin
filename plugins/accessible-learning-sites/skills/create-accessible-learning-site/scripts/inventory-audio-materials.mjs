#!/usr/bin/env node

import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const AUDIO_EXTENSIONS = new Set([".m4a", ".mp3", ".wav", ".ogg", ".webm"]);

async function walk(directory) {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...(await walk(absolute)));
    else if (
      entry.isFile() &&
      AUDIO_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
    ) {
      paths.push(absolute);
    }
  }
  return paths;
}

async function sha256(file) {
  const hash = createHash("sha256");
  await new Promise((resolve, reject) => {
    const input = createReadStream(file);
    input.on("data", (chunk) => hash.update(chunk));
    input.on("error", reject);
    input.on("end", resolve);
  });
  return `sha256:${hash.digest("hex")}`;
}

async function durationSeconds(file) {
  try {
    const { stdout } = await execFileAsync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      file,
    ]);
    const duration = Number(stdout.trim());
    return Number.isFinite(duration) ? Math.round(duration * 1000) / 1000 : null;
  } catch {
    return null;
  }
}

async function main() {
  const [materialsArgument, outputArgument] = process.argv.slice(2);
  if (!materialsArgument || !outputArgument || process.argv.length !== 4) {
    console.error(
      "Usage: node inventory-audio-materials.mjs <materials-directory> <output.json>",
    );
    process.exitCode = 2;
    return;
  }

  const materialsRoot = path.resolve(materialsArgument);
  const outputPath = path.resolve(outputArgument);
  const files = (await walk(materialsRoot)).sort((left, right) =>
    left.localeCompare(right),
  );
  const recordings = [];
  for (const file of files) {
    const metadata = await stat(file);
    recordings.push({
      path: path.relative(materialsRoot, file),
      bytes: metadata.size,
      durationSeconds: await durationSeconds(file),
      sha256: await sha256(file),
      transcriptStatus: "not_run",
      transcriptEvidence:
        "No authorized or observed transcription was run for this inventory.",
      teacherReviewStatus: "pending",
      publicationRightsStatus: "uncertain",
    });
  }

  const result = {
    schemaVersion: 1,
    materialsRoot: path.basename(materialsRoot),
    generatedBy: "inventory-audio-materials.mjs",
    claims: {
      audioDecoded: false,
      transcriptAccuracyReviewed: false,
      teacherReviewCompleted: false,
      auslanGenerated: false,
      auslanHumanReviewed: false,
    },
    summary: {
      recordingCount: recordings.length,
      totalBytes: recordings.reduce((sum, item) => sum + item.bytes, 0),
      recordingsWithObservedDuration: recordings.filter(
        (item) => item.durationSeconds !== null,
      ).length,
      transcriptsGenerated: 0,
    },
    recordings,
  };
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`recordings: ${recordings.length}; output: ${outputPath}`);
}

await main();
