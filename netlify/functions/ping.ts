// export const handler = async () => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ ok: true }),
//   }
// }
export const handler = async () => {
  try {
    // 只查一筆 id，確保請求輕量且快速
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/todos?select=id&limit=1`, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error('Supabase request failed')
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.error('keep alive error:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false }),
    }
  }
}
