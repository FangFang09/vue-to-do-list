export const handler = async () => {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY

  // 查 todolist table 一筆資料，確認 supabase 連線正常
  const url = `${SUPABASE_URL}/rest/v1/todolist?select=id&limit=1`

  try {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    })

    if (!res.ok) {
      throw new Error('Supabase request failed')
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        message: 'Supabase connection healthy',
      }),
    }
  } catch (err) {
    console.error('keep alive error:', err)

    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
      }),
    }
  }
}
