import { promises as fs } from "fs"
import path from "path"

type JsonValue = any

const dataDir = path.join(process.cwd(), "data")

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true })
  } catch {
    // ignore
  }
}

export async function readJson<T extends JsonValue>(fileName: string, fallback: T): Promise<T> {
  await ensureDataDir()
  const filePath = path.join(dataDir, fileName)
  try {
    const buf = await fs.readFile(filePath, "utf8")
    return JSON.parse(buf) as T
  } catch {
    // initialize with fallback if not exists or invalid
    await writeJson<T>(fileName, fallback)
    return fallback
  }
}

export async function writeJson<T extends JsonValue>(fileName: string, data: T): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(dataDir, fileName)
  const json = JSON.stringify(data, null, 2)
  await fs.writeFile(filePath, json, "utf8")
}

export function getNextId(items: Array<{ id: number }>): number {
  if (!items || items.length === 0) return 1
  return Math.max(...items.map((i) => i.id || 0)) + 1
}


