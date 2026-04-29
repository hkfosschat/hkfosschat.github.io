/**
 * Fetches the latest 40 videos from a YouTube channel's Uploads playlist.
 * @param {string} channelId - The YouTube Channel ID.
 */
export async function fetchYouTubeVideos(channelId) {
  if (!channelId) throw new Error('Channel ID is required');

  // Convert Channel ID to Uploads Playlist ID (e.g. UC... -> UU...)
  const uploadsPlaylistId = channelId.substring(0, 1) + 'U' + channelId.substring(2);
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=40&playlistId=${uploadsPlaylistId}&key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetches the latest status from a Mastodon account.
 * @param {string} accountUrl - The Mastodon account URL (e.g., https://mastodon.social/@username).
 */
export async function fetchMastodonPost(accountUrl) {
  let domain = 'mastodon.social';
  let accountId = '109243'; // Hardcoded fallback as requested

  if (accountUrl) {
    try {
      const urlObj = new URL(accountUrl);
      domain = urlObj.hostname;
      // Note: To dynamically get the account ID, we would need to query /api/v1/accounts/lookup?acct=username
      // Using the hardcoded ID for now as permitted by the instructions.
    } catch (e) {
      console.warn('Invalid Mastodon URL provided, using fallback domain.');
    }
  }

  const url = `https://${domain}/api/v1/accounts/${accountId}/statuses?limit=1`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Mastodon API error: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetches the latest post from Threads.
 */
export async function fetchThreadsPost() {
  const accessToken = import.meta.env.THREADS_ACCESS_TOKEN;
  const url = `https://graph.threads.net/v1.0/me/threads?access_token=${accessToken}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Threads API error: ${response.statusText}`);
  }
  return response.json();
}
