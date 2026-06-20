import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/getPayload'
import { runSeed } from '@/payload/seed'

export const dynamic = 'force-dynamic'

/**
 * Dev-only seeding endpoint. Runs the same `runSeed()` logic as the CLI, but
 * through the Next.js runtime (SWC) instead of `payload run`/tsx — which is the
 * reliable path on Node 24, where tsx's loader mishandles `node:` builtins.
 *
 * Usage: start `npm run dev`, then open http://localhost:3000/dev-seed
 * Disabled in production.
 */
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Seeding is disabled in production.' }, { status: 403 })
  }

  try {
    const payload = await getPayloadClient()
    const report = await runSeed(payload)
    const ok = report.created.length + report.updated.length

    return NextResponse.json(
      {
        ok,
        failed: report.failed.length,
        created: report.created,
        updated: report.updated,
        failures: report.failed,
        global: report.globalOk ? 'updated' : `FAILED: ${report.globalError}`,
        hint:
          report.failed.length === 0
            ? 'Seed complete. Visit /services/web-design to verify.'
            : 'Some records failed — see "failures". Most often the DB schema is missing new columns; restart the dev server so Payload pushes the schema, then retry.',
      },
      { status: report.failed.length ? 207 : 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
