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
  let domain = 'fosstodon.org';
  let accountId = import.meta.env.MASTODON_ACCOUNT_ID || '113425089841635422'; // Hardcoded fallback as requested

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

  const url = `https://${domain}/api/v1/accounts/${accountId}/statuses?limit=10&exclude_replies=true`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Mastodon API error: ${response.statusText}`);
  }
  const data = await response.json();
  
  // Filter out self-replies since `exclude_replies=true` still includes them
  // We want the most recent post that isn't a reply to anything, AND
  // we want to ensure it's a main post with substantial content.
  // We'll filter for posts with in_reply_to_id === null.
  const topLevelPosts = data.filter(post => post.in_reply_to_id === null);
  
  // Return array with the single latest top-level post if available
  return topLevelPosts.length > 0 ? [topLevelPosts[0]] : [];
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
